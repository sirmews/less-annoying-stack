# Development Guide

## Getting Started

1. **Install Bun** (if you haven't already)
   ```bash
   curl -fsSL https://bun.sh/install | bash
   ```
   Or visit [bun.sh](https://bun.sh/) for other install methods

2. **Clone and setup**
   ```bash
   git clone git@github.com:sirmews/browser-extension-boilerplate.git
   cd browser-extension-boilerplate
   make install
   ```

3. **Start development mode**
   ```bash
   make dev
   ```
   This watches for file changes and rebuilds automatically.

4. **See all commands**
   ```bash
   make help
   ```

## Loading Your Extension

### Chrome/Edge
1. Open `chrome://extensions/` (or `edge://extensions/`)
2. Turn on "Developer mode" (toggle in top right)
3. Click "Load unpacked"
4. Select the `.output/chrome-mv3-dev` folder

### Firefox
1. Run `make dev-firefox` instead
2. Open `about:debugging#/runtime/this-firefox`
3. Click "Load Temporary Add-on"
4. Select any file in `.output/firefox-mv2-dev` folder

## Making Changes

### Content Script (`entrypoints/content.ts`)
- Runs on web pages that match your `matches` pattern
- Can read and modify the page content
- Has access to the page's DOM but runs in isolated environment

### Background Script (`entrypoints/background.ts`)
- Runs in the background when extension is active
- Handles extension lifecycle events
- Can listen to browser events (tab changes, etc.)
- Cannot directly access page content

### Popup (`entrypoints/popup/`)
- Shows when user clicks the extension icon
- Can communicate with content and background scripts
- Good for settings, quick actions, showing information

## Common Tasks

### Change Target Websites
Edit the `matches` array in `entrypoints/content.ts`:
```typescript
matches: ['*://*.example.com/*'],  // Only example.com
matches: ['*://*/*'],              // All websites
matches: ['*://github.com/*', '*://gitlab.com/*'], // Multiple sites
```

### Add New Permissions
Edit `wxt.config.ts` if you need additional browser permissions.

### Debug Issues
- Open browser DevTools (F12)
- Check Console tab for error messages
- For popup: right-click extension icon → "Inspect popup"
- For background: go to `chrome://extensions` → your extension → "Inspect views: background page"

## Building for Production

```bash
make build           # Chrome/Edge version
make build-firefox   # Firefox version
```

Creates production files in `.output/` folder.

## Publishing

1. **Create zip file**
   ```bash
   make zip             # Chrome/Edge
   make zip-firefox     # Firefox
   ```

2. **Upload to store**
   - **Chrome**: [Chrome Web Store Developer Dashboard](https://chrome.google.com/webstore/devconsole/)
   - **Firefox**: [Firefox Add-on Developer Hub](https://addons.mozilla.org/developers/)
   - **Edge**: [Microsoft Edge Add-ons](https://partner.microsoft.com/dashboard/microsoftedge/)

## Tips

- Always test in both Chrome and Firefox
- Keep popup simple - complex UI should be in a separate page
- Use `console.log()` for debugging
- Extensions reload automatically during development
- Check browser compatibility for new APIs
- Use `make check` to verify TypeScript types
- Use `make clean` to reset build files if something breaks