import { defineConfig, devices } from '@playwright/test'
import { VIEWPORTS } from '../lib/constants/viewports'

export default defineConfig({
  testDir: './responsive',
  testMatch: '**/*.spec.ts',
  testIgnore: '**/._*',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: 0,
  use: {
    baseURL: 'http://localhost:3000',
    trace: 'on-first-retry',
  },
  projects: [
    {
      name: 'tablet-landscape',
      use: { ...devices['Desktop Chrome'], viewport: VIEWPORTS['tablet-landscape'] },
    },
    {
      name: 'tablet-portrait',
      use: { ...devices['Desktop Chrome'], viewport: VIEWPORTS['tablet-portrait'] },
    },
    {
      name: 'mobile-iphone',
      use: { ...devices['iPhone 14'] },
    },
    {
      name: 'mobile-android',
      use: { ...devices['Pixel 7'] },
    },
  ],
  webServer: {
    command: 'npm run dev',
    url: 'http://localhost:3000',
    reuseExistingServer: !process.env.CI,
    cwd: '/Volumes/KINGSTON/averyone car /car-inspection-app',
  },
})
