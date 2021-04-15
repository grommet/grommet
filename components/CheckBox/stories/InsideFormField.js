"use strict";

exports.__esModule = true;
exports["default"] = exports.InsideFormField = void 0;

var _react = _interopRequireDefault(require("react"));

var _grommet = require("grommet");

var _themes = require("grommet/themes");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

var InsideFormField = function InsideFormField(props) {
  return /*#__PURE__*/_react["default"].createElement(_grommet.Grommet, {
    theme: _themes.grommet
  }, /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
    align: "center",
    pad: "large"
  }, /*#__PURE__*/_react["default"].createElement(_grommet.Form, {
    onSubmit: function onSubmit(_ref) {
      var value = _ref.value,
          touched = _ref.touched;
      return console.log('Submit', value, touched);
    }
  }, /*#__PURE__*/_react["default"].createElement(_grommet.FormField, _extends({
    label: "Toggle",
    name: "toggle",
    htmlFor: "check-box-toggle"
  }, props), /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
    pad: {
      horizontal: 'small',
      vertical: 'xsmall'
    }
  }, /*#__PURE__*/_react["default"].createElement(_grommet.CheckBox, {
    id: "check-box-toggle",
    name: "toggle",
    label: "CheckBox",
    toggle: true
  }))), /*#__PURE__*/_react["default"].createElement(_grommet.FormField, _extends({
    label: "Toggle fill",
    name: "toggle",
    htmlFor: "check-box-toggle"
  }, props), /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
    pad: {
      horizontal: 'small',
      vertical: 'xsmall'
    }
  }, /*#__PURE__*/_react["default"].createElement(_grommet.CheckBox, {
    id: "check-box-fill-toggle",
    name: "toggle",
    label: "CheckBox",
    toggle: true,
    fill: true,
    reverse: true
  }))), /*#__PURE__*/_react["default"].createElement(_grommet.FormField, {
    label: "Default",
    name: "checkbox",
    htmlFor: "check-box",
    required: true
  }, /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
    pad: {
      horizontal: 'small',
      vertical: 'xsmall'
    }
  }, /*#__PURE__*/_react["default"].createElement(_grommet.CheckBox, {
    id: "check-box",
    name: "checkbox",
    label: "Required"
  }))), /*#__PURE__*/_react["default"].createElement(_grommet.FormField, {
    label: "Where would you like to visit",
    name: "checkboxgroup",
    htmlFor: "check-box-group",
    required: true
  }, /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
    pad: {
      horizontal: 'small',
      vertical: 'xsmall'
    }
  }, /*#__PURE__*/_react["default"].createElement(_grommet.CheckBoxGroup, {
    id: "check-box-group",
    name: "checkboxgroup",
    options: ['Maui', 'Jerusalem', 'Wuhan']
  }))), /*#__PURE__*/_react["default"].createElement(_grommet.Button, {
    type: "submit",
    label: "Submit"
  }))));
};

exports.InsideFormField = InsideFormField;
InsideFormField.storyName = 'Inside a FormField';
var _default = {
  title: 'Input/CheckBox/Inside a FormField'
};
exports["default"] = _default;