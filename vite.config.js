import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

function resolveSiteOrigin() {
  const raw =
    process.env.VITE_SITE_URL ||
    process.env.APP_URL ||
    (process.env.VERCEL_PROJECT_PRODUCTION_URL
      ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
      : '') ||
    (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : '');
  return raw.replace(/\/+$/, '');
}

const seoOriginPlugin = () => ({
  name: 'seo-origin-transform',
  transformIndexHtml(html) {
    const origin = resolveSiteOrigin();
    return html.replaceAll('__SITE_ORIGIN__', origin);
  },
});

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), seoOriginPlugin()],
  server: {
    host: '0.0.0.0',
    port: 3000,
    allowedHosts: true,
  },
})
