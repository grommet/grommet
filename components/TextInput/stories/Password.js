"use strict";

var _react = _interopRequireDefault(require("react"));

var _react2 = require("@storybook/react");

var _grommetIcons = require("grommet-icons");

var _grommet = require("grommet");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var PasswordInput = function PasswordInput() {
  var _React$useState = _react["default"].useState(''),
      value = _React$useState[0],
      setValue = _React$useState[1];

  var _React$useState2 = _react["default"].useState(false),
      reveal = _React$useState2[0],
      setReveal = _React$useState2[1];

  return /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
    width: "medium",
    direction: "row",
    margin: "large",
    align: "center",
    round: "small",
    border: true
  }, /*#__PURE__*/_react["default"].createElement(_grommet.TextInput, {
    plain: true,
    type: reveal ? 'text' : 'password',
    value: value,
    onChange: function onChange(event) {
      return setValue(event.target.value);
    }
  }), /*#__PURE__*/_react["default"].createElement(_grommet.Button, {
    icon: reveal ? /*#__PURE__*/_react["default"].createElement(_grommetIcons.View, {
      size: "medium"
    }) : /*#__PURE__*/_react["default"].createElement(_grommetIcons.Hide, {
      size: "medium"
    }),
    onClick: function onClick() {
      return setReveal(!reveal);
    }
  }));
};

(0, _react2.storiesOf)('TextInput', module).add('Password', function () {
  return /*#__PURE__*/_react["default"].createElement(PasswordInput, null);
});