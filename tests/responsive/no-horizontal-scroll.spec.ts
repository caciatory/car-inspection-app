import { test, expect } from '@playwright/test'

test.describe('Sem Scroll Horizontal', () => {
  const pagesToTest = [
    { path: '/test-components', name: 'Test Components' },
  ]

  for (const { path, name } of pagesToTest) {
    test(`${name} — sem overflow horizontal`, async ({ page }) => {
      await page.goto(path)

      const hasHorizontalScroll = await page.evaluate(() => {
        return document.body.scrollWidth > document.body.clientWidth
      })

      expect(hasHorizontalScroll).toBe(false)
    })

    test(`${name} — largura do body ≤ largura do viewport`, async ({ page }) => {
      await page.goto(path)

      const { bodyWidth, viewportWidth } = await page.evaluate(() => ({
        bodyWidth: document.body.scrollWidth,
        viewportWidth: window.innerWidth,
      }))

      expect(bodyWidth).toBeLessThanOrEqual(viewportWidth)
    })
  }
})
