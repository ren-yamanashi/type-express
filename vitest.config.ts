import { defineConfig } from 'vitest/config';
import { resolve } from 'path';

const _resolve = (p: string) => resolve(__dirname, p);

const CovDirPath = {
  unit: 'src/__tests__/unit',
  integration: 'src/__tests__/integration',
  e2e: 'src/__tests__/e2e',
} as const;
type TestType = keyof typeof CovDirPath;

export default defineConfig({
  resolve: {
    alias: {
      '~': _resolve('.'),
    },
  },
  test: {
    globals: true,
    silent: true,
    coverage: {
      reportsDirectory: CovDirPath[process.env.TEST_TYPE as TestType],
    },
    environment: 'jsdom',
  },
});
