"use strict";

var _react = _interopRequireWildcard(require("react"));

var _react2 = require("@storybook/react");

var _grommet = require("grommet");

var _themes = require("grommet/themes");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj["default"] = obj; return newObj; } }

var CheckBoxInsideButton = function CheckBoxInsideButton() {
  var _useState = (0, _react.useState)(false),
      checked = _useState[0],
      setChecked = _useState[1];

  var onButtonClick = function onButtonClick() {
    return setChecked(!checked);
  };

  var onCheckboxChange = function onCheckboxChange() {};

  return _react["default"].createElement(_grommet.Grommet, {
    theme: _themes.grommet
  }, _react["default"].createElement(_grommet.Box, {
    align: "center",
    pad: "large"
  }, _react["default"].createElement(_grommet.Button, {
    hoverIndicator: "background",
    onClick: onButtonClick
  }, _react["default"].createElement(_grommet.CheckBox, {
    tabIndex: "-1",
    checked: checked,
    label: _react["default"].createElement(_grommet.Text, null, "Hi"),
    onChange: onCheckboxChange
  }))));
};

(0, _react2.storiesOf)('CheckBox', module).add('Inside a Button', function () {
  return _react["default"].createElement(CheckBoxInsideButton, null);
});