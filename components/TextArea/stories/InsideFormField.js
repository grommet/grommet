"use strict";

exports.__esModule = true;
exports["default"] = exports.InsideFormField = void 0;

var _react = _interopRequireWildcard(require("react"));

var _grommet = require("grommet");

var _themes = require("grommet/themes");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

var InsideFormField = function InsideFormField() {
  var _useState = (0, _react.useState)({
    name: '',
    email: '',
    value: ''
  }),
      value = _useState[0],
      setValue = _useState[1];

  return /*#__PURE__*/_react["default"].createElement(_grommet.Grommet, {
    theme: _themes.grommet
  }, /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
    align: "center",
    pad: "large"
  }, /*#__PURE__*/_react["default"].createElement(_grommet.Text, {
    weight: "bold"
  }, "TextArea as component prop of FormField"), /*#__PURE__*/_react["default"].createElement(_grommet.Form, null, /*#__PURE__*/_react["default"].createElement(_grommet.FormField, {
    label: "FormField label",
    htmlFor: "text-area",
    component: _grommet.TextArea,
    placeholder: "placeholder from FormField"
  }), /*#__PURE__*/_react["default"].createElement(_grommet.Button, {
    type: "submit",
    label: "submit"
  }))), /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
    align: "center",
    pad: "large"
  }, /*#__PURE__*/_react["default"].createElement(_grommet.Text, {
    weight: "bold"
  }, "TextArea inside FormField"), /*#__PURE__*/_react["default"].createElement(_grommet.Form, {
    value: value,
    onChange: function onChange(nextValue) {
      return setValue(nextValue);
    },
    onSubmit: function onSubmit() {
      return console.log(value);
    }
  }, /*#__PURE__*/_react["default"].createElement(_grommet.FormField, {
    name: "value",
    label: "FormField label",
    required: true
  }, /*#__PURE__*/_react["default"].createElement(_grommet.TextArea, {
    name: "value",
    placeholder: "placeholder from TextArea"
  })), /*#__PURE__*/_react["default"].createElement(_grommet.Button, {
    type: "submit",
    label: "submit"
  }))));
};

exports.InsideFormField = InsideFormField;
InsideFormField.storyName = 'Inside a FormField';
var _default = {
  title: 'Input/TextArea/Inside a FormField'
};
exports["default"] = _default;