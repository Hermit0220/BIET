import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { chromium } from 'playwright';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, '..');
const distDir = path.join(rootDir, 'dist');
const screenshotsDir = path.join(rootDir, 'screenshots');
fs.mkdirSync(screenshotsDir, { recursive: true });

const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.png': 'image/png',
  '.webp': 'image/webp',
  '.svg': 'image/svg+xml',
  '.mp4': 'video/mp4',
  '.ico': 'image/x-icon',
};

// Serve dist mounted at /BIET-NEW/ AND / to verify subpath routing & deep-link refresh (T06)
function startServer() {
  return new Promise((resolve) => {
    const server = http.createServer((req, res) => {
      const urlPath = (req.url || '/').split('?')[0];
      const stripped = urlPath.startsWith('/BIET-NEW/')
        ? urlPath.slice('/BIET-NEW/'.length)
        : urlPath === '/BIET-NEW'
          ? ''
          : urlPath.replace(/^\//, '');

      let filePath = path.join(distDir, stripped === '' ? 'index.html' : stripped);
      if (!fs.existsSync(filePath) || fs.statSync(filePath).isDirectory()) {
        // Static SPA fallback mimicking 404.html / GitHub Pages
        filePath = path.join(distDir, 'index.html');
      }

      const ext = path.extname(filePath);
      const stat = fs.statSync(filePath);

      // Support HTTP Range for MP4 hero video
      if (ext === '.mp4' && req.headers.range) {
        const parts = req.headers.range.replace(/bytes=/, '').split('-');
        const start = parseInt(parts[0], 10);
        const end = parts[1] ? parseInt(parts[1], 10) : stat.size - 1;
        res.writeHead(206, {
          'Content-Range': `bytes ${start}-${end}/${stat.size}`,
          'Accept-Ranges': 'bytes',
          'Content-Length': end - start + 1,
          'Content-Type': 'video/mp4',
        });
        fs.createReadStream(filePath, { start, end }).pipe(res);
        return;
      }

      res.writeHead(200, { 'Content-Type': MIME[ext] || 'application/octet-stream' });
      fs.createReadStream(filePath).pipe(res);
    });
    server.listen(0, '127.0.0.1', () => {
      resolve({ server, port: server.address().port });
    });
  });
}

const { server, port } = await startServer();
const BASE = `http://127.0.0.1:${port}/BIET-NEW`;
console.log(`Serving /BIET-NEW/ subpath build at ${BASE}`);

const browser = await chromium.launch({ channel: 'msedge' });

try {
  const viewports = [
    { name: '1440x900', width: 1440, height: 900 },
    { name: '1920x1080', width: 1920, height: 1080 },
    { name: '1366x768', width: 1366, height: 768 },
    { name: '1024x768', width: 1024, height: 768 },
    { name: '768x1024', width: 768, height: 1024 },
    { name: '390x844', width: 390, height: 844 },
    { name: '320x568', width: 320, height: 568 },
  ];

  let totalErrors = 0;

  for (const vp of viewports) {
    const context = await browser.newContext({ viewport: { width: vp.width, height: vp.height } });
    const page = await context.newPage();
    const errs = [];
    page.on('console', (msg) => {
      if (msg.type() === 'error') errs.push(msg.text());
    });
    page.on('pageerror', (err) => errs.push(String(err)));

    await page.goto(`${BASE}/`, { waitUntil: 'networkidle' });
    await page.waitForTimeout(300);

    const h = await page.evaluate(() => document.body.scrollHeight);
    for (let y = 0; y <= h; y += 600) {
      await page.evaluate((pos) => window.scrollTo(0, pos), y);
      await page.waitForTimeout(60);
    }
    await page.evaluate(() => window.scrollTo(0, 0));
    await page.waitForTimeout(200);

    const check = await page.evaluate(() => {
      const overflow = document.documentElement.scrollWidth > window.innerWidth;
      const brokenImgs = Array.from(document.querySelectorAll('img')).filter(
        (img) => !img.complete || img.naturalWidth === 0
      ).length;
      const h1 = document.querySelector('h1')?.textContent?.trim();
      const tcuLeak = document.body.innerText.includes('TCU') || document.body.innerText.includes('Horned Frog');
      return { overflow, brokenImgs, h1, tcuLeak, w: window.innerWidth, sw: document.documentElement.scrollWidth };
    });

    if (vp.name === '1440x900') {
      await page.screenshot({ path: path.join(screenshotsDir, 'home-desktop.png'), fullPage: false });
      await page.locator('#priority-programmes-heading').scrollIntoViewIfNeeded();
      await page.waitForTimeout(300);
      await page.screenshot({ path: path.join(screenshotsDir, 'priority-programmes.png'), fullPage: false });
    }
    if (vp.name === '390x844') {
      await page.screenshot({ path: path.join(screenshotsDir, 'home-mobile.png'), fullPage: false });
    }

    totalErrors += errs.length + (check.overflow ? 1 : 0) + check.brokenImgs + (check.tcuLeak ? 1 : 0);
    console.log(
      `VP ${vp.name.padEnd(10)} | overflow=${check.overflow} (${check.sw}/${check.w}) | brokenImgs=${check.brokenImgs} | tcuLeak=${check.tcuLeak} | errs=${errs.length}`
    );
    await context.close();
  }

  // Test reduced motion + deep link refresh + full journeys at 1440x900
  const ctx = await browser.newContext({
    viewport: { width: 1440, height: 900 },
    reducedMotion: 'reduce',
  });
  const page = await ctx.newPage();
  const journeyErrs = [];
  page.on('console', (msg) => {
    if (msg.type() === 'error') journeyErrs.push(msg.text());
  });

  // 1. Subpath deep-link refresh & menu/search keyboard check
  await page.goto(`${BASE}/programmes/diploma-in-computing`, { waitUntil: 'networkidle' });
  await page.reload({ waitUntil: 'networkidle' });
  const detailH1 = await page.locator('h1').textContent();
  await page.screenshot({ path: path.join(screenshotsDir, 'programme-detail.png') });

  // Open Menu & Escape focus return
  await page.getByRole('button', { name: /Open full site navigation menu/i }).click();
  await page.waitForTimeout(200);
  await page.screenshot({ path: path.join(screenshotsDir, 'menu-overlay.png') });
  await page.keyboard.press('Escape');
  await page.waitForTimeout(150);

  // Directory + Filters + Screenshot
  await page.goto(`${BASE}/programmes`, { waitUntil: 'networkidle' });
  await page.waitForTimeout(250);
  await page.screenshot({ path: path.join(screenshotsDir, 'directory.png') });

  // 2. Complete Finder Journey from Homepage Starting Point card -> 4 steps -> Results
  await page.goto(`${BASE}/`, { waitUntil: 'networkidle' });
  await page.getByRole('button', { name: /After A\/Ls/i }).click();
  await page.waitForURL('**/find-my-path');
  await page.waitForTimeout(250);
  const step1Visible = await page.getByRole('heading', { name: /Where are you in your education journey/i }).isVisible();
  const actionBarHiddenOnFinder = (await page.locator('[aria-label="Persistent admissions actions"]').count()) === 0;
  await page.screenshot({ path: path.join(screenshotsDir, 'finder-step1.png') });

  // Continue Step 1 -> 2 -> 3 (select Computing) -> 4 -> Results
  await page.getByRole('button', { name: /^Continue$/i }).click();
  await page.getByRole('button', { name: /^Continue$/i }).click();
  await page.getByLabel('Computing & Technology').check();
  await page.getByRole('button', { name: /^Continue$/i }).click();
  await page.getByRole('button', { name: /Show My Options/i }).click();
  await page.waitForTimeout(250);
  const resultsVisible = await page.getByRole('heading', { name: /Explore your study options/i }).isVisible();
  await page.screenshot({ path: path.join(screenshotsDir, 'finder-results.png') });

  // 3. Contact / Consultation validation & unconfigured endpoint honest handling
  await page.goto(`${BASE}/contact?enquiry=consultation&programme=diploma-in-computing`, { waitUntil: 'networkidle' });
  await page.getByLabel(/Your name/i).fill('Kumara');
  await page.getByLabel(/WhatsApp mobile number/i).fill('+94771234567');
  await page.getByRole('checkbox').first().check();
  await page.getByRole('button', { name: /Request Consultation/i }).click();
  await page.waitForTimeout(200);
  const honestAlertVisible = await page.getByRole('alert').isVisible();
  await page.screenshot({ path: path.join(screenshotsDir, 'contact-consultation.png') });

  // 4. All secondary pages render with 0 errors
  for (const r of ['/about', '/admissions', '/student-life', '/news', '/programmes/certificate-drafting-legacy']) {
    await page.goto(`${BASE}${r}`, { waitUntil: 'networkidle' });
    const h1 = await page.locator('h1').textContent();
    console.log(`Route ${r.padEnd(42)} -> H1: ${h1?.trim()}`);
  }

  console.log('\n--- Interactive E2E Summary ---');
  console.log(`Subpath Deep-Link Detail H1 : ${detailH1?.trim()}`);
  console.log(`Finder Step 1 from Home     : ${step1Visible}`);
  console.log(`ActionBar Hidden in Finder  : ${actionBarHiddenOnFinder}`);
  console.log(`Finder Results Before PII   : ${resultsVisible}`);
  console.log(`Consultation Honest Alert   : ${honestAlertVisible}`);
  console.log(`Console/Runtime Errors      : ${journeyErrs.length}`);

  await ctx.close();

  if (totalErrors > 0 || journeyErrs.length > 0 || !step1Visible || !actionBarHiddenOnFinder || !resultsVisible || !honestAlertVisible) {
    process.exitCode = 1;
  }
} finally {
  await browser.close();
  server.close();
}
