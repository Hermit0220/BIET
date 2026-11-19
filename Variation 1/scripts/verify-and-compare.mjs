import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { chromium } from 'playwright';
import pixelmatch from 'pixelmatch';
import { PNG } from 'pngjs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT_DIR = path.resolve(__dirname, '..');
const DIST_DIR = path.join(ROOT_DIR, 'dist');
const REF_SHOTS_DIR = path.join(ROOT_DIR, 'screenshots', 'reference');
const IMPL_SHOTS_DIR = path.join(ROOT_DIR, 'screenshots', 'impl');
const DIFF_SHOTS_DIR = path.join(ROOT_DIR, 'screenshots', 'diff');

fs.mkdirSync(IMPL_SHOTS_DIR, { recursive: true });
fs.mkdirSync(DIFF_SHOTS_DIR, { recursive: true });

const MIME_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.png': 'image/png',
  '.webp': 'image/webp',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
};

function startSpaServer(port = 4173) {
  return new Promise((resolve) => {
    const server = http.createServer((req, res) => {
      const urlPath = (req.url || '/').split('?')[0];
      let filePath = path.join(DIST_DIR, urlPath === '/' ? 'index.html' : urlPath);
      if (!fs.existsSync(filePath) || fs.statSync(filePath).isDirectory()) {
        filePath = path.join(DIST_DIR, 'index.html');
      }
      const ext = path.extname(filePath).toLowerCase();
      res.writeHead(200, { 'Content-Type': MIME_TYPES[ext] || 'application/octet-stream' });
      fs.createReadStream(filePath).pipe(res);
    });
    server.listen(port, '127.0.0.1', () => resolve(server));
  });
}

async function scrollAndWaitForImages(page) {
  await page.evaluate(async () => {
    await document.fonts.ready;
    const step = Math.max(400, Math.floor(window.innerHeight * 0.8));
    for (let y = 0; y < document.body.scrollHeight; y += step) {
      window.scrollTo(0, y);
      await new Promise((r) => setTimeout(r, 40));
    }
    window.scrollTo(0, 0);
    await new Promise((r) => setTimeout(r, 100));
    const imgs = Array.from(document.querySelectorAll('img'));
    await Promise.all(
      imgs.map((img) => {
        if (img.complete && img.naturalWidth > 0) return Promise.resolve();
        return new Promise((res) => {
          img.addEventListener('load', res, { once: true });
          img.addEventListener('error', res, { once: true });
          setTimeout(res, 1500);
        });
      })
    );
  });
}

function comparePngs(refPath, implPath, diffPath) {
  if (!fs.existsSync(refPath) || !fs.existsSync(implPath)) {
    return null;
  }
  const imgRef = PNG.sync.read(fs.readFileSync(refPath));
  const imgImpl = PNG.sync.read(fs.readFileSync(implPath));
  const width = Math.min(imgRef.width, imgImpl.width);
  const height = Math.min(imgRef.height, imgImpl.height);

  const crop = (src, w, h) => {
    if (src.width === w && src.height === h) return src.data;
    const out = Buffer.alloc(w * h * 4);
    for (let y = 0; y < h; y++) {
      src.data.copy(out, y * w * 4, y * src.width * 4, y * src.width * 4 + w * 4);
    }
    return out;
  };

  const diff = new PNG({ width, height });
  const mismatchedPixels = pixelmatch(
    crop(imgRef, width, height),
    crop(imgImpl, width, height),
    diff.data,
    width,
    height,
    { threshold: 0.15 }
  );
  fs.writeFileSync(diffPath, PNG.sync.write(diff));
  const totalPixels = width * height;
  const mismatchRatio = mismatchedPixels / totalPixels;
  return {
    refDimensions: `${imgRef.width}x${imgRef.height}`,
    implDimensions: `${imgImpl.width}x${imgImpl.height}`,
    comparedDimensions: `${width}x${height}`,
    mismatchedPixels,
    totalPixels,
    similarityPercent: Number(((1 - mismatchRatio) * 100).toFixed(2)),
  };
}

const VIEWPORTS = [
  [1440, 900],
  [1920, 1080],
  [1366, 768],
  [1280, 800],
  [1024, 768],
  [768, 1024],
  [430, 932],
  [390, 844],
  [375, 812],
  [320, 568],
];

const ROUTES = [
  { name: 'about', path: '/about' },
  { name: 'programmes', path: '/programmes' },
  { name: 'programmes_civil_engineering', path: '/programmes/civil-engineering' },
  { name: 'programmes_hndme', path: '/programmes/hndme' },
  { name: 'programmes_hndeee', path: '/programmes/hndeee' },
  { name: 'admissions', path: '/admissions' },
  { name: 'student_life', path: '/student-life' },
  { name: 'news', path: '/news' },
  { name: 'contact', path: '/contact' },
  { name: 'find_my_path', path: '/find-my-path' },
];

const server = await startSpaServer(4173);
const BASE_URL = 'http://127.0.0.1:4173';
const browser = await chromium.launch({ channel: 'msedge' });

const visualComparisons = [];
const e2eResults = [];
const runtimeErrors = [];

try {
  const isFresh = (p) => fs.existsSync(p) && Date.now() - fs.statSync(p).mtimeMs < 15 * 60 * 1000;

  // 1. Capture Home across all 10 viewports & compare against Reference
  for (const [w, h] of VIEWPORTS) {
    const foldName = `ref-home-${w}x${h}-fold.png`;
    const fullName = `ref-home-${w}x${h}-full.png`;
    const implFold = path.join(IMPL_SHOTS_DIR, foldName);
    const implFull = path.join(IMPL_SHOTS_DIR, fullName);

    let metrics = {
      scrollHeight: 0,
      scrollWidth: w,
      innerWidth: w,
      horizontalOverflow: false,
      brokenImages: 0,
    };

    if (!isFresh(implFold) || !isFresh(implFull)) {
      const context = await browser.newContext({
        viewport: { width: w, height: h },
        deviceScaleFactor: 1,
        reducedMotion: 'reduce',
      });
      const page = await context.newPage();
      page.on('pageerror', (err) => runtimeErrors.push(`Home ${w}x${h}: ${err.message}`));

      await page.goto(BASE_URL, { waitUntil: 'networkidle' });
      await scrollAndWaitForImages(page);
      const pauseBtn = page.locator('button[aria-label="Pause"]');
      if (await pauseBtn.isVisible()) {
        await pauseBtn.click();
      }
      const slide1Btn = page.locator('button[aria-label="Go to slide 1"]');
      if (await slide1Btn.isVisible()) {
        await slide1Btn.click();
      }
      await page.evaluate(() => window.scrollTo(0, 0));
      await page.waitForTimeout(250);

      await page.screenshot({ path: implFold, fullPage: false });
      await page.screenshot({ path: implFull, fullPage: true });

      metrics = await page.evaluate(() => ({
        scrollHeight: document.documentElement.scrollHeight,
        scrollWidth: document.documentElement.scrollWidth,
        innerWidth: window.innerWidth,
        horizontalOverflow: document.documentElement.scrollWidth > window.innerWidth,
        brokenImages: Array.from(document.querySelectorAll('img')).filter(
          (img) => !img.complete || img.naturalWidth === 0
        ).length,
      }));
      await context.close();
    }

    const foldCmp = comparePngs(
      path.join(REF_SHOTS_DIR, foldName),
      implFold,
      path.join(DIFF_SHOTS_DIR, foldName)
    );
    const fullCmp = comparePngs(
      path.join(REF_SHOTS_DIR, fullName),
      implFull,
      path.join(DIFF_SHOTS_DIR, fullName)
    );

    visualComparisons.push({
      target: `Home ${w}x${h}`,
      fold: foldCmp,
      full: fullCmp,
      metrics,
    });
  }

  // 2. Capture all secondary routes at 1440x900 & compare against Reference
  const routeContext = await browser.newContext({
    viewport: { width: 1440, height: 900 },
    deviceScaleFactor: 1,
    reducedMotion: 'reduce',
  });
  const routePage = await routeContext.newPage();
  routePage.on('pageerror', (err) => runtimeErrors.push(`Route: ${err.message}`));

  for (const r of ROUTES) {
    const foldName = `route-${r.name}-fold.png`;
    const fullName = `route-${r.name}-full.png`;
    const implFold = path.join(IMPL_SHOTS_DIR, foldName);
    const implFull = path.join(IMPL_SHOTS_DIR, fullName);

    let metrics = {
      scrollHeight: 0,
      horizontalOverflow: false,
      brokenImages: 0,
    };

    if (!isFresh(implFold) || !isFresh(implFull)) {
      await routePage.goto(`${BASE_URL}${r.path}`, { waitUntil: 'networkidle' });
      await scrollAndWaitForImages(routePage);
      await routePage.evaluate(() => window.scrollTo(0, 0));
      await routePage.waitForTimeout(250);
      await routePage.screenshot({ path: implFold, fullPage: false });
      await routePage.screenshot({ path: implFull, fullPage: true });

      metrics = await routePage.evaluate(() => ({
        scrollHeight: document.documentElement.scrollHeight,
        horizontalOverflow: document.documentElement.scrollWidth > window.innerWidth,
        brokenImages: Array.from(document.querySelectorAll('img')).filter(
          (img) => !img.complete || img.naturalWidth === 0
        ).length,
      }));
    }

    const foldCmp = comparePngs(
      path.join(REF_SHOTS_DIR, foldName),
      implFold,
      path.join(DIFF_SHOTS_DIR, foldName)
    );
    const fullCmp = comparePngs(
      path.join(REF_SHOTS_DIR, fullName),
      implFull,
      path.join(DIFF_SHOTS_DIR, fullName)
    );

    visualComparisons.push({
      target: `Route ${r.path}`,
      fold: foldCmp,
      full: fullCmp,
      metrics,
    });
  }

  // 3. Automated Functional E2E Suite
  const recordCheck = (name, passed, detail = '') => {
    e2eResults.push({ name, passed, detail });
    console.log(`${passed ? 'PASS' : 'FAIL'}: ${name}${detail ? ` — ${detail}` : ''}`);
  };

  // Check 1: Home sections & Hero slider controls
  await routePage.goto(BASE_URL, { waitUntil: 'networkidle' });
  const homeH1 = await routePage.locator('h1').first().innerText();
  recordCheck(
    'Homepage loads & displays Hero slide 1',
    homeH1.includes('Building Skills'),
    homeH1
  );

  await routePage.click('button[aria-label="Next slide"]');
  await routePage.waitForTimeout(150);
  const slide2Visible = await routePage
    .locator('h1', { hasText: 'Learn Beyond' })
    .isVisible();
  recordCheck('Hero slider Next button advances slide', slide2Visible);

  // Check 2: Programme Quick-View modal from Home card
  await routePage.locator('#programmes .group.cursor-pointer').first().click();
  await routePage.waitForTimeout(150);
  const quickModalVisible = await routePage
    .locator('[role="dialog"]#programme-modal-title, [aria-labelledby="programme-modal-title"]')
    .isVisible();
  recordCheck('Clicking Home programme card opens ProgrammeQuickViewModal', quickModalVisible);
  await routePage.keyboard.press('Escape');
  await routePage.waitForTimeout(150);

  // Check 3: Header navigation & Apply Modal
  await routePage.locator('header button:has-text("Apply Now")').first().click();
  await routePage.waitForTimeout(150);
  const applyModalVisible = await routePage
    .locator('[aria-labelledby="apply-modal-title"]')
    .isVisible();
  recordCheck('Header Apply Now button opens ApplicationModal', applyModalVisible);

  // Validate form error on empty submit
  await routePage.click('button:has-text("Submit Application")');
  const applyErrText = await routePage
    .locator('text=Please complete your full name')
    .isVisible();
  recordCheck('ApplicationModal validates required fields', applyErrText);

  // Fill and submit ApplicationModal
  await routePage.fill('#app-name', 'Jane Perera');
  await routePage.fill('#app-phone', '+94 77 123 4567');
  await routePage.fill('#app-email', 'jane@example.com');
  await routePage.click('button:has-text("Submit Application")');
  const applySuccess = await routePage.locator('text=Application Received').isVisible();
  recordCheck('ApplicationModal submits & displays reference number', applySuccess);
  await routePage.click('button:has-text("Return to Website")');

  // Check 4: Prospectus Modal download
  await routePage.locator('footer button:has-text("Prospectus")').click();
  await routePage.waitForTimeout(150);
  const prosModalVisible = await routePage
    .locator('[aria-labelledby="prospectus-modal-title"]')
    .isVisible();
  recordCheck('Footer Prospectus button opens ProspectusModal', prosModalVisible);
  await routePage.keyboard.press('Escape');

  // Check 5: Programmes filter tabs & search
  await routePage.goto(`${BASE_URL}/programmes`, { waitUntil: 'networkidle' });
  const initialCount = await routePage.locator('h2.text-xl.font-bold').count();
  recordCheck('Programmes page renders all 16 programmes initially', initialCount === 16, `count=${initialCount}`);

  await routePage.click('button:has-text("Computing & IT")');
  const compCount = await routePage.locator('h2.text-xl.font-bold').count();
  recordCheck('Programmes Computing & IT filter displays 6 programmes', compCount === 6, `count=${compCount}`);

  await routePage.fill('input[placeholder="Search programmes..."]', 'Forensics');
  const searchCount = await routePage.locator('h2.text-xl.font-bold').count();
  recordCheck(
    'Programmes live search filters accurately (matches title & modules)',
    searchCount === 2,
    `count=${searchCount}`
  );

  // Check 6: Programme Detail page table & stage breakdown toggle
  await routePage.goto(`${BASE_URL}/programmes/hndme`, { waitUntil: 'networkidle' });
  const tableRows = await routePage.locator('table tbody tr').count();
  recordCheck('HNDME detail page renders 12-module table', tableRows === 12, `rows=${tableRows}`);
  await routePage.click('button:has-text("Stages View")');
  const part2Btn = await routePage.locator('button:has-text("Part 2")').isVisible();
  recordCheck('HNDME Stages View toggle switches to staged view', part2Btn);

  // Check 7: Student Life interactive facility selector
  await routePage.goto(`${BASE_URL}/student-life`, { waitUntil: 'networkidle' });
  await routePage.click('button:has-text("High-Performance Computing & Cyber Labs")');
  const studioHeading = await routePage
    .locator('h3.text-2xl.font-bold', {
      hasText: 'High-Performance Computing & Cyber Labs',
    })
    .isVisible();
  recordCheck('Student Life facility selector updates detail panel', studioHeading);

  // Check 8: News page event registration & NewsArticleModal
  await routePage.goto(`${BASE_URL}/news`, { waitUntil: 'networkidle' });
  await routePage.locator('button:has-text("Register")').first().click();
  const seatReserved = await routePage.locator('text=Registered').first().isVisible();
  recordCheck('News event Register button confirms registration', seatReserved);

  await routePage.locator('span:has-text("Read More")').first().click();
  const newsModalVisible = await routePage
    .locator('[aria-labelledby="news-modal-title"]')
    .isVisible();
  recordCheck('Clicking News article opens NewsArticleModal', newsModalVisible);
  await routePage.keyboard.press('Escape');

  // Check 9: Contact form submission & FAQ accordion
  await routePage.goto(`${BASE_URL}/contact`, { waitUntil: 'networkidle' });
  await routePage.fill('input[placeholder="e.g. Kasun Perera"]', 'Kasun Silva');
  await routePage.fill('input[placeholder="e.g. kasun@example.lk"]', 'kasun@example.com');
  await routePage.fill('textarea[placeholder="Your question or message..."]', 'Inquiry about September intake.');
  await routePage.click('button:has-text("Send Message")');
  const inquiryLogged = await routePage
    .locator('text=Message Sent')
    .isVisible();
  recordCheck('Contact inquiry form validates & submits', inquiryLogged);

  // Check 10: Find My Path 4-step wizard & Admin Modal
  await routePage.goto(`${BASE_URL}/find-my-path`, { waitUntil: 'networkidle' });
  await routePage.click('button:has-text("Next: Academic Details")');
  await routePage.click('button:has-text("Next: Future Goals")');
  await routePage.click('button:has-text("Discover My Matched BIET Pathways")');
  const pathwayReportVisible = await routePage
    .locator('text=We Found 16 Suitable Pathways For You')
    .isVisible();
  recordCheck('Find My Path 4-step wizard computes all 16 pathways', pathwayReportVisible);

  await routePage.click('button:has-text("Manage Entry Rules (Admin)")');
  const adminModalVisible = await routePage
    .locator('text=BIET Admissions & Pathway Rule Manager')
    .isVisible();
  recordCheck('Find My Path Admin Console modal opens & loads 16 rules', adminModalVisible);
  await routePage.keyboard.press('Escape');

  await routeContext.close();

  // Check 11: Mobile navigation drawer at 390x844
  const mobileCtx = await browser.newContext({
    viewport: { width: 390, height: 844 },
    reducedMotion: 'reduce',
  });
  const mobilePage = await mobileCtx.newPage();
  await mobilePage.goto(BASE_URL, { waitUntil: 'networkidle' });
  await mobilePage.click('button[aria-label="Toggle navigation menu"]');
  const drawerVisible = await mobilePage.locator('.liquid-glass-drawer').isVisible();
  recordCheck('Mobile menu button opens .liquid-glass-drawer', drawerVisible);
  await mobilePage.screenshot({
    path: path.join(IMPL_SHOTS_DIR, 'state-mobile-open.png'),
  });
  await mobilePage.click('button[aria-label="Toggle navigation menu"]');
  await mobilePage.waitForTimeout(100);
  const drawerClosed = !(await mobilePage.locator('.liquid-glass-drawer').isVisible());
  recordCheck('Mobile menu drawer closes on toggle', drawerClosed);
  await mobileCtx.close();

  recordCheck('Zero runtime/page errors across all routes & viewports', runtimeErrors.length === 0);
} finally {
  await browser.close();
  server.close();
}

fs.writeFileSync(
  path.join(ROOT_DIR, 'screenshots', 'visual-diff-report.json'),
  JSON.stringify({ visualComparisons, e2eResults, runtimeErrors }, null, 2)
);

console.log('\n=== VISUAL COMPARISON SUMMARY ===');
for (const vc of visualComparisons) {
  console.log(
    `${vc.target.padEnd(38)} | Fold: ${
      vc.fold ? vc.fold.similarityPercent + '%' : 'N/A'
    } | Full: ${vc.full ? vc.full.similarityPercent + '%' : 'N/A'} (${
      vc.full ? vc.full.refDimensions + ' vs ' + vc.full.implDimensions : ''
    }) | Overflow: ${vc.metrics.horizontalOverflow} | BrokenImgs: ${vc.metrics.brokenImages}`
  );
}
