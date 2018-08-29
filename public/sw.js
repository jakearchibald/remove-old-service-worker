skipWaiting();

addEventListener('activate', async () => {
  registration.unregister();
  for (const client of await clients.matchAll()) {
    client.navigate(client.url);
  }
});
