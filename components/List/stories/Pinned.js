"use strict";

exports.__esModule = true;
exports["default"] = exports.Pinned = void 0;
var _react = _interopRequireWildcard(require("react"));
var _grommet = require("grommet");
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
var locations = ['Los Angelos', 'Boise', 'Fort Collins', 'Los Gatos', 'Palo Alto', 'Pheonix', 'San Francisco', 'Trenton'];
var pinnedLocations = ['Los Angelos', 'Fort Collins', 'Palo Alto', 'Pheonix', 'Trenton'];
var Pinned = function Pinned() {
  var _useState = (0, _react.useState)(locations),
    ordered = _useState[0],
    setOrder = _useState[1];
  return /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
    align: "center",
    pad: "large"
  }, /*#__PURE__*/_react["default"].createElement(_grommet.List, {
    "aria-label": "pinned list",
    data: ordered,
    onOrder: setOrder,
    pinned: pinnedLocations
  }));
};
exports.Pinned = Pinned;
var _default = {
  title: 'Visualizations/List/Pinned'
};
exports["default"] = _default;