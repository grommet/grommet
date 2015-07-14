var express = require('express');
var router = express.Router();
var path = require('path');

router.use('/', express.static(path.join(__dirname, '/../people-finder/dist')));
router.get('/*', function (req, res) {
  res.sendFile(path.resolve(path.join(__dirname, '/../people-finder/dist/index.html')));
});

module.exports = router;
