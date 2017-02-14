'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _enUS = require('./en-US');

Object.keys(_enUS).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _enUS[key];
    }
  });
});