import { test, expect } from '@playwright/test'

test.describe('Touch Targets', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/test-components')
  })

  test('todos os botões têm altura ≥ 44px', async ({ page }) => {
    const buttons = page.locator('[data-testid^="btn-"]')
    const count = await buttons.count()
    expect(count).toBeGreaterThan(0)

    for (let i = 0; i < count; i++) {
      const btn = buttons.nth(i)
      const box = await btn.boundingBox()
      expect(box).not.toBeNull()
      expect(box!.height).toBeGreaterThanOrEqual(44)
    }
  })

  test('todos os botões têm largura ≥ 44px', async ({ page }) => {
    const buttons = page.locator('[data-testid^="btn-"]')
    const count = await buttons.count()

    for (let i = 0; i < count; i++) {
      const btn = buttons.nth(i)
      const box = await btn.boundingBox()
      expect(box!.width).toBeGreaterThanOrEqual(44)
    }
  })

  test('botão primary md tem altura ≥ 44px em todos os viewports', async ({ page }) => {
    const btn = page.locator('[data-testid="btn-primary-md"]')
    const box = await btn.boundingBox()
    expect(box!.height).toBeGreaterThanOrEqual(44)
  })
})
