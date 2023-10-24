"use strict";

exports.__esModule = true;
exports["default"] = exports.ThinStory = void 0;
var _react = _interopRequireWildcard(require("react"));
var _grommet = require("grommet");
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { "default": e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && Object.prototype.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n["default"] = e, t && t.set(e, n), n; }
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