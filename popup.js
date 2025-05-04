document.addEventListener('DOMContentLoaded', function() {
    const statusElement = document.getElementById('status');
    const copyButton = document.getElementById('copyButton');
    const openButton = document.getElementById('openButton');
  
    function showStatus(message, isError = false) {
      statusElement.textContent = message;
      statusElement.className = isError ? 'status error' : 'status success';
      setTimeout(() => {
        statusElement.textContent = '';
        statusElement.className = 'status';
      }, 3000);
    }
  
    // Helper to get content from ChatGPT
    async function getLatexContent() {
      try {
        const [tab] = await chrome.tabs.query({active: true, currentWindow: true});
        
        const results = await chrome.scripting.executeScript({
          target: {tabId: tab.id},
          function: () => {
            const selectors = [
              '.markdown.prose', 
              '[data-message-author-role="assistant"]',
              '.text-base',
              '.items-start',
              'div[data-testid="conversation-turn-"]'
            ];
          
            for (const selector of selectors) {
              const elements = document.querySelectorAll(selector);
              if (elements && elements.length > 0) {
                const lastElement = elements[elements.length - 1];
                const text = lastElement.textContent || '';
                const match = text.match(/\\documentclass[\s\S]*?\\end{document}/);
                if (match) return match[0];
              }
            }
          
            return null;
          }
        });
        
        return results[0].result;
      } catch (error) {
        console.error('Error fetching content:', error);
        return null;
      }
    }
    
    // Copy LaTeX content to clipboard
    copyButton.addEventListener('click', async function() {
      statusElement.textContent = 'Processing...';
      statusElement.className = 'status';
      
      const content = await getLatexContent();
      
      if (!content) {
        showStatus('No content found', true);
        return;
      }
      
      try {
        await navigator.clipboard.writeText(content);
        showStatus('LaTeX copied to clipboard!');
      } catch (error) {
        console.error('Failed to copy:', error);
        showStatus('Failed to copy: ' + error.message, true);
      }
    });
    
    // Open in online LaTeX editor
    openButton.addEventListener('click', async function () {
        const content = await getLatexContent();
        
        if (!content) {
          showStatus('No LaTeX content found', true);
          return;
        }
      
        try {
          const encoded = encodeURIComponent(content);
          chrome.tabs.create({ url: `preview.html#${encoded}` });
          showStatus('Preview opened!');
        } catch (err) {
          console.error(err);
          showStatus('Error opening preview', true);
        }
      });
  });