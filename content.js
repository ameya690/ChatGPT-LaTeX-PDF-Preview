document.addEventListener('keydown', function(event) {
    if (event.shiftKey && event.key === 'L') {
      // Try different possible selectors for ChatGPT responses
      const selectors = [
        '.markdown.prose', 
        '[data-message-author-role="assistant"]',
        '.text-base',
        '.items-start'
      ];
      
      let content = null;
      
      // Try each selector
      for (const selector of selectors) {
        const elements = document.querySelectorAll(selector);
        if (elements && elements.length > 0) {
          // Get the last element (most recent response)
          const lastElement = elements[elements.length - 1];
          content = lastElement.textContent || '';
          if (content.trim()) {
            break;
          }
        }
      }
      
      if (!content) {
        alert('No LaTeX content found');
        return;
      }
      
      // Copy to clipboard
      navigator.clipboard.writeText(content)
        .then(() => {
          // Create a temporary element to show the copied message
          const messageElement = document.createElement('div');
          messageElement.textContent = 'LaTeX copied to clipboard!';
          messageElement.style.cssText = 'position: fixed; bottom: 20px; right: 20px; background: #10a37f; color: white; padding: 10px; border-radius: 4px; z-index: 9999;';
          document.body.appendChild(messageElement);
          
          // Remove the message after 2 seconds
          setTimeout(() => {
            document.body.removeChild(messageElement);
          }, 2000);
        })
        .catch(err => {
          console.error('Failed to copy:', err);
          alert('Failed to copy LaTeX to clipboard');
        });
    }
  });
  
  // Add "Copy LaTeX" buttons to responses
  function addCopyButtons() {
    // Find all responses
    const selectors = [
      '.markdown.prose', 
      '[data-message-author-role="assistant"]',
      '.text-base',
      '.items-start'
    ];
    
    let responses = [];
    
    // Try each selector
    for (const selector of selectors) {
      const elements = document.querySelectorAll(selector);
      if (elements && elements.length > 0) {
        responses = Array.from(elements);
        break;
      }
    }
    
    responses.forEach(response => {
      // Check if button already exists
      if (response.querySelector('.latex-copy-btn')) {
        return;
      }
      
      // Create button container
      const buttonContainer = document.createElement('div');
      buttonContainer.style.cssText = 'margin-top: 10px;';
      
      // Create copy button
      const copyButton = document.createElement('button');
      copyButton.textContent = '📋 Copy LaTeX';
      copyButton.className = 'latex-copy-btn';
      copyButton.style.cssText = 'background: #10a37f; color: white; border: none; border-radius: 4px; padding: 5px 10px; margin-right: 5px; cursor: pointer;';
      
      copyButton.addEventListener('click', function() {
        const content = response.textContent;
        
        navigator.clipboard.writeText(content)
          .then(() => {
            // Change button text temporarily
            const originalText = copyButton.textContent;
            copyButton.textContent = '✓ Copied!';
            
            setTimeout(() => {
              copyButton.textContent = originalText;
            }, 2000);
          })
          .catch(err => {
            console.error('Failed to copy:', err);
            copyButton.textContent = '❌ Failed';
            
            setTimeout(() => {
              copyButton.textContent = '📋 Copy LaTeX';
            }, 2000);
          });
      });
      
      buttonContainer.appendChild(copyButton);
      response.appendChild(buttonContainer);
    });
  }
  
  // Initialize mutation observer to add buttons to new responses
  const observer = new MutationObserver(addCopyButtons);
  observer.observe(document.body, { childList: true, subtree: true });
  
  // Initial run
  addCopyButtons();