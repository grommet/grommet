'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _frFR = require('./fr-FR');

Object.keys(_frFR).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _frFR[key];
    }
  });
});