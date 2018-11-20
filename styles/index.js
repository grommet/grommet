"use strict";

exports.__esModule = true;

var _global = require("./global");

Object.keys(_global).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  exports[key] = _global[key];
});