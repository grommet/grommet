"use strict";

var _react = _interopRequireDefault(require("react"));

var _react2 = require("@storybook/react");

var _utils = require("grommet/utils");

var _grommet = require("grommet");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var customFormFieldTheme = {
  global: {
    font: {
      size: '13px'
    },
    input: {
      weight: 400
    }
  },
  formField: {
    label: {
      color: 'dark-3',
      size: 'xsmall',
      margin: {
        vertical: '0',
        bottom: 'small',
        horizontal: '0'
      },
      weight: 600
    },
    border: false,
    margin: 0
  }
};

var CustomFormField = function CustomFormField() {
  return _react["default"].createElement(_grommet.Grommet, {
    theme: (0, _utils.deepMerge)(_grommet.grommet, customFormFieldTheme)
  }, _react["default"].createElement(_grommet.Box, {
    align: "center",
    pad: "large"
  }, _react["default"].createElement(_grommet.FormField, {
    label: "Label",
    htmlFor: "text-area"
  }, _react["default"].createElement(_grommet.TextArea, {
    id: "text-area",
    placeholder: "placeholder"
  }))));
};

(0, _react2.storiesOf)('Form', module).add('Custom Theme', function () {
  return _react["default"].createElement(CustomFormField, null);
});