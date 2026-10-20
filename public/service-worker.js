/* Cache the portfolio shell and viewed assets; external projects stay online. */
const CACHE = 'codeflix-shell-v1';
const base = new URL('./', self.location.href);
const home = new URL('index.html', base).href;

self.addEventListener('install', event => {
  event.waitUntil((async () => {
    const cache = await caches.open(CACHE);
    const response = await fetch(home, { cache: 'reload' });
    if (!response.ok) throw new Error('Unable to load the app shell');
    const html = await response.clone().text();
    const resources = [...html.matchAll(/(?:src|href)="([^"]+)"/g)]
      .map(match => new URL(match[1], base))
      .filter(url => url.origin === base.origin && url.pathname.startsWith(`${base.pathname}static/`))
      .map(url => url.href);
    await cache.addAll([...new Set([
      ...resources,
      new URL('manifest.json', base).href,
      new URL('codeflix-icon.svg', base).href,
      new URL('logo2.png', base).href,
      new URL('project-placeholder.svg', base).href,
      new URL('midia/TomorrowLogo.png', base).href,
      new URL('midia/PrismaLogo.png', base).href,
      new URL('icons/codeflix-192.png', base).href,
      new URL('icons/codeflix-512.png', base).href,
    ])]);
    await cache.put(home, response);
  })());
});

self.addEventListener('activate', event => {
  event.waitUntil((async () => {
    await Promise.all((await caches.keys())
      .filter(key => key.startsWith('codeflix-shell-') && key !== CACHE)
      .map(key => caches.delete(key)));
    await self.clients.claim();
  })());
});

self.addEventListener('fetch', event => {
  const url = new URL(event.request.url);
  if (event.request.method !== 'GET' || url.origin !== base.origin || !url.pathname.startsWith(base.pathname)) return;
  event.respondWith((async () => {
    const cache = await caches.open(CACHE);
    if (url.pathname.startsWith(`${base.pathname}static/`)) {
      const cached = await cache.match(event.request);
      if (cached) return cached;
    }
    try {
      const response = await fetch(event.request);
      if (response.ok) {
        await cache.put(event.request.mode === 'navigate' ? home : event.request, response.clone()).catch(() => {});
      }
      return response;
    } catch {
      const cached = await cache.match(event.request.mode === 'navigate' ? home : event.request);
      return cached || Response.error();
    }
  })());
});
