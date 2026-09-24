import path from 'path';
import fs from 'fs';
import http from 'http';
import { fileURLToPath } from 'url';
import chromium from '@sparticuz/chromium';
import puppeteer from 'puppeteer-core';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

if (!process.env.VERCEL) {
  console.log('Skipping prerender (not a Vercel build).');
  process.exit(0);
}

const DIST = path.join(__dirname, '..', 'dist');
const PORT = 5005;

// Only prerender canonical, indexable public routes.
// Obsolete service/project URLs are handled by Vercel redirects and must not
// be generated as standalone HTML pages.
const ROUTES = [
  '/',
  '/about',
  '/services',
  '/projects',
  '/projects/w3c-pi-bookings',
  '/projects/w3c-digital-network',
  '/projects/gold-marine-group',
  '/projects/w3c-test-token-tracker',
  '/contact',
  '/ledger',
  '/privacy',
  '/terms',
  '/blog'
];

const MIME = {
  '.html': 'text/html', '.js': 'application/javascript', '.css': 'text/css',
  '.svg': 'image/svg+xml', '.png': 'image/png', '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg', '.json': 'application/json', '.ico': 'image/x-icon',
  '.woff2': 'font/woff2', '.txt': 'text/plain', '.xml': 'application/xml',
  '.webmanifest': 'application/manifest+json'
};

function serve() {
  return new Promise((resolve) => {
    const server = http.createServer((req, res) => {
      let filePath = path.join(DIST, decodeURIComponent(req.url.split('?')[0]));
      if (fs.existsSync(filePath) && fs.statSync(filePath).isDirectory()) {
        filePath = path.join(filePath, 'index.html');
      }
      if (!fs.existsSync(filePath)) {
        filePath = path.join(DIST, 'index.html');
      }
      const ext = path.extname(filePath);
      res.writeHead(200, { 'Content-Type': MIME[ext] || 'application/octet-stream' });
      fs.createReadStream(filePath).pipe(res);
    });
    server.listen(PORT, () => resolve(server));
  });
}

async function run() {
  const server = await serve();
  const browser = await puppeteer.launch({
    args: chromium.args,
    executablePath: await chromium.executablePath(),
    headless: chromium.headless,
  });

  for (const route of ROUTES) {
    const page = await browser.newPage();
    const url = `http://localhost:${PORT}${route}`;
    console.log('Rendering', url);
    await page.goto(url, { waitUntil: 'networkidle0', timeout: 30000 });
    await new Promise((r) => setTimeout(r, 500));
    const html = await page.content();
    await page.close();

    const outDir = route === '/' ? DIST : path.join(DIST, route);
    fs.mkdirSync(outDir, { recursive: true });
    fs.writeFileSync(path.join(outDir, 'index.html'), html);
  }

  await browser.close();
  server.close();
  console.log('Prerender complete.');
}

run().catch((err) => {
  console.error('Prerender failed, falling back to plain SPA:', err);
  process.exit(0);
});
