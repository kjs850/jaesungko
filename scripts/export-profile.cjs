// npm ci && npx playwright install chromium && npm run export:profile
// Set CHROME_PATH to use an existing Chrome installation instead.
const { chromium } = require('playwright');
const { readFile } = require('node:fs/promises');
const { resolve } = require('node:path');
const { pathToFileURL } = require('node:url');
const root = resolve(__dirname, '..');
(async () => {
  const browser = await chromium.launch(process.env.CHROME_PATH ? { executablePath: process.env.CHROME_PATH } : {});
  try {
    const page = await browser.newPage({ viewport: { width: 1200, height: 900 }, deviceScaleFactor: 1 });
    await page.goto(pathToFileURL(resolve(root, 'index.html')).href, { waitUntil: 'networkidle' });
    await page.evaluate(async () => {
      document.querySelectorAll('img').forEach(img => { img.loading = 'eager'; });
      await document.fonts.load('600 16px Pretendard', '고재성');
      await document.fonts.ready;
      if (!document.fonts.check('600 16px Pretendard', '고재성')) throw new Error('Profile font did not load');
      await Promise.all([...document.images].map(img => img.decode()));
      const canonical = document.querySelector('link[rel="canonical"]').href;
      document.querySelectorAll('a[href]').forEach(a => {
        const href = a.getAttribute('href');
        if (!href.startsWith('#')) a.href = new URL(href, canonical).href;
      });
    });
    await page.pdf({ path: resolve(root, 'public/jaesung-ko-profile.pdf'), format: 'A4', printBackground: true, preferCSSPageSize: true, tagged: true });
    const portrait = await readFile(resolve(root, 'public/profile.jpg'));
    const template = await readFile(resolve(__dirname, 'og-template.html'), 'utf8');
    await page.setViewportSize({ width: 1200, height: 630 });
    await page.setContent(template.replace('{{PORTRAIT}}', `data:image/jpeg;base64,${portrait.toString('base64')}`), { waitUntil: 'networkidle' });
    await page.evaluate(async () => { await document.fonts.ready; await Promise.all([...document.images].map(img => img.decode())); });
    await page.screenshot({ path: resolve(root, 'public/og-profile.png') });
    console.log('Generated public/jaesung-ko-profile.pdf and public/og-profile.png');
  } finally { await browser.close(); }
})().catch(error => { console.error(error); process.exitCode = 1; });
