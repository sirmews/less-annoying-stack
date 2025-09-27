import { defineConfig } from 'wxt';

// See https://wxt.dev/api/config.html
export default defineConfig({
  debug: true,
  outDir: 'dist',
  runner: {
    startUrls: ['https://substack.com/home']
  }
});
