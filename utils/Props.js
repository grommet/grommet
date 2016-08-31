"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _keys = require("babel-runtime/core-js/object/keys");

var _keys2 = _interopRequireDefault(_keys);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// (C) Copyright 2014-2016 Hewlett Packard Enterprise Development LP

exports.default = {
  pick: function pick(props, fields) {
    var has = function has(p) {
      return props.hasOwnProperty(p);
    };
    var obj = {};
    (fields || []).forEach(function (field) {
      if (has(field)) obj[field] = props[field];
    });
    return obj;
  },
  omit: function omit(props, fields) {
    var obj = {};
    (0, _keys2.default)(props).forEach(function (p) {
      if ((fields || []).indexOf(p) === -1) {
        obj[p] = props[p];
      }
    });
    return obj;
  }
};
module.exports = exports["default"];