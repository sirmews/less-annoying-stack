export default defineContentScript({
  matches: ['*://*.example.com/*'],
  main() {
    // This runs on matching websites
    console.log('Extension content script loaded on:', window.location.hostname);

    // Example: Change page background (remove this in your extension)
    document.body.style.backgroundColor = '#f9f9f9';

    // Example: Add a message to the page
    const message = document.createElement('div');
    message.textContent = '🎉 Your extension is working!';
    message.style.cssText = 'position:fixed;top:10px;right:10px;background:#4CAF50;color:white;padding:10px;border-radius:5px;z-index:9999;';
    document.body.appendChild(message);

    // Remove the message after 3 seconds
    setTimeout(() => message.remove(), 3000);
  },
});
