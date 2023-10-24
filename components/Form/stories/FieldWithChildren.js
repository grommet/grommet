"use strict";

exports.__esModule = true;
exports["default"] = exports.FieldWithChildren = void 0;
var _react = _interopRequireDefault(require("react"));
var _grommet = require("grommet");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var passwordRulesStrong = [{
  regexp: /(?=.*?[A-Z])/,
  message: 'One uppercase letter',
  status: 'error'
}, {
  regexp: /(?=.*?[a-z])/,
  message: 'One lowercase letter',
  status: 'error'
}, {
  regexp: /(?=.*?[#?!@$ %^&*-])/,
  message: 'One special character',
  status: 'error'
}, {
  regexp: /.{8,}/,
  message: 'At least 8 characters',
  status: 'error'
}];
var FieldWithChildren = exports.FieldWithChildren = function FieldWithChildren() {
  return (
    /*#__PURE__*/
    // Uncomment <Grommet> lines when using outside of storybook
    // <Grommet theme={...}>
    _react["default"].createElement(_grommet.Box, {
      align: "center",
      justify: "center",
      pad: "large"
    }, /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
      width: "medium"
    }, /*#__PURE__*/_react["default"].createElement(_grommet.Form, {
      onReset: function onReset(event) {
        return console.log(event);
      },
      onSubmit: function onSubmit(_ref) {
        var value = _ref.value;
        return console.log('Submit', value);
      },
      onValidate: function onValidate(_ref2) {
        var errors = _ref2.errors,
          infos = _ref2.infos;
        return console.log('Validate', errors, infos);
      }
    }, /*#__PURE__*/_react["default"].createElement(_grommet.FormField, {
      label: "Name",
      htmlFor: "name",
      name: "name",
      required: true
    }, /*#__PURE__*/_react["default"].createElement(_grommet.TextInput, {
      id: "name",
      name: "name"
    })), /*#__PURE__*/_react["default"].createElement(_grommet.FormField, {
      label: "Email",
      htmlFor: "email",
      name: "email",
      required: true
    }, /*#__PURE__*/_react["default"].createElement(_grommet.MaskedInput, {
      id: "email",
      name: "email",
      mask: [{
        regexp: /^[\w\-_.]+$/,
        placeholder: 'example'
      }, {
        fixed: '@'
      }, {
        regexp: /^[\w]+$/,
        placeholder: 'my'
      }, {
        fixed: '.'
      }, {
        regexp: /^[\w]+$/,
        placeholder: 'com'
      }]
    })), /*#__PURE__*/_react["default"].createElement(_grommet.FormField, {
      label: "Password",
      name: "password",
      htmlFor: "password",
      validate: passwordRulesStrong
    }, /*#__PURE__*/_react["default"].createElement(_grommet.TextInput, {
      name: "password",
      id: "password",
      type: "password"
    })), /*#__PURE__*/_react["default"].createElement(_grommet.FormField, {
      name: "subscription"
    }, /*#__PURE__*/_react["default"].createElement(_grommet.CheckBoxGroup, {
      name: "subscription",
      options: ['subscribe', 'receive email notifications']
    })), /*#__PURE__*/_react["default"].createElement(_grommet.FormField, {
      name: "ampm"
    }, /*#__PURE__*/_react["default"].createElement(_grommet.RadioButtonGroup, {
      name: "ampm",
      options: ['morning', 'evening']
    })), /*#__PURE__*/_react["default"].createElement(_grommet.FormField, {
      label: "Size",
      htmlFor: "size",
      name: "size"
    }, /*#__PURE__*/_react["default"].createElement(_grommet.Select, {
      id: "size",
      "aria-label": "size",
      name: "size",
      multiple: true,
      options: ['small', 'medium', 'large']
    })), /*#__PURE__*/_react["default"].createElement(_grommet.FormField, {
      label: "Comments",
      htmlFor: "comments",
      name: "comments"
    }, /*#__PURE__*/_react["default"].createElement(_grommet.TextArea, {
      id: "comments",
      name: "comments"
    })), /*#__PURE__*/_react["default"].createElement(_grommet.FormField, {
      label: "Age",
      htmlFor: "age",
      name: "age",
      pad: true
    }, /*#__PURE__*/_react["default"].createElement(_grommet.RangeInput, {
      id: "age",
      name: "age",
      min: 15,
      max: 75
    })), /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
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

FieldWithChildren.storyName = 'Field with children';
FieldWithChildren.args = {
  full: true
};
var _default = exports["default"] = {
  title: 'Input/Form/Field with children'
};