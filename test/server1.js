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
  res.status(200).sendFile(path.join(__dirname, 'public', 'server1-index.html'));
});

app.get('/sw.js', (req, res) => {
  res.status(200).sendFile(path.join(__dirname, 'public', 'server1-sw.js'));
});

app.listen(3000, () => console.log('Server 1 listening on port 3000!'))
