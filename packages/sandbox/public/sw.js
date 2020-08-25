self.addEventListener('install', () => {
  self.skipWaiting();
});

self.addEventListener('fetch', (event) => {
  const url = new URL(event.request.url);

  if (
    url.hostname === location.hostname &&
    url.port === location.port &&
    /\.js$/.test(url.pathname)
  ) {
    event.respondWith(
      new Promise(async (resolve) => {
        const res = await fetch(url.pathname);
        const content = await res.text();

        resolve(
          new Response(rewriteImports(content), {
            headers: { 'Content-Type': 'text/javascript' },
          }),
        );
      }),
    );
  }
});

function rewriteImports(content) {
  return content.replace(/from ['|"]([^'"]+)['|"]/g, function ($0, $1) {
    // 要访问 node_modules 里的文件
    if ($1[0] !== '.' && $1[1] !== '/') {
      return `from 'https://cdn.skypack.dev/${$1}'`;
    }
    return $0;
  });
}

var x = 1;
