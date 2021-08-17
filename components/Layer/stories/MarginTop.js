"use strict";

exports.__esModule = true;
exports["default"] = exports.MarginTopCenter = void 0;

var _react = _interopRequireDefault(require("react"));

var _grommet = require("grommet");

var _themes = require("grommet/themes");

var _excluded = ["margin"];

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

var MarginLayer = function MarginLayer(_ref) {
  var margin = _ref.margin,
      rest = _objectWithoutPropertiesLoose(_ref, _excluded);

  return /*#__PURE__*/_react["default"].createElement(_grommet.Grommet, {
    options: {
      layer: {
        singleId: true
      }
    },
    theme: _themes.grommet
  }, /*#__PURE__*/_react["default"].createElement(_grommet.Layer, _extends({
    id: "Margin top center",
    margin: margin || {
      left: '40px',
      top: '50px',
      right: '30px',
      bottom: '10px'
    }
  }, rest), /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
    height: "small",
    overflow: "auto"
  }, /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
    pad: "xlarge"
  }, "text"), /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
    pad: "xlarge"
  }, "text"), /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
    pad: "xlarge"
  }, "text"), /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
    pad: "xlarge"
  }, "text"), /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
    pad: "xlarge"
  }, "text"), /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
    pad: "xlarge"
  }, "text"))));
};

var MarginTopCenter = function MarginTopCenter() {
  return /*#__PURE__*/_react["default"].createElement(MarginLayer, {
    margin: {
      top: 'large'
    },
    position: "top"
  });
};

exports.MarginTopCenter = MarginTopCenter;
MarginTopCenter.storyName = 'Margin top (center)';
var _default = {
  title: 'Layout/Layer/Margin top (center)'
};
exports["default"] = _default;