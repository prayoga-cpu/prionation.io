import { defineConfig } from 'vitest/config';
import path from 'path';

export default defineConfig({
  test: {
    environment: 'node',
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, '.'),
      // server-only's default export throws unconditionally — Next's server
      // bundler resolves it to this no-op instead via the "react-server"
      // export condition. Vitest doesn't set that condition, so alias it
      // directly; this only affects this one marker package.
      'server-only': path.resolve(__dirname, 'node_modules/server-only/empty.js'),
    },
  },
});
