"use strict";

exports.__esModule = true;
exports["default"] = exports.Children = void 0;

var _react = _interopRequireDefault(require("react"));

var _grommet = require("grommet");

var _grommetIcons = require("grommet-icons");

var _themes = require("grommet/themes");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var Children = function Children() {
  var _React$useState = _react["default"].useState(),
      selected = _React$useState[0],
      setSelected = _React$useState[1];

  return /*#__PURE__*/_react["default"].createElement(_grommet.Grommet, {
    theme: _themes.grommet
  }, /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
    align: "center",
    pad: "large",
    gap: "large"
  }, /*#__PURE__*/_react["default"].createElement(_grommet.RadioButton, {
    name: "name",
    value: "option 1",
    checked: selected === 'option 1',
    onChange: function onChange(event) {
      return setSelected(event.target.value);
    }
  }, function (_ref) {
    var checked = _ref.checked;
    return /*#__PURE__*/_react["default"].createElement(_grommetIcons.Ascend, {
      color: checked ? 'brand' : 'status-unknown'
    });
  }), /*#__PURE__*/_react["default"].createElement(_grommet.Button, {
    label: "clear",
    onClick: function onClick() {
      return setSelected(undefined);
    }
  })));
};

exports.Children = Children;
var _default = {
  title: 'Input/RadioButton/Children'
};
exports["default"] = _default;