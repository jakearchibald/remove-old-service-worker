addEventListener('fetch', event => {
  event.respondWith(
    new Response(`<!DOCTYPE html>
      <h1>Served from server 2's service worker</h1>
    `, {
      headers: {'Content-Type': 'text/html'}
    })
  );
});
