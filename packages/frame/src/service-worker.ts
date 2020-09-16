// hack of self type of ServiceWorkerGlobalScope in typescript
export default undefined;
declare const self: ServiceWorkerGlobalScope;

// skip update waiting
self.addEventListener('install', () => {
  self.skipWaiting();
});

// function rewriteImports(content: string) {
//   return content.replace(/from ['|"]([^'"]+)['|"]/g, ($0, $1) => {
//     if ($1[0] !== '.' && $1[1] !== '/') {
//       return `from 'https://cdn.skypack.dev/${$1}'`;
//     }
//     return $0;
//   });
// }

// intercept all fetch events
// self.addEventListener('fetch', (event) => {
//   const url = new URL(event.request.url);

//   if (
//     url.hostname === location.hostname &&
//     url.port === location.port &&
//     /\.js$/.test(url.pathname)
//   ) {
//     event.respondWith(
//       (async () => {
//         // const res = await fetch(url.pathname);
//         // const content = await res.text();

//         return new Response('', {
//           headers: { 'Content-Type': 'text/javascript' },
//         });
//       })(),
//     );
//   }
// });

let getVersionPort: MessagePort;
let count = 0;

self.addEventListener('message', (event) => {
  if (event.data?.type === 'INIT_PORT') {
    [getVersionPort] = event.ports;
  }

  if (event.data?.type === 'INCREASE_COUNT') {
    count += 1;
    getVersionPort.postMessage({ payload: count });
  }
});
