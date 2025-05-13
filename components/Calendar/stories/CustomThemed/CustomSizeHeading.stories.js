"use strict";

exports.__esModule = true;
exports["default"] = exports.CustomSizeCalendar = void 0;
var _react = _interopRequireWildcard(require("react"));
var _utils = require("grommet/utils");
var _grommet = require("grommet");
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function _interopRequireWildcard(e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, "default": e }; if (null === e || "object" != typeof e && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (var _t in e) "default" !== _t && {}.hasOwnProperty.call(e, _t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, _t)) && (i.get || i.set) ? o(f, _t, i) : f[_t] = e[_t]); return f; })(e, t); }
var customHeading = (0, _utils.deepMerge)(_grommet.grommet, {
  calendar: {
    heading: {
      level: '3'
    }
  }
});
var CustomSizeCalendar = exports.CustomSizeCalendar = function CustomSizeCalendar() {
  var _useState = (0, _react.useState)(),
    date = _useState[0],
    setDate = _useState[1];
  var onSelect = function onSelect(nextDate) {
    setDate(nextDate !== date ? nextDate : undefined);
  };
  return /*#__PURE__*/_react["default"].createElement(_grommet.Grommet, {
    theme: customHeading
  }, /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
    align: "center",
    pad: "large"
  }, /*#__PURE__*/_react["default"].createElement(_grommet.Calendar, {
    date: date,
    onSelect: onSelect,
    bounds: ['2020-09-08', '2025-12-13']
  })));
};
CustomSizeCalendar.storyName = 'Heading size';
var _default = exports["default"] = {
  title: 'Visualizations/Calendar/Custom Themed/Heading size'
};