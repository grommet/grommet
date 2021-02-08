"use strict";

exports.__esModule = true;
exports["default"] = exports.RequiredLabel = void 0;

var _react = _interopRequireDefault(require("react"));

var _grommet = require("grommet");

var _themes = require("grommet/themes");

var _utils = require("grommet/utils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var customTheme = (0, _utils.deepMerge)(_themes.grommet, {
  formField: {
    label: {
      requiredIndicator: true
    }
  }
});

var RequiredLabel = function RequiredLabel() {
  return /*#__PURE__*/_react["default"].createElement(_grommet.Grommet, {
    theme: customTheme
  }, /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
    align: "center",
    pad: "large"
  }, /*#__PURE__*/_react["default"].createElement(_grommet.Form, null, /*#__PURE__*/_react["default"].createElement(_grommet.FormField, {
    name: "firstName",
    htmlFor: "firstName",
    label: "First Name",
    required: true
  }, /*#__PURE__*/_react["default"].createElement(_grommet.TextInput, {
    id: "firstName",
    name: "firstName"
  })), /*#__PURE__*/_react["default"].createElement(_grommet.FormField, {
    name: "lastName",
    htmlFor: "lastName",
    label: "Last Name",
    required: true
  }, /*#__PURE__*/_react["default"].createElement(_grommet.TextInput, {
    id: "lastName",
    name: "lastName"
  })), /*#__PURE__*/_react["default"].createElement(_grommet.FormField, {
    name: "email",
    htmlFor: "email",
    label: "Email",
    required: true
  }, /*#__PURE__*/_react["default"].createElement(_grommet.TextInput, {
    id: "email",
    name: "email",
    type: "email"
  })), /*#__PURE__*/_react["default"].createElement(_grommet.Button, {
    type: "submit",
    label: "Submit",
    primary: true
  }), /*#__PURE__*/_react["default"].createElement(_grommet.Text, {
    margin: {
      left: 'small'
    },
    size: "small",
    color: "status-critical"
  }, "* Required Field"))));
};

exports.RequiredLabel = RequiredLabel;
RequiredLabel.storyName = 'Required label';
var _default = {
  title: 'Input/Form/Required label'
};
exports["default"] = _default;