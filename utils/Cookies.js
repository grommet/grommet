'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _jsCookie = require('js-cookie');

var _jsCookie2 = _interopRequireDefault(_jsCookie);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  get: function get(name) {
    return _jsCookie2.default.get(name);
  },
  set: function set(name, value, expires, path, domain, secure) {
    return _jsCookie2.default.set(name, value, { expires: expires, path: path, domain: domain, secure: secure });
  },
  remove: function remove(name, path, domain) {
    _jsCookie2.default.remove(name, { path: path, domain: domain });
  },
  has: function has(name) {
    return _jsCookie2.default.get(name) ? true : false;
  },
  keys: function keys() {
    return Object.keys(_jsCookie2.default.get());
  }
}; // (C) Copyright 2015-2018 Hewlett Packard Enterprise Development LP

module.exports = exports['default'];