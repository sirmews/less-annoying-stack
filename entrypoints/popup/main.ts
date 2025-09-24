import './style.css';

// Simple popup interface
document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <div>
    <h2>🚀 Your Extension</h2>
    <p>This is your popup window!</p>

    <div class="buttons">
      <button id="action-btn">Do Something</button>
      <button id="options-btn">Options</button>
    </div>

    <div class="info">
      <p><strong>Current Tab:</strong> <span id="current-url">Loading...</span></p>
    </div>
  </div>
`;

// Get current tab info
browser.tabs.query({ active: true, currentWindow: true }).then(tabs => {
  const currentTab = tabs[0];
  const urlElement = document.getElementById('current-url');
  if (urlElement && currentTab.url) {
    urlElement.textContent = new URL(currentTab.url).hostname;
  }
});

// Add button functionality
document.getElementById('action-btn')?.addEventListener('click', () => {
  // Example: Send message to content script
  browser.tabs.query({ active: true, currentWindow: true }).then(tabs => {
    if (tabs[0].id) {
      console.log('Action button clicked!');
      // You can send messages to content scripts here
      // browser.tabs.sendMessage(tabs[0].id, { action: 'doSomething' });
    }
  });
});

document.getElementById('options-btn')?.addEventListener('click', () => {
  // Example: Open options page
  console.log('Opening options...');
  // browser.runtime.openOptionsPage();
});
