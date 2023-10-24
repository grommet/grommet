"use strict";

exports.__esModule = true;
exports["default"] = exports.TrackColor = void 0;
var _react = _interopRequireDefault(require("react"));
var _grommet = require("grommet");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var rangeInputTheme = {
  rangeInput: {
    pad: '12px',
    track: {
      height: '12px',
      extend: function extend() {
        return "border-radius: 10px";
      }
    }
  }
};
var TrackColor = exports.TrackColor = function TrackColor() {
  var _React$useState = _react["default"].useState(0.4),
    value1 = _React$useState[0],
    setValue1 = _React$useState[1];
  var onChange1 = function onChange1(event) {
    return setValue1(event.target.value);
  };
  var _React$useState2 = _react["default"].useState(8),
    value2 = _React$useState2[0],
    setValue2 = _React$useState2[1];
  var onChange2 = function onChange2(event) {
    return setValue2(event.target.value);
  };
  return /*#__PURE__*/_react["default"].createElement(_grommet.Grommet, {
    theme: rangeInputTheme
  }, /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
    align: "center",
    pad: "large",
    gap: "large",
    width: "large"
  }, /*#__PURE__*/_react["default"].createElement(_grommet.RangeInput, {
    a11yTitle: "Select range value",
    min: 0,
    max: 1,
    step: 0.1,
    value: value1,
    color: "skyblue",
    onChange: onChange1
  }), /*#__PURE__*/_react["default"].createElement(_grommet.RangeInput, {
    a11yTitle: "Select range value",
    min: 0,
    max: 10,
    step: 1,
    value: value2,
    onChange: onChange2,
    color: [{
      value: 3,
      color: '#FF0000',
      opacity: 0.5
    }, {
      value: 7,
      color: {
        light: 'accent-3',
        dark: 'brand'
      }
    }, {
      value: 10,
      color: '#00FF00'
    }]
  })));
};
TrackColor.storyName = 'Track Color';
var _default = exports["default"] = {
  title: 'Input/RangeInput/Custom Themed/Track Color'
};