var express = require('express');
var router = express.Router();
var path = require('path');

router.use('/', express.static(path.join(__dirname, '/../todo-app/dist')));
router.get('/*', function (req, res) {
  res.sendFile(path.resolve(__dirname, '/../todo-app/dist/index.html'));
});

module.exports = router;
