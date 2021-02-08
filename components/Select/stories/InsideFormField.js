"use strict";

exports.__esModule = true;
exports["default"] = exports.InsideFormField = void 0;

var _react = _interopRequireWildcard(require("react"));

var _grommet = require("grommet");

var _themes = require("grommet/themes");

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

var options = [{
  label: 'option 1',
  value: 1
}, {
  label: 'option 2',
  value: 2
}, {
  label: 'option 3',
  value: 3
}];

var InsideFormField = function InsideFormField() {
  var _useState = (0, _react.useState)({}),
      value = _useState[0],
      setValue = _useState[1];

  var onChange = (0, _react.useCallback)(function (nextValue) {
    return setValue(nextValue);
  }, []);
  return /*#__PURE__*/_react["default"].createElement(_grommet.Grommet, {
    theme: _themes.grommet
  }, /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
    align: "center",
    pad: "large"
  }, /*#__PURE__*/_react["default"].createElement(_grommet.Form, {
    value: value,
    onChange: onChange,
    onSubmit: function onSubmit() {
      return console.log('Submit', value);
    }
  }, /*#__PURE__*/_react["default"].createElement(_grommet.FormField, {
    label: "Label",
    name: "select"
  }, /*#__PURE__*/_react["default"].createElement(_grommet.Select, {
    name: "select",
    placeholder: "placeholder",
    options: options,
    labelKey: "label",
    valueKey: "value"
  })), /*#__PURE__*/_react["default"].createElement(_grommet.Button, {
    type: "submit",
    label: "Update",
    primary: true
  }))));
};

exports.InsideFormField = InsideFormField;
InsideFormField.storyName = 'Inside a FormField';
var _default = {
  title: 'Input/Select/Inside a FormField'
};
exports["default"] = _default;