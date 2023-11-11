import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./src/setupTests.ts'],
    coverage: {
      include: ['src/*'],
      exclude: [
        'src/main.tsx',
        'src/vite-env.d.ts',
        'src/Root.tsx',
        'src/__tests__',
      ],
    },
  },
});
