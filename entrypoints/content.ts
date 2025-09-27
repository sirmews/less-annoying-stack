export default defineContentScript({
  matches: ['*://substack.com/*', '*://*.substack.com/*'],
  main() {
    let hideUserBadgesEnabled = true;
    let hideTrendingEnabled = true;
    let hideUpNextEnabled = true;
    let hideNewBestsellersEnabled = true;

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

    function hideUpNextBlock() {
      if (!hideUpNextEnabled) return;

      // Find "Up Next" headers using stable classes and text content
      const potentialHeaders = document.querySelectorAll('div.pencraft.pc-reset');
      potentialHeaders.forEach(header => {
        if (header instanceof HTMLDivElement && header.textContent?.trim() === 'Up Next') {
          // Find the closest parent container with stable classes
          const container = header.closest('div.pencraft.pc-display-flex.pc-flexDirection-column.pc-gap-8') as HTMLElement | null;
          if (container) {
            container.style.display = 'none';
          }
        }
      });

      // Also hide individual links as backup (using source=queue pattern)
      const links = document.querySelectorAll<HTMLAnchorElement>('a[href*="source=queue"]');
      links.forEach(link => {
        link.style.display = 'none';
      });
    }

    function hideNewBestsellersBlock() {
      if (!hideNewBestsellersEnabled) return;

      // Find "New Bestsellers" headers using stable classes and text content
      const potentialHeaders = document.querySelectorAll('div.pencraft.pc-reset');
      potentialHeaders.forEach(header => {
        if (header instanceof HTMLDivElement && header.textContent?.trim() === 'New Bestsellers') {
          // Find the closest parent container with stable classes
          const container = header.closest('div.pencraft.pc-display-flex.pc-flexDirection-column.pc-gap-8') as HTMLElement | null;
          if (container) {
            container.style.display = 'none';
          }
        }
      });

      // Also hide individual links as backup (using utm_source=explore_sidebar pattern)
      const links = document.querySelectorAll<HTMLAnchorElement>('a[href*="utm_source=explore_sidebar"]');
      links.forEach(link => {
        link.style.display = 'none';
      });
    }

    function injectSearchComponent() {
      // Find the original search component
      const originalSearch = document.querySelector('.searchInput-ven28n');
      if (!originalSearch) return;

      // Find the "What's on your mind?" block to insert above it
      const whatsOnYourMindText = Array.from(document.querySelectorAll('div')).find(
        div => div.textContent?.trim() === "What's on your mind?"
      );

      if (!whatsOnYourMindText) return;

      // Find the container that holds the "What's on your mind?" block
      const container = whatsOnYourMindText.closest('div[style*="max-width: var(--feed-page-width)"]');
      if (!container) return;

      // Check if we already injected the search (avoid duplicates)
      if (container.querySelector('.injected-search-component')) return;

      // Clone the search component with deep cloning
      const clonedSearch = originalSearch.cloneNode(true) as HTMLElement;
      clonedSearch.classList.add('injected-search-component');

      // Add some styling to make it look good in the new location
      clonedSearch.style.marginBottom = '16px';
      clonedSearch.style.marginTop = '16px';

      // Copy event handlers from original to cloned elements
      copyEventHandlers(originalSearch, clonedSearch);

      // Insert the cloned search component at the beginning of the container
      container.insertBefore(clonedSearch, container.firstChild);
    }

    function copyEventHandlers(original: Element, clone: Element) {
      // Copy event handlers for all interactive elements
      const originalElements = original.querySelectorAll('*');
      const clonedElements = clone.querySelectorAll('*');

      // Handle the root elements
      copyElementEvents(original, clone);

      // Handle all child elements
      for (let i = 0; i < originalElements.length; i++) {
        const originalEl = originalElements[i];
        const clonedEl = clonedElements[i];
        if (originalEl && clonedEl) {
          copyElementEvents(originalEl, clonedEl);
        }
      }
    }

    function copyElementEvents(original: Element, clone: Element) {
      // Common events that might be attached to search components
      const events = ['click', 'focus', 'blur', 'input', 'keydown', 'keyup', 'submit', 'change'];

      events.forEach(eventType => {
        // Try to trigger the same behavior by delegating to the original element
        clone.addEventListener(eventType, (event) => {
          event.preventDefault();
          event.stopPropagation();

          // Create a new event on the original element
          const newEvent = new Event(eventType, {
            bubbles: event.bubbles,
            cancelable: event.cancelable
          });

          // For input events, copy the value
          if (eventType === 'input' && original instanceof HTMLInputElement && clone instanceof HTMLInputElement) {
            original.value = clone.value;
          }

          // Dispatch the event on the original element
          original.dispatchEvent(newEvent);
        });
      });

      // Special handling for form elements
      if (clone instanceof HTMLFormElement && original instanceof HTMLFormElement) {
        clone.addEventListener('submit', (event) => {
          event.preventDefault();
          // Copy form data and submit the original form
          const formData = new FormData(clone);
          const originalInputs = original.querySelectorAll('input, select, textarea');
          const clonedInputs = clone.querySelectorAll('input, select, textarea');

          for (let i = 0; i < clonedInputs.length; i++) {
            const clonedInput = clonedInputs[i] as HTMLInputElement;
            const originalInput = originalInputs[i] as HTMLInputElement;
            if (originalInput && clonedInput) {
              originalInput.value = clonedInput.value;
            }
          }

          original.dispatchEvent(new Event('submit', { bubbles: true, cancelable: true }));
        });
      }

      // Special handling for input synchronization
      if (clone instanceof HTMLInputElement && original instanceof HTMLInputElement) {
        clone.addEventListener('input', () => {
          original.value = clone.value;
          original.dispatchEvent(new Event('input', { bubbles: true }));
        });

        // Also sync the other way in case original changes
        original.addEventListener('input', () => {
          clone.value = original.value;
        });
      }
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

    function toggleUpNextBlock(enabled: boolean) {
      hideUpNextEnabled = enabled;

      // Handle Up Next headers
      const potentialHeaders = document.querySelectorAll('div.pencraft.pc-reset');
      potentialHeaders.forEach(header => {
        if (header instanceof HTMLDivElement && header.textContent?.trim() === 'Up Next') {
          const container = header.closest('div.pencraft.pc-display-flex.pc-flexDirection-column.pc-gap-8') as HTMLElement | null;
          if (container) {
            container.style.display = enabled ? 'none' : '';
          }
        }
      });

      // Handle Up Next links
      const links = document.querySelectorAll<HTMLAnchorElement>('a[href*="source=queue"]');
      links.forEach(link => {
        link.style.display = enabled ? 'none' : '';
      });
    }

    function toggleNewBestsellersBlock(enabled: boolean) {
      hideNewBestsellersEnabled = enabled;

      // Handle New Bestsellers headers
      const potentialHeaders = document.querySelectorAll('div.pencraft.pc-reset');
      potentialHeaders.forEach(header => {
        if (header instanceof HTMLDivElement && header.textContent?.trim() === 'New Bestsellers') {
          const container = header.closest('div.pencraft.pc-display-flex.pc-flexDirection-column.pc-gap-8') as HTMLElement | null;
          if (container) {
            container.style.display = enabled ? 'none' : '';
          }
        }
      });

      // Handle New Bestsellers links
      const links = document.querySelectorAll<HTMLAnchorElement>('a[href*="utm_source=explore_sidebar"]');
      links.forEach(link => {
        link.style.display = enabled ? 'none' : '';
      });
    }

    function runAllHiders() {
      hideTrendingBlock();
      hideUserBadges();
      hideUpNextBlock();
      hideNewBestsellersBlock();
      injectSearchComponent();
    }

    runAllHiders(); // Run initially

    // Watch for dynamic content
    const observer = new MutationObserver(runAllHiders);
    observer.observe(document.body, { childList: true, subtree: true });

    // Expose toggle functions for debugging/manual control
    (window as any).toggleUserBadges = toggleUserBadges;
    (window as any).toggleTrendingBlock = toggleTrendingBlock;
    (window as any).toggleUpNextBlock = toggleUpNextBlock;
    (window as any).toggleNewBestsellersBlock = toggleNewBestsellersBlock;
  },
});
