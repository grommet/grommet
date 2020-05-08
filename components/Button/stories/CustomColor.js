"use strict";

var _react = _interopRequireDefault(require("react"));

var _react2 = require("@storybook/react");

var _grommet = require("grommet");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

var customButtonColor = {
  global: {
    font: {
      family: 'Arial'
    }
  },
  button: {
    color: {
      light: 'white',
      dark: 'white'
    }
  }
};

var Colored = function Colored(props) {
  return /*#__PURE__*/_react["default"].createElement(_grommet.Grommet, {
    theme: customButtonColor
  }, /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
    align: "center",
    pad: "large",
    gap: "small"
  }, /*#__PURE__*/_react["default"].createElement(_grommet.Button, {
    primary: true,
    label: "Submit",
    onClick: function onClick() {}
  }), /*#__PURE__*/_react["default"].createElement(_grommet.Button, {
    primary: true,
    color: "dark-1",
    label: "custom theme text colored",
    onClick: function onClick() {}
  }), /*#__PURE__*/_react["default"].createElement(_grommet.Button, _extends({
    primary: true,
    color: "dark-1",
    label: "dark-1",
    onClick: function onClick() {}
  }, props)), /*#__PURE__*/_react["default"].createElement(_grommet.Button, _extends({
    primary: true,
    color: "#111111",
    label: "#111111",
    onClick: function onClick() {}
  }, props)), /*#__PURE__*/_react["default"].createElement(_grommet.Button, _extends({
    primary: true,
    color: "#777",
    label: "#777",
    onClick: function onClick() {}
  }, props)), /*#__PURE__*/_react["default"].createElement(_grommet.Button, _extends({
    plain: true,
    color: "red",
    label: "plain red",
    onClick: function onClick() {}
  }, props)), /*#__PURE__*/_react["default"].createElement(_grommet.Button, _extends({
    plain: true,
    label: "plain inherit",
    onClick: function onClick() {}
  }, props))));
};

(0, _react2.storiesOf)('Button', module).add('Colored', function () {
  return /*#__PURE__*/_react["default"].createElement(Colored, null);
});