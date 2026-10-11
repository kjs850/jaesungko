const assert = require('node:assert/strict');
const { chromium } = require('playwright');
const { resolve } = require('node:path');
const { pathToFileURL } = require('node:url');

const url = pathToFileURL(resolve(__dirname, '../index.html')).href;
(async () => {
  const browser = await chromium.launch(process.env.CHROME_PATH ? { executablePath: process.env.CHROME_PATH } : {});
  try {
    const errors = [];
    const page = await browser.newPage({ viewport: { width: 1280, height: 900 } });
    page.on('pageerror', error => errors.push(error.message));
    await page.goto(url, { waitUntil: 'networkidle' });
    assert.equal(await page.evaluate(() => typeof window.Motion.animate), 'function');
    assert.equal(await page.locator('.workflow-explorer').isVisible(), true);
    assert.equal(await page.locator('.workflow .flow').isVisible(), false);

    for (const [name, id] of [['업무 사례', 'cases'], ['협업', 'services'], ['교육·강연', 'education']]) {
      await page.getByRole('link', { name, exact: true }).click();
      await page.waitForFunction(id => document.querySelector('.nav-links [aria-current]')?.hash === `#${id}`, id);
    }
    const tabs = page.getByRole('tab');
    for (let index = 0; index < 4; index++) {
      await tabs.nth(index).click();
      assert.equal(await tabs.nth(index).getAttribute('aria-selected'), 'true');
      assert.equal(await page.locator('.stage-panel:visible').count(), 1);
      assert.equal(await page.locator('.stage-panel:visible').getAttribute('id'), `stage-panel-${index}`);
    }
    await tabs.nth(3).press('Home');
    assert.equal(await tabs.nth(0).getAttribute('aria-selected'), 'true');
    await tabs.nth(0).press('ArrowRight');
    assert.equal(await tabs.nth(1).getAttribute('aria-selected'), 'true');
    await tabs.nth(1).press('End');
    assert.equal(await tabs.nth(3).getAttribute('aria-selected'), 'true');

    for (const [interest, subject] of [['advice', 'AX 문제 진단·자문 문의'], ['build', 'AI 구현·자동화 문의'], ['learn', 'AX 교육·워크숍 문의']]) {
      await page.locator(`[data-interest="${interest}"]`).click();
      assert.equal(await page.locator(`[data-interest="${interest}"]`).getAttribute('aria-pressed'), 'true');
      assert.equal(await page.locator('[data-interest][aria-pressed="true"]').count(), 1);
      const link = await page.locator('#interest-contact').getAttribute('href');
      assert.equal(new URL(link).searchParams.get('subject'), subject);
    }

    const photo = page.getByRole('link', { name: 'if(kakao) 발표 사진 확대 보기', exact: true });
    await photo.click();
    assert.equal(await page.locator('.photo-dialog').evaluate(dialog => dialog.open), true);
    assert.equal(await page.locator('.photo-dialog img').getAttribute('src'), 'public/photos/ifkakao-2018.jpg');
    await page.keyboard.press('Escape');
    assert.equal(await page.locator('.photo-dialog').evaluate(dialog => dialog.open), false);
    assert.equal(await photo.evaluate(link => link === document.activeElement), true);
    assert.equal(await page.evaluate(() => document.documentElement.style.overflow), '');

    for (const width of [320, 375, 768, 1280]) {
      await page.setViewportSize({ width, height: 900 });
      for (let index = 0; index < 4; index++) {
        await tabs.nth(index).click();
        assert.equal(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), true, `overflow at ${width}px stage ${index}`);
      }
    }
    assert.deepEqual(errors, []);
    console.log('PASS: Motion loading, workflow mouse/keyboard, interests, photo modal/focus, 320/375/768/1280px');

    const reduced = await browser.newContext({ reducedMotion: 'reduce' });
    const reducedPage = await reduced.newPage();
    await reducedPage.goto(url, { waitUntil: 'networkidle' });
    assert.equal(await reducedPage.evaluate(() => document.getAnimations().length), 0);
    await reducedPage.getByRole('tab').nth(2).click();
    assert.equal(await reducedPage.locator('#stage-panel-2').isVisible(), true);
    assert.equal(await reducedPage.evaluate(() => document.getAnimations().length), 0);
    await reducedPage.emulateMedia({ media: 'print' });
    assert.equal(await reducedPage.locator('.workflow .flow').isVisible(), true);
    assert.equal(await reducedPage.locator('.workflow-explorer').isVisible(), false);
    assert.equal(await reducedPage.locator('.interest-guide').isVisible(), false);
    console.log('PASS: reduced motion and static print fallback');
    await reduced.close();

    const noScript = await browser.newContext({ javaScriptEnabled: false });
    const staticPage = await noScript.newPage();
    await staticPage.goto(url, { waitUntil: 'networkidle' });
    assert.equal(await staticPage.locator('h1').isVisible(), true);
    assert.equal(await staticPage.locator('.workflow .flow').isVisible(), true);
    assert.equal(await staticPage.locator('.workflow-explorer').isVisible(), false);
    assert.equal(await staticPage.locator('.service-list').isVisible(), true);
    assert.equal(await staticPage.locator('.interest-guide').isVisible(), false);
    assert.equal(await staticPage.locator('[data-photo]').first().getAttribute('href'), 'public/photos/ifkakao-2018.jpg');
    console.log('PASS: JavaScript-disabled content and photo links');
    await noScript.close();
  } finally {
    await browser.close();
  }
})().catch(error => { console.error(error); process.exitCode = 1; });
