const { chromium } = require('playwright');
const assert = require('node:assert/strict');
const fs = require('node:fs');

(async () => {
  const browser = await chromium.launch({
    channel: process.env.PLAYWRIGHT_CHANNEL === 'chromium' ? undefined : 'chrome',
    headless: true,
  });
  const page = await browser.newPage({ viewport: { width: 1440, height: 1000 } });
  const errors = [];
  page.on('pageerror', (error) => errors.push(error.message));
  const response = await page.goto(process.env.TEST_URL || 'http://127.0.0.1:4173');
  assert.equal(response.status(), 200);
  await page.evaluate(() => document.fonts.ready);
  fs.mkdirSync('tmp/qa', { recursive: true });
  await page.screenshot({ path: 'tmp/qa/desktop.png', fullPage: true });

  await page.getByRole('tab', { name: 'Goals', exact: true }).click();
  assert.equal(
    await page
      .getByRole('tabpanel', { name: 'Goals', exact: true })
      .getByText('One step closer.')
      .count(),
    1,
  );
  await page.getByRole('tab', { name: 'Goals', exact: true }).press('ArrowRight');
  assert.equal(
    await page.getByRole('tab', { name: 'Activity', exact: true }).getAttribute('aria-selected'),
    'true',
  );
  assert.equal(await page.getByText('Salary received', { exact: true }).count(), 1);
  await page.getByRole('tab', { name: 'Overview', exact: true }).click();
  await page.getByRole('button', { name: '1M', exact: true }).click();
  assert.equal(
    await page.getByRole('img', { name: 'Illustrative net worth trend over 1M' }).count(),
    1,
  );
  await page.getByRole('tab', { name: 'A proper getaway' }).click();
  assert.match(await page.locator('.goal-estimate').innerText(), /12 months away/);
  await page.locator('#monthly').fill('10000');
  await page.locator('#monthly').dispatchEvent('input');
  assert.match(await page.locator('.goal-estimate').innerText(), /6 months away/);
  await page.getByRole('tab', { name: 'A proper getaway' }).press('ArrowDown');
  assert.equal(
    await page.getByRole('tab', { name: 'A place of your own' }).getAttribute('aria-selected'),
    'true',
  );

  const opener = page.getByRole('button', { name: 'Find my starting point' }).first();
  await opener.click();
  assert.equal(await page.locator('dialog').evaluate((d) => d.open), true);
  await page.getByRole('button', { name: 'See my starting point' }).click();
  assert.match(await page.locator('.plan-result').innerText(), /30 months/);
  await page.getByLabel('Monthly goal contribution').fill('30000');
  await page.getByRole('button', { name: 'See my starting point' }).click();
  assert.match(await page.locator('.plan-error').innerText(), /available each month/);
  await page.getByLabel('Monthly expenses').fill('70000');
  await page.getByRole('button', { name: 'See my starting point' }).click();
  assert.match(await page.locator('.plan-error').innerText(), /no room/);
  await page.keyboard.press('Escape');
  assert.equal(await page.locator('dialog').evaluate((d) => d.open), false);
  assert.equal(await opener.evaluate((el) => document.activeElement === el), true);
  await page.getByRole('button', { name: /Your money needs a map/ }).click();
  assert.equal(await page.locator('.article-dialog p').count(), 3);
  await page.getByRole('button', { name: 'Close dialog' }).click();
  await page.getByRole('button', { name: 'Can I connect my bank account here?' }).click();
  assert.match(await page.locator('#faq-2').innerText(), /frontend assignment concept/);

  const layouts = [];
  for (const width of [320, 375, 390, 680, 768, 1024, 1440]) {
    await page.setViewportSize({ width, height: 900 });
    await page.goto(process.env.TEST_URL || 'http://127.0.0.1:4173');
    await page.evaluate(() => document.fonts.ready);
    const metrics = await page.evaluate(() => ({
      width: innerWidth,
      content: document.documentElement.scrollWidth,
    }));
    assert.ok(
      metrics.content <= metrics.width,
      `Horizontal overflow at ${width}: ${metrics.content}`,
    );
    layouts.push(metrics);
    if (width === 390) {
      await page.screenshot({ path: 'tmp/qa/mobile.png', fullPage: true });
      await page.getByRole('button', { name: 'Open menu' }).click();
      assert.equal(
        await page.getByRole('button', { name: 'Close menu' }).getAttribute('aria-expanded'),
        'true',
      );
      await page
        .getByRole('navigation', { name: 'Main navigation' })
        .getByRole('link', { name: 'Your goals' })
        .click();
      assert.equal(
        await page.getByRole('button', { name: 'Open menu' }).getAttribute('aria-expanded'),
        'false',
      );
      await page.getByRole('button', { name: 'Find my starting point' }).nth(1).click();
      await page.screenshot({ path: 'tmp/qa/mobile-planner.png' });
      await page.keyboard.press('Escape');
    }
  }
  assert.deepEqual(errors, []);
  console.log(
    JSON.stringify(
      {
        passed: true,
        checks: [
          'dashboard tabs and keyboard navigation',
          'chart periods',
          'goal switching and savings maths',
          'planner calculation and budget validation',
          'dialog Escape and focus restoration',
          'articles',
          'FAQ',
          'mobile menu',
          'seven responsive widths',
          'no browser errors',
        ],
        layouts,
      },
      null,
      2,
    ),
  );
  await browser.close();
})().catch((error) => {
  console.error(error);
  process.exit(1);
});
