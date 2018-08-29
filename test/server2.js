const path = require('path');
const express = require('express');
const app = express();
const uninstallSW = require('../');

app.use(uninstallSW());

app.use((req, res, next) => {
  res.set('Cache-Control', 'no-cache');
  next();
});

app.get('/', (req, res) => {
  res.status(200).sendFile(path.join(__dirname, 'public', 'server2-index.html'));
});

app.get('/service-worker.js', (req, res) => {
  res.status(200).sendFile(path.join(__dirname, 'public', 'server2-sw.js'));
});

app.listen(3000, () => console.log('Server 2 listening on port 3000!'))
