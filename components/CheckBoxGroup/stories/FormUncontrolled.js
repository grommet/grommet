"use strict";

exports.__esModule = true;
exports["default"] = exports.FormUncontrolled = void 0;

var _react = _interopRequireDefault(require("react"));

var _grommet = require("grommet");

var _themes = require("grommet/themes");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var FormUncontrolled = function FormUncontrolled() {
  return /*#__PURE__*/_react["default"].createElement(_grommet.Grommet, {
    theme: _themes.grommet
  }, /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
    pad: "medium"
  }, /*#__PURE__*/_react["default"].createElement(_grommet.Heading, {
    level: "3"
  }, "Form with string options"), /*#__PURE__*/_react["default"].createElement(_grommet.Form, {
    onSubmit: function onSubmit(_ref) {
      var value = _ref.value,
          touched = _ref.touched;
      return console.log('Submit', value, touched);
    }
  }, /*#__PURE__*/_react["default"].createElement(_grommet.FormField, {
    name: "am-pm",
    component: _grommet.CheckBoxGroup,
    options: ['morning', 'evening']
  }), /*#__PURE__*/_react["default"].createElement(_grommet.Button, {
    type: "submit",
    label: "Submit"
  }))), /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
    pad: "medium"
  }, /*#__PURE__*/_react["default"].createElement(_grommet.Heading, {
    level: "3"
  }, "Form with object options"), /*#__PURE__*/_react["default"].createElement(_grommet.Form, {
    onSubmit: function onSubmit(_ref2) {
      var value = _ref2.value,
          touched = _ref2.touched;
      return console.log('Submit object options', value, touched);
    }
  }, /*#__PURE__*/_react["default"].createElement(_grommet.FormField, {
    name: "drink",
    label: "Drink",
    id: "drink-formfield-id"
  }, /*#__PURE__*/_react["default"].createElement(_grommet.CheckBoxGroup, {
    name: "drink",
    valueKey: "id",
    "aria-labelledby": "drink-formfield-id",
    options: [{
      label: 'Coffee',
      id: '1'
    }, {
      label: 'Tea',
      id: '2'
    }, {
      label: 'Milk',
      id: '3'
    }]
  })), /*#__PURE__*/_react["default"].createElement(_grommet.Button, {
    type: "submit",
    label: "Submit"
  }))));
};

exports.FormUncontrolled = FormUncontrolled;
FormUncontrolled.storyName = 'Form uncontrolled';
var _default = {
  title: 'Input/CheckBoxGroup/Form uncontrolled'
};
exports["default"] = _default;