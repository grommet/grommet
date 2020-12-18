"use strict";

exports.__esModule = true;
exports.ThinStory = void 0;

var _react = _interopRequireWildcard(require("react"));

var _reactDom = require("react-dom");

var _grommet = require("grommet");

var _themes = require("grommet/themes");

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

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

function App() {
  return /*#__PURE__*/_react["default"].createElement(_grommet.Grommet, {
    theme: _themes.grommet
  }, /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
    pad: "small"
  }, /*#__PURE__*/_react["default"].createElement(Thin, {
    label: "My Range Selector"
  })));
}

(0, _reactDom.render)( /*#__PURE__*/_react["default"].createElement(App, null), document.getElementById('root'));

var ThinStory = function ThinStory() {
  return /*#__PURE__*/_react["default"].createElement(App, null);
};

exports.ThinStory = ThinStory;
ThinStory.story = {
  name: 'Thin'
};