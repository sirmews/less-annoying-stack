export default defineContentScript({
  matches: ['*://substack.com/*', '*://*.substack.com/*'],
  main() {
    let hideUserBadgesEnabled = true;
    let hideTrendingEnabled = true;

    function hideTrendingBlock() {
      if (!hideTrendingEnabled) return;

      // Find "Trending" headers using stable classes and text content
      const potentialHeaders = document.querySelectorAll('div.pencraft.pc-reset');
      potentialHeaders.forEach(header => {
        if (header instanceof HTMLDivElement && header.textContent?.trim() === 'Trending') {
          // Find the closest parent container with stable classes
          const container = header.closest('div.pencraft.pc-display-flex.pc-flexDirection-column') as HTMLElement | null;
          if (container) {
            container.style.display = 'none';
          }
        }
      });

      // Also hide individual links as backup (using UTM pattern)
      const links = document.querySelectorAll<HTMLAnchorElement>('a[href*="utm_source=trending-topics"]');
      links.forEach(link => {
        link.style.display = 'none';
      });
    }

    function hideUserBadges() {
      if (!hideUserBadgesEnabled) return;

      const userBadges = document.querySelectorAll('[data-testid="user-badge"]');
      userBadges.forEach(badge => {
        if (badge instanceof HTMLElement) {
          badge.style.display = 'none';
        }
      });
    }

    function toggleUserBadges(enabled: boolean) {
      hideUserBadgesEnabled = enabled;
      const userBadges = document.querySelectorAll('[data-testid="user-badge"]');
      userBadges.forEach(badge => {
        if (badge instanceof HTMLElement) {
          badge.style.display = enabled ? 'none' : '';
        }
      });
    }

    function toggleTrendingBlock(enabled: boolean) {
      hideTrendingEnabled = enabled;

      // Handle trending headers
      const potentialHeaders = document.querySelectorAll('div.pencraft.pc-reset');
      potentialHeaders.forEach(header => {
        if (header instanceof HTMLDivElement && header.textContent?.trim() === 'Trending') {
          const container = header.closest('div.pencraft.pc-display-flex.pc-flexDirection-column') as HTMLElement | null;
          if (container) {
            container.style.display = enabled ? 'none' : '';
          }
        }
      });

      // Handle trending links
      const links = document.querySelectorAll<HTMLAnchorElement>('a[href*="utm_source=trending-topics"]');
      links.forEach(link => {
        link.style.display = enabled ? 'none' : '';
      });
    }

    function runAllHiders() {
      hideTrendingBlock();
      hideUserBadges();
    }

    runAllHiders(); // Run initially

    // Watch for dynamic content
    const observer = new MutationObserver(runAllHiders);
    observer.observe(document.body, { childList: true, subtree: true });

    // Expose toggle functions for debugging/manual control
    (window as any).toggleUserBadges = toggleUserBadges;
    (window as any).toggleTrendingBlock = toggleTrendingBlock;
  },
});
