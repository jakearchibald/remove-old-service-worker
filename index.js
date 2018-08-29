var path = require('path');
var fs = require('fs');
var hijackResponse = require('hijackresponse');

module.exports = function removeOldServiceWorker() {
  return function removeOldServiceWorker(req, res, next) {
    if (req.get('Service-Worker') !== 'script') {
      next();
      return;
    }

    hijackResponse(res, function(err, res) {
      if (err || res.statusCode !== 404) {
        res.unhijack();
        next(err);
        return;
      }

      res.statusCode = 200;
      res.statusMessage = 'OK';
      res.set({
        'Cache-Control': 'no-cache',
        'Service-Worker-Allowed': '/',
        'Content-Type': 'text/javascript'
      });
      res.removeHeader('Content-Encoding');
      res.removeHeader('Content-Length');

      var fileStream = fs.createReadStream(path.join(__dirname, 'public', 'sw.js'));
      fileStream.pipe(res);
    });

    next();
  }
};
