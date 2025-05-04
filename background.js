const backgroundJs = // Listen for messages from content scripts
chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    // Handle the openPreview action
    if (request.action === 'openPreview') {
      // Create a new tab with the preview page
      chrome.tabs.create({
        url: 'preview.html'
      }, function(tab) {
        // Store the LaTeX content in local storage
        chrome.storage.local.set({
          'latexContent': request.content
        }, function() {
          // After storage is set, send a message to the preview page
          setTimeout(() => {
            chrome.tabs.sendMessage(tab.id, {
              action: 'renderLatex',
              content: request.content
            });
          }, 500);
        });
      });
      
      return true;
    }
  }
);;