var express = require('express');
var router = express.Router();
var path = require('path');

router.use('/', express.static('../tour/dist'));
router.get('/*', function (req, res) {
  res.sendFile(path.resolve(__dirname + '/../tour/dist/index.html'));
});

module.exports = router;