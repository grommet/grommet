"use strict";

exports.__esModule = true;
exports["default"] = exports.FieldWithComponentProp = void 0;
var _react = _interopRequireDefault(require("react"));
var _grommet = require("grommet");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var FieldWithComponentProp = exports.FieldWithComponentProp = function FieldWithComponentProp() {
  return (
    /*#__PURE__*/
    // Uncomment <Grommet> lines when using outside of storybook
    // <Grommet theme={...}>
    _react["default"].createElement(_grommet.Box, {
      overflow: "auto",
      align: "center",
      justify: "center",
      pad: "large"
    }, /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
      flex: false,
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
      htmlFor: "name",
      id: "name",
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
      htmlFor: "email",
      id: "email",
      name: "email",
      type: "email",
      required: true
    }), /*#__PURE__*/_react["default"].createElement(_grommet.FormField, {
      label: "Employee ID",
      htmlFor: "employeeId",
      id: "employeeId",
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
      htmlFor: "size",
      id: "size",
      "aria-label": "size",
      name: "size",
      component: _grommet.Select,
      onChange: function onChange(event) {
        return console.log(event);
      },
      options: ['small', 'medium', 'large', 'xlarge']
    }), /*#__PURE__*/_react["default"].createElement(_grommet.FormField, {
      label: "Comments",
      htmlFor: "comments",
      id: "comments",
      name: "comments",
      component: _grommet.TextArea
    }), /*#__PURE__*/_react["default"].createElement(_grommet.FormField, {
      label: "Age",
      htmlFor: "age",
      id: "age",
      name: "age",
      component: _grommet.RangeInput,
      pad: true,
      min: 15,
      max: 75
    }), /*#__PURE__*/_react["default"].createElement(_grommet.FormField, {
      label: "File",
      htmlFor: "file",
      id: "file",
      name: "file",
      component: _grommet.FileInput
    }), /*#__PURE__*/_react["default"].createElement(_grommet.FormField, {
      label: "Custom",
      htmlFor: "custom",
      id: "custom",
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
    })))))
    // </Grommet>
  );
};

FieldWithComponentProp.storyName = 'Field with component prop';
FieldWithComponentProp.args = {
  full: true
};
var _default = exports["default"] = {
  title: 'Input/Form/Field with component prop'
};