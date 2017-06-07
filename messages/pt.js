'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _ptBR = require('./pt-BR');

Object.keys(_ptBR).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _ptBR[key];
    }
  });
});