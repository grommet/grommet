"use strict";

exports.__esModule = true;
exports["default"] = exports.Children = void 0;
var _react = _interopRequireDefault(require("react"));
var _grommet = require("grommet");
var _grommetIcons = require("grommet-icons");
var _styledComponents = _interopRequireDefault(require("styled-components"));
var _utils = require("grommet/utils");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
var StyledRadioChild = (0, _styledComponents["default"])(_grommet.Box).withConfig({
  displayName: "Childrenstories__StyledRadioChild",
  componentId: "sc-z14q6m-0"
})(["", ""], function (props) {
  return props.focus && props.keyboard && (0, _utils.focusStyle)();
});
var Children = exports.Children = function Children() {
  var _React$useState = _react["default"].useState(),
    selected = _React$useState[0],
    setSelected = _React$useState[1];
  var usingKeyboard = (0, _utils.useKeyboard)();
  return /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
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
    var checked = _ref.checked,
      focus = _ref.focus;
    return /*#__PURE__*/_react["default"].createElement(StyledRadioChild, {
      focus: focus,
      keyboard: usingKeyboard
    }, /*#__PURE__*/_react["default"].createElement(_grommetIcons.Ascend, {
      color: checked ? 'brand' : 'status-unknown'
    }));
  }), /*#__PURE__*/_react["default"].createElement(_grommet.Button, {
    label: "clear",
    onClick: function onClick() {
      return setSelected(undefined);
    }
  }));
};
var _default = exports["default"] = {
  title: 'Input/RadioButton/Children'
};