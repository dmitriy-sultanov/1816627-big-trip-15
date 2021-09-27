const CACHE_PREFIX = 'bigtrip-cache';
const CACHE_VER = 'v15';
const CACHE_NAME = `${CACHE_PREFIX}-${CACHE_VER}`;

const HTTP_STATUS_OK = 200;
const RESPONSE_SAFE_TYPE = 'basic';
const APP_FILES = [
  '/',
  '/index.html',
  '/favicon.ico',
  '/bundle.js',
  '/css/style.css',
  '/fonts/Montserrat-Bold.woff2',
  '/fonts/Montserrat-ExtraBold.woff2',
  '/fonts/Montserrat-Medium.woff2',
  '/fonts/Montserrat-Regular.woff2',
  '/fonts/Montserrat-SemiBold.woff2',
  '/img/icons/bus.png',
  '/img/icons/check-in.png',
  '/img/icons/drive.png',
  '/img/icons/flight.png',
  '/img/icons/restaurant.png',
  '/img/icons/ship.png',
  '/img/icons/sightseeing.png',
  '/img/icons/taxi.png',
  '/img/icons/train.png',
  '/img/icons/transport.png',
  '/img/header-bg.png',
  '/img/header-bg@2x.png',
  '/img/logo.png',
];

self.addEventListener('install', (evt) => {
  evt.waitUntil(caches.open(CACHE_NAME).then((cache) => cache.addAll(APP_FILES)));
});

self.addEventListener('activate', (evt) => {
  evt.waitUntil(
    caches.keys()
      .then(
        (keys) => Promise.all(
          keys.map(
            (key) => {
              if (key.startsWith(CACHE_PREFIX) && key !== CACHE_NAME) {
                return caches.delete(key);
              }

              return null;
            })
            .filter((key) => key !== null),
        ),
      ),
  );
});

self.addEventListener('fetch', (evt) => {
  const {request} = evt;

  evt.respondWith(
    caches.match(request)
      .then((cacheResponse) => {
        if (cacheResponse) {
          return cacheResponse;
        }

        return fetch(request)
          .then((response) => {
            if (response && response.status === HTTP_STATUS_OK && response.type === RESPONSE_SAFE_TYPE) {
              const clonedResponse = response.clone();
              caches.open(CACHE_NAME).then((cache) => cache.put(request, clonedResponse));
            }

            return response;
          });
      }),
  );
});
