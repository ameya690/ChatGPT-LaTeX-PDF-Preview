// preview.js
window.addEventListener('DOMContentLoaded', () => {
    const raw = decodeURIComponent(location.hash.substring(1));
    let latex = raw.replace(/\\\\/g, '\\').replace(/\\n/g, '\n');
  
    const previewDiv = document.getElementById('preview');
    
    try {
      const generator = new latexjs.HtmlGenerator({ hyphenate: false });
      latexjs.parse(latex, { generator });
      previewDiv.innerHTML = '';
      previewDiv.appendChild(generator.domFragment());
    } catch (e) {
      console.error(e);
      previewDiv.textContent = 'Error rendering LaTeX: ' + e.message;
    }
  });