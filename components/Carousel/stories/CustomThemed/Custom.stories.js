"use strict";

exports.__esModule = true;
exports["default"] = exports.CustomCarousel = void 0;
var _react = _interopRequireDefault(require("react"));
var _grommetIcons = require("grommet-icons");
var _grommet = require("grommet");
var _excluded = ["controls"];
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function _objectWithoutPropertiesLoose(r, e) { if (null == r) return {}; var t = {}; for (var n in r) if ({}.hasOwnProperty.call(r, n)) { if (-1 !== e.indexOf(n)) continue; t[n] = r[n]; } return t; }
var customTheme = {
  carousel: {
    animation: {
      duration: 400
    },
    icons: {
      color: 'blue'
    },
    disabled: {
      icons: {
        color: 'grey'
      }
    }
  }
};
var CustomCarousel = exports.CustomCarousel = function CustomCarousel(_ref) {
  var controls = _ref.controls,
    rest = _objectWithoutPropertiesLoose(_ref, _excluded);
  return /*#__PURE__*/_react["default"].createElement(_grommet.Grommet, {
    theme: customTheme
  }, /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
    align: "center",
    pad: "large"
  }, /*#__PURE__*/_react["default"].createElement(_grommet.Carousel, _extends({
    controls: controls
  }, rest), /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
    pad: "xlarge",
    background: "accent-1"
  }, /*#__PURE__*/_react["default"].createElement(_grommetIcons.Attraction, {
    size: "xlarge"
  })), /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
    pad: "xlarge",
    background: "accent-2"
  }, /*#__PURE__*/_react["default"].createElement(_grommetIcons.TreeOption, {
    size: "xlarge"
  })), /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
    pad: "xlarge",
    background: "accent-3"
  }, /*#__PURE__*/_react["default"].createElement(_grommetIcons.Car, {
    size: "xlarge"
  })))));
};
CustomCarousel.storyName = 'Custom controls';
var _default = exports["default"] = {
  title: 'Media/Carousel/Custom Themed/Custom controls'
};