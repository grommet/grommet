'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _zhCN = require('./zh-CN');

Object.keys(_zhCN).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _zhCN[key];
    }
  });
});