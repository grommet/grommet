'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _ruRU = require('./ru-RU');

Object.keys(_ruRU).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _ruRU[key];
    }
  });
});