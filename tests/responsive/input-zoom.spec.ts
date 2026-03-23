import { test, expect } from '@playwright/test'

test.describe('Input — Prevenir Zoom iOS', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/test-components')
  })

  test('inputs têm font-size ≥ 16px (previne zoom iOS)', async ({ page }) => {
    const inputs = page.locator('[data-testid^="input-"] input')
    const count = await inputs.count()
    expect(count).toBeGreaterThan(0)

    for (let i = 0; i < count; i++) {
      const input = inputs.nth(i)
      const fontSize = await input.evaluate(el =>
        parseFloat(window.getComputedStyle(el).fontSize)
      )
      expect(fontSize).toBeGreaterThanOrEqual(16)
    }
  })

  test('inputs têm altura ≥ 44px (touch target)', async ({ page }) => {
    const inputs = page.locator('[data-testid^="input-"] input')
    const count = await inputs.count()

    for (let i = 0; i < count; i++) {
      const box = await inputs.nth(i).boundingBox()
      expect(box!.height).toBeGreaterThanOrEqual(44)
    }
  })

  test('input com erro mostra mensagem de erro', async ({ page }) => {
    const errorMsg = page.locator('[data-testid="input-error"] [role="alert"]')
    await expect(errorMsg).toBeVisible()
    await expect(errorMsg).toHaveText('Campo obrigatório')
  })
})
