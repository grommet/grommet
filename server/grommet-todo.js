var express = require('express');
var router = express.Router();
var path = require('path');

router.use('/', express.static(path.join(__dirname, '/../examples/grommet-todo/dist')));
router.get('/*', function (req, res) {
  res.sendFile(path.resolve(__dirname, '/../examples/grommet-todo/dist/index.html'));
});

module.exports = router;
