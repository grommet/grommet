"use strict";

exports.__esModule = true;
exports["default"] = exports.Children = void 0;
var _react = _interopRequireDefault(require("react"));
var _grommet = require("grommet");
var _grommetIcons = require("grommet-icons");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var Children = exports.Children = function Children() {
  var _React$useState = _react["default"].useState(false),
    checkedState = _React$useState[0],
    setChecked = _React$useState[1];
  return /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
    align: "center",
    pad: "large",
    gap: "large"
  }, /*#__PURE__*/_react["default"].createElement(_grommet.CheckBox, {
    name: "name",
    value: "option 1",
    checked: checkedState,
    onChange: function onChange(event) {
      return setChecked(event.target.checked);
    }
  }, function (_ref) {
    var checked = _ref.checked;
    return /*#__PURE__*/_react["default"].createElement(_grommetIcons.Ascend, {
      color: checked ? 'brand' : 'status-unknown'
    });
  }));
};
var _default = exports["default"] = {
  title: 'Input/CheckBox/Children'
};