// const staticCacheName = 'tb-v1.0.0'

// const assetUrls = [
//   "index.html",
//   "favicon.ico",
//   ""
// ]

// self.addEventListener('install', event => {
//   console.log("install event")
//   event.waitUntil(
//     caches.open(staticCacheName).then(cache => cache.addAll(
//       [

//       ]
//     ))
//   )
// })

// self.addEventListener('activate', event => {
//   console.log("activate  event")
// })


const CACHE = "pwabuilder-offline";

importScripts('https://storage.googleapis.com/workbox-cdn/releases/5.1.2/workbox-sw.js');

self.addEventListener("message", (event) => {
  if (event.data && event.data.type === "SKIP_WAITING") {
    self.skipWaiting();
  }
});

workbox.routing.registerRoute(
  new RegExp('/*'),
  new workbox.strategies.StaleWhileRevalidate({
    cacheName: CACHE
  })
);