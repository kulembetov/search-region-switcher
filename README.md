# Search Region Switcher

Search Region Switcher is a Chrome extension that allows you to instantly change the region and language for your current Google Search tab. This is useful for viewing search results as they appear in different countries or languages, without changing your global Google account settings.

## Features
- Instantly change Google Search region (`gl`) and language (`hl`) for the current tab
- Full list of countries and their official languages
- Always includes English as an option
- Modern, user-friendly popup interface
- Extension only activates on Google Search result pages
- Badge updates with current region

## Installation
1. Download or clone this repository to your computer.
2. Open Chrome and go to `chrome://extensions/`.
3. Enable "Developer mode" (top right).
4. Click "Load unpacked" and select the extension folder.

## Usage
1. Navigate to a Google Search results page (e.g., `https://www.google.com/search?...`).
2. Click the extension icon in your Chrome toolbar.
3. The popup will display your current search region and language.
4. Select a new region and language from the dropdowns.
5. Click "Apply Region". The current tab will reload with the selected region and language applied.
6. If you are not on a Google Search page, the extension will display a message and controls will be disabled.

## Notes
- The extension only modifies the current search tab. It does not change your global Google account settings.
- The extension is inactive and controls are disabled on non-Google Search pages.

## License
MIT