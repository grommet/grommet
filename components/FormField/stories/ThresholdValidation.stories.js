"use strict";

exports.__esModule = true;
exports["default"] = exports.ThresholdValidation = void 0;
var _react = _interopRequireDefault(require("react"));
var _grommet = require("grommet");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
var ThresholdValidation = exports.ThresholdValidation = function ThresholdValidation() {
  return (
    /*#__PURE__*/
    // Uncomment <Grommet> lines when using outside of storybook
    // <Grommet theme={...}>
    _react["default"].createElement(_grommet.Box, {
      align: "center",
      pad: "large"
    }, /*#__PURE__*/_react["default"].createElement(_grommet.Form, {
      validate: "change"
    }, /*#__PURE__*/_react["default"].createElement(_grommet.FormField, {
      label: "Label",
      validate: {
        max: 10,
        threshold: 0.25
      },
      name: "issue-description",
      htmlFor: "issue-description"
    }, /*#__PURE__*/_react["default"].createElement(_grommet.TextInput
    // eslint-disable-next-line max-len
    , {
      "aria-label": "text input with limit of 10 characters and threshold of 0.25",
      id: "issue-description",
      name: "issue-description",
      placeholder: "placeholder"
    })), /*#__PURE__*/_react["default"].createElement(_grommet.FormField, {
      label: "Label with default threshold",
      validate: {
        max: 10
      },
      name: "issue-description-with-default-threshold",
      htmlFor: "issue-description-with-default-threshold"
    }, /*#__PURE__*/_react["default"].createElement(_grommet.TextInput, {
      "aria-label": "text input with limit of 10 characters",
      id: "issue-description-with-default-threshold",
      name: "issue-description-with-default-threshold",
      placeholder: "placeholder"
    }))))
  );
};
ThresholdValidation.parameters = {
  chromatic: {
    disable: true
  }
};
var _default = exports["default"] = {
  title: 'Input/FormField/ThresholdValidation'
};