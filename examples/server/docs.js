var express = require('express');
var router = express.Router();
var path = require('path');

router.use('/', express.static('../../docs/dist'));
router.get('/|/styleguide|/documentation|/downloads', function (req, res) {
  res.sendFile(path.resolve(__dirname + '/../../docs/dist/index.html'));
});

router.get('/hpe', function (req, res) {
  res.sendFile(path.resolve(__dirname + '/../../docs/dist/hpe/index.html'));
});

module.exports = router;
