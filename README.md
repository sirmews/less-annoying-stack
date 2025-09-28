# Less Annoying Substack

A browser extension that removes distracting elements from Substack to create a cleaner reading experience.

## Features

- ✅ **Trending Block Removal** - Hides "Trending" sections and recommendations
- ✅ **User Badge Hiding** - Removes subscriber badges and user indicators
- ✅ **Up Next Block Removal** - Hides "Up Next" reading queue sections
- ✅ **New Bestsellers Hiding** - Removes "New Bestsellers" discovery sections
- ✅ **Search Component Relocation** - Moves search bar to optimal location above feed
- ✅ **Smart Sidebar Management** - Automatically hides entire sidebar when all components are hidden
- ✅ **Intelligent Layout Adjustment** - Expands main content to full width when sidebar is removed
- ✅ **Toggleable Controls** - Each feature can be enabled/disabled independently
- ✅ **Dynamic Content Support** - Works with asynchronously loaded content
- ✅ **Cross-Browser** - Works on Chrome, Firefox, Edge, and more

## Quick Start

1. **Get the code**
   ```bash
   git clone git@github.com:sirmews/less-annoying-stack.git
   cd less-annoying-stack
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

## Usage

Once installed, the extension automatically removes distracting elements from Substack pages:

- **Trending blocks** are hidden by default
- **User badges** are hidden by default
- **Up Next sections** are hidden by default
- **New Bestsellers sections** are hidden by default
- **Original search bar** is hidden and relocated above the main feed
- **Entire sidebar** is automatically hidden when all components are removed
- **Main content** expands to full width for better reading experience

### Manual Control

You can toggle features on/off using the browser console (F12):

```javascript
// Hide/show trending blocks
toggleTrendingBlock(true);   // Hide trending
toggleTrendingBlock(false);  // Show trending

// Hide/show user badges
toggleUserBadges(true);      // Hide badges
toggleUserBadges(false);     // Show badges

// Hide/show Up Next blocks
toggleUpNextBlock(true);     // Hide Up Next
toggleUpNextBlock(false);    // Show Up Next

// Hide/show New Bestsellers blocks
toggleNewBestsellersBlock(true);   // Hide New Bestsellers
toggleNewBestsellersBlock(false);  // Show New Bestsellers

// Hide/show original search component
toggleOriginalSearch(true);   // Hide original search
toggleOriginalSearch(false);  // Show original search

// Control entire sidebar visibility
toggleSidebar(true);   // Enable smart sidebar hiding (default)
toggleSidebar(false);  // Disable sidebar hiding, always show
```

### Smart Behavior

The extension intelligently manages the sidebar:
- When **all sidebar components** are hidden, the **entire sidebar disappears**
- **Main content automatically expands** to use the full page width
- If you **re-enable any component**, the sidebar reappears with proper spacing
- **Search functionality** remains fully functional in its new location

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
less-annoying-stack/
├── entrypoints/           # Main extension code
│   ├── content.ts         # Content script (runs on Substack pages)
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