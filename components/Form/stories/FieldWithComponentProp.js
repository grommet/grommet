"use strict";

exports.__esModule = true;
exports.FieldWithComponentProp = void 0;

var _react = _interopRequireDefault(require("react"));

var _grommet = require("grommet");

var _themes = require("grommet/themes");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var FieldWithComponentProp = function FieldWithComponentProp() {
  return /*#__PURE__*/_react["default"].createElement(_grommet.Grommet, {
    full: true,
    theme: _themes.grommet
  }, /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
    fill: true,
    align: "center",
    justify: "center"
  }, /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
    width: "medium"
  }, /*#__PURE__*/_react["default"].createElement(_grommet.Form, {
    onReset: function onReset(event) {
      return console.log(event);
    },
    onSubmit: function onSubmit(_ref) {
      var value = _ref.value,
          touched = _ref.touched;
      return console.log('Submit', value, touched);
    }
  }, /*#__PURE__*/_react["default"].createElement(_grommet.FormField, {
    label: "Name",
    name: "name",
    required: true,
    validate: [{
      regexp: /^[a-z]/i
    }, function (name) {
      if (name && name.length === 1) return 'must be >1 character';
      return undefined;
    }, function (name) {
      if (name && name.length <= 2) return {
        message: "that's short",
        status: 'info'
      };
      return undefined;
    }]
  }), /*#__PURE__*/_react["default"].createElement(_grommet.FormField, {
    label: "Email",
    name: "email",
    type: "email",
    required: true
  }), /*#__PURE__*/_react["default"].createElement(_grommet.FormField, {
    label: "Employee ID",
    name: "employeeId",
    required: true,
    validate: {
      regexp: /^[0-9]{4,6}$/,
      message: '4-6 digits'
    }
  }), /*#__PURE__*/_react["default"].createElement(_grommet.FormField, {
    name: "subscribe",
    component: _grommet.CheckBox,
    label: "Subscribe?"
  }), /*#__PURE__*/_react["default"].createElement(_grommet.FormField, {
    name: "ampm",
    component: _grommet.RadioButtonGroup,
    options: ['morning', 'evening']
  }), /*#__PURE__*/_react["default"].createElement(_grommet.FormField, {
    label: "Size",
    name: "size",
    component: _grommet.Select,
    onChange: function onChange(event) {
      return console.log(event);
    },
    options: ['small', 'medium', 'large', 'xlarge']
  }), /*#__PURE__*/_react["default"].createElement(_grommet.FormField, {
    label: "Comments",
    name: "comments",
    component: _grommet.TextArea
  }), /*#__PURE__*/_react["default"].createElement(_grommet.FormField, {
    label: "Age",
    name: "age",
    component: _grommet.RangeInput,
    pad: true,
    min: 15,
    max: 75
  }), /*#__PURE__*/_react["default"].createElement(_grommet.FormField, {
    label: "Custom",
    name: "custom",
    component: function component(props) {
      return /*#__PURE__*/_react["default"].createElement("input", props);
    }
  }), /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
    direction: "row",
    justify: "between",
    margin: {
      top: 'medium'
    }
  }, /*#__PURE__*/_react["default"].createElement(_grommet.Button, {
    label: "Cancel"
  }), /*#__PURE__*/_react["default"].createElement(_grommet.Button, {
    type: "reset",
    label: "Reset"
  }), /*#__PURE__*/_react["default"].createElement(_grommet.Button, {
    type: "submit",
    label: "Update",
    primary: true
  }))))));
};

exports.FieldWithComponentProp = FieldWithComponentProp;
FieldWithComponentProp.story = {
  name: 'Field with component prop'
};