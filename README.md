# ChatGPT LaTeX PDF Preview

A browser extension that allows you to easily copy and preview LaTeX equations from ChatGPT conversations.

## Features

- Copy LaTeX content from ChatGPT responses with a single click
- Preview LaTeX content in a PDF-like format
- Keyboard shortcut (Shift + L) for quick copying
- Support for multiple AI chat platforms (ChatGPT, Claude, Google AI Studio, DeepSeek, X.com)
- Beautiful and intuitive user interface

## Installation

1. Clone this repository or download the ZIP file
2. Open Chrome and go to `chrome://extensions/`
3. Enable "Developer mode" in the top right
4. Click "Load unpacked" and select the extension directory

## Usage

1. Visit ChatGPT or any supported AI chat platform
2. When you see LaTeX content in a response:
   - Click the "Copy LaTeX" button below the response
   - Use the keyboard shortcut Shift + L
   - Click the extension icon and use the popup interface
3. To preview the LaTeX content:
   - Click the extension icon
   - Click "Open in Online LaTeX Editor"

## Files

- `manifest.json` - Extension configuration
- `popup.html/js` - Extension popup interface
- `content.js` - Content script for interacting with chat pages
- `preview.html/js` - LaTeX preview functionality
- `background.js` - Background script for extension functionality
- `latex/latex.min.js` - LaTeX rendering library

## License

MIT License