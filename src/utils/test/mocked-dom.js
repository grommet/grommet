// (C) Copyright 2014-2015 Hewlett Packard Enterprise Development LP

module.exports = function(markup) {
  if (typeof document !== 'undefined') {
    return;
  }

  var jsdom = require("jsdom-no-contextify").jsdom;
  global.document = jsdom(markup || '');
  global.window = document.defaultView;
  global.navigator = {
    userAgent: 'node.js'
  };
};
