'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _jaJP = require('./ja-JP');

Object.keys(_jaJP).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _jaJP[key];
    }
  });
});