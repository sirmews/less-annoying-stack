# Browser Extension Starter Template

A simple, modern browser extension template that works with Chrome, Firefox, and other browsers.

## What's Included

- ✅ **Modern Setup** - TypeScript, hot reload during development
- ✅ **Cross-Browser** - Works on Chrome, Firefox, Edge, and more
- ✅ **Three Main Parts**:
  - **Popup** - The window that opens when you click the extension icon
  - **Content Script** - Runs on web pages to modify them
  - **Background Script** - Runs in the background for extension logic

## Quick Start

1. **Get the code**
   ```bash
   git clone git@github.com:sirmews/browser-extension-boilerplate.git
   cd browser-extension-boilerplate
   ```

2. **Install Bun** (if you haven't already)
   ```bash
   curl -fsSL https://bun.sh/install | bash
   ```
   *Or visit [bun.sh](https://bun.sh/) for other install methods*

3. **Install dependencies**
   ```bash
   make install
   ```

4. **Start developing**
   ```bash
   make dev
   ```

5. **Load your extension**
   - Open Chrome and go to `chrome://extensions/`
   - Turn on "Developer mode" (top right)
   - Click "Load unpacked" and select the `.output/chrome-mv3-dev` folder

## Customize Your Extension

### Change the Name and Description
Edit `package.json`:
```json
{
  "name": "your-extension-name",
  "description": "What your extension does"
}
```

### Modify What Sites It Works On
Edit `entrypoints/content.ts` and change this line:
```typescript
matches: ['*://*.example.com/*'],  // Your target websites
```

### Customize the Popup
- Edit `entrypoints/popup/main.ts` for functionality
- Edit `entrypoints/popup/style.css` for appearance
- Edit `entrypoints/popup/index.html` for structure

### Add Background Logic
Edit `entrypoints/background.ts` for extension background tasks.

## Available Commands

Run `make` to see all available commands:

```bash
make help
```

## Build for Production

```bash
make build
```

Creates production files in `.output/chrome-mv3-prod/`

## Create Extension Package

```bash
make zip
```

Creates a `.zip` file you can upload to browser extension stores.

## File Structure

```
your-extension/
├── entrypoints/           # Main extension code
│   ├── background.ts      # Background script
│   ├── content.ts         # Content script (runs on websites)
│   └── popup/            # Popup when clicking extension icon
├── public/               # Icons and static files
├── components/           # Reusable code components
└── package.json          # Extension settings and dependencies
```

## Need Help?

- **WXT Documentation**: https://wxt.dev/
- **Chrome Extension Docs**: https://developer.chrome.com/docs/extensions/
- **Firefox Extension Docs**: https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions

## Tips

- The extension reloads automatically when you save files during development
- Check the browser console (F12) for error messages
- Test on different websites to make sure everything works
- Always test in both Chrome and Firefox before publishing