"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (fn) {
  var threshhold = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 250;
  var scope = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : this;

  var last = void 0;
  var deferTimer = void 0;

  return function () {
    var now = Date.now();
    if (last && now < last + threshhold) {
      clearTimeout(deferTimer);
      deferTimer = setTimeout(function () {
        last = now;
        fn.apply(scope, arguments);
      }, threshhold);
    } else {
      last = now;
      fn.apply(scope, arguments);
    }
  };
};

module.exports = exports["default"]; // (C) Copyright 2014-2016 Hewlett Packard Enterprise Development LP