"use strict";

exports.__esModule = true;
var _exportNames = {
  Skeleton: true
};
exports.Skeleton = void 0;
var _Skeleton = require("./Skeleton");
exports.Skeleton = _Skeleton.Skeleton;
var _SkeletonContext = require("./SkeletonContext");
Object.keys(_SkeletonContext).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _SkeletonContext[key]) return;
  exports[key] = _SkeletonContext[key];
});