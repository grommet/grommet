"use strict";

exports.__esModule = true;
var _AnalyticsContext = require("./AnalyticsContext");
Object.keys(_AnalyticsContext).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _AnalyticsContext[key]) return;
  exports[key] = _AnalyticsContext[key];
});