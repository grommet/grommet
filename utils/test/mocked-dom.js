module.exports = function(markup) {
  if (typeof document !== 'undefined') return;
  var jsdom = require("jsdom").jsdom;
  global.document = jsdom(markup || '');
  global.window = document.defaultView;
  global.navigator = {
    userAgent: 'node.js'
  };
};
