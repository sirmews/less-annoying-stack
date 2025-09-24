export default defineBackground(() => {
  console.log('Extension background script started!');

  // Example: Listen for when extension icon is clicked
  // (This is handled by popup, but you can add logic here)

  // Example: Listen for tab updates
  browser.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    if (changeInfo.status === 'complete' && tab.url) {
      console.log('Tab finished loading:', tab.url);
    }
  });

  // Example: Set up context menu (right-click menu)
  browser.contextMenus.create({
    id: 'hello',
    title: 'Hello from Extension!',
    contexts: ['page']
  });

  // Handle context menu clicks
  browser.contextMenus.onClicked.addListener((info, tab) => {
    if (info.menuItemId === 'hello') {
      console.log('Context menu clicked on:', tab?.url);
    }
  });
});
