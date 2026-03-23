// lib/constants/viewports.ts
export const VIEWPORTS = {
  'tablet-landscape': { width: 1024, height: 768 },
  'tablet-portrait': { width: 768, height: 1024 },
  'mobile-iphone': { width: 390, height: 844 },
  'mobile-android': { width: 360, height: 780 },
} as const

export type ViewportName = keyof typeof VIEWPORTS
