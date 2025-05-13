"use strict";

exports.__esModule = true;
exports["default"] = exports.ThinStory = void 0;
var _react = _interopRequireWildcard(require("react"));
var _grommet = require("grommet");
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function _interopRequireWildcard(e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, "default": e }; if (null === e || "object" != typeof e && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (var _t in e) "default" !== _t && {}.hasOwnProperty.call(e, _t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, _t)) && (i.get || i.set) ? o(f, _t, i) : f[_t] = e[_t]); return f; })(e, t); }
var RANGE_MIN = 0;
var RANGE_MAX = 100;
function Thin(_ref) {
  var _ref$initialRange = _ref.initialRange,
    initialRange = _ref$initialRange === void 0 ? [0, 100] : _ref$initialRange,
    label = _ref.label;
  var _useState = (0, _react.useState)(initialRange),
    range = _useState[0],
    setRange = _useState[1];
  return /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
    gap: "small",
    pad: "xlarge"
  }, label ? /*#__PURE__*/_react["default"].createElement(_grommet.Text, null, label) : null, /*#__PURE__*/_react["default"].createElement(_grommet.Stack, null, /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
    background: "light-4",
    height: "6px",
    direction: "row"
  }), /*#__PURE__*/_react["default"].createElement(_grommet.RangeSelector, {
    direction: "horizontal",
    min: RANGE_MIN,
    max: RANGE_MAX,
    step: 1,
    values: range,
    onChange: function onChange(nextRange) {
      setRange(nextRange);
    }
  })), /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
    align: "center"
  }, /*#__PURE__*/_react["default"].createElement(_grommet.Text, {
    size: "small"
  }, range[0] + "% - " + range[1] + "%")));
}
var ThinStory = exports.ThinStory = function ThinStory() {
  return (
    /*#__PURE__*/
    // Uncomment <Grommet> lines when using outside of storybook
    // <Grommet theme={...}>
    _react["default"].createElement(_grommet.Box, {
      pad: "small"
    }, /*#__PURE__*/_react["default"].createElement(Thin, {
      label: "My Range Selector"
    }))
    // </Grommet>
  );
};
ThinStory.storyName = 'Thin';
var _default = exports["default"] = {
  title: 'Input/RangeSelector/Thin'
};