"use strict";

exports.__esModule = true;
exports["default"] = exports.FormControlled = void 0;

var _react = _interopRequireWildcard(require("react"));

var _grommet = require("grommet");

var _themes = require("grommet/themes");

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

var FormControlled = function FormControlled() {
  var _useState = (0, _react.useState)(),
      value = _useState[0],
      setValue = _useState[1];

  return /*#__PURE__*/_react["default"].createElement(_grommet.Grommet, {
    theme: _themes.grommet
  }, /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
    pad: "medium",
    width: "medium"
  }, /*#__PURE__*/_react["default"].createElement(_grommet.Form, {
    onSubmit: function onSubmit(_ref) {
      var values = _ref.value,
          touched = _ref.touched;
      return (// 'touched' is a single boolean value indication of
        // whether any of the checkboxes had changed.
        console.log('Submit', values, touched)
      );
    }
  }, /*#__PURE__*/_react["default"].createElement(_grommet.FormField, {
    name: "controlled"
  }, /*#__PURE__*/_react["default"].createElement(_grommet.CheckBoxGroup, {
    id: "check-box-group-id",
    name: "controlled",
    value: value,
    onChange: function onChange(_ref2) {
      var nextValue = _ref2.value;
      return setValue(nextValue);
    },
    options: ['Maui', 'Jerusalem', 'Wuhan']
  })), /*#__PURE__*/_react["default"].createElement(_grommet.Button, {
    type: "submit",
    label: "Submit"
  }))));
};

exports.FormControlled = FormControlled;
FormControlled.storyName = 'Form controlled';
var _default = {
  title: 'Input/CheckBoxGroup/Form controlled'
};
exports["default"] = _default;