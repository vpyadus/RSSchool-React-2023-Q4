import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./src/setupTests.ts'],
    coverage: {
      exclude: [
        'src/vite-env.d.ts',
        'src/__tests__',
        '*.cjs',
        '*.mjs',
        'next-env.d.ts',
      ],
    },
  },
});
