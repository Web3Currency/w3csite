const { execSync } = require('child_process');
if (process.env.VERCEL) {
  console.log('Running react-snap prerender on Vercel build...');
  execSync('npx react-snap', { stdio: 'inherit' });
} else {
  console.log('Skipping prerender (not a Vercel build).');
}
