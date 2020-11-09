"use strict";

exports.__esModule = true;
exports.Password = void 0;

var _react = _interopRequireDefault(require("react"));

var _grommetIcons = require("grommet-icons");

var _grommet = require("grommet");

var _themes = require("grommet/themes");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var Password = function Password() {
  var _React$useState = _react["default"].useState(''),
      value = _React$useState[0],
      setValue = _React$useState[1];

  var _React$useState2 = _react["default"].useState(false),
      reveal = _React$useState2[0],
      setReveal = _React$useState2[1];

  return /*#__PURE__*/_react["default"].createElement(_grommet.Grommet, {
    full: true,
    theme: _themes.grommet
  }, /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
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
  })));
};

exports.Password = Password;