"use strict";

var _react = _interopRequireDefault(require("react"));

var _react2 = require("@storybook/react");

var _grommet = require("grommet");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var FormFieldCheckBox = function FormFieldCheckBox() {
  return _react["default"].createElement(_grommet.Grommet, {
    theme: _grommet.grommet
  }, _react["default"].createElement(_grommet.Box, {
    align: "center",
    pad: "large"
  }, _react["default"].createElement(_grommet.Form, null, _react["default"].createElement(_grommet.FormField, {
    label: "Label",
    name: "checkbox",
    htmlFor: "check-box",
    required: true
  }, _react["default"].createElement(_grommet.Box, {
    pad: {
      horizontal: 'small',
      vertical: 'xsmall'
    }
  }, _react["default"].createElement(_grommet.CheckBox, {
    id: "check-box",
    name: "checkbox",
    label: "CheckBox"
  }))), _react["default"].createElement(_grommet.Button, {
    type: "submit",
    label: "Submit"
  }))));
};

(0, _react2.storiesOf)('Form', module).add('CheckBox', function () {
  return _react["default"].createElement(FormFieldCheckBox, null);
});