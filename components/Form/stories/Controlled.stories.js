"use strict";

exports.__esModule = true;
exports["default"] = exports.Controlled = void 0;
var _react = _interopRequireWildcard(require("react"));
var _grommet = require("grommet");
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function _interopRequireWildcard(e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, "default": e }; if (null === e || "object" != typeof e && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (var _t in e) "default" !== _t && {}.hasOwnProperty.call(e, _t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, _t)) && (i.get || i.set) ? o(f, _t, i) : f[_t] = e[_t]); return f; })(e, t); }
var defaultValue = {
  name: '',
  email: '',
  subscribe: false,
  ampm: '',
  size: '',
  comments: '',
  age: ''
};
var suggestions = ['Shimi', 'Eric'];
var Controlled = exports.Controlled = function Controlled() {
  var _useState = (0, _react.useState)(defaultValue),
    value = _useState[0],
    setValue = _useState[1];
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
      value: value,
      onChange: function onChange(nextValue, _ref) {
        var touched = _ref.touched;
        console.log('Change', nextValue, touched);
        setValue(nextValue);
      },
      onReset: function onReset() {
        return setValue(defaultValue);
      },
      onSubmit: function onSubmit(event) {
        return console.log('Submit', event.value, event.touched);
      }
    }, /*#__PURE__*/_react["default"].createElement(_grommet.FormField, {
      label: "Name",
      htmlFor: "name",
      name: "name"
    }, /*#__PURE__*/_react["default"].createElement(_grommet.TextInput, {
      id: "name",
      name: "name",
      suggestions: suggestions
    })), /*#__PURE__*/_react["default"].createElement(_grommet.FormField, {
      label: "Email",
      htmlFor: "email",
      name: "email",
      required: true
    }, /*#__PURE__*/_react["default"].createElement(_grommet.MaskedInput, {
      id: "email",
      name: "email",
      "aria-required": true,
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
      htmlFor: "subscribe",
      name: "subscribe"
    }, /*#__PURE__*/_react["default"].createElement(_grommet.CheckBox, {
      id: "subscribe",
      name: "subscribe",
      label: "Subscribe?"
    })), /*#__PURE__*/_react["default"].createElement(_grommet.FormField, {
      label: "Time of day",
      htmlFor: "ampm",
      name: "ampm"
    }, /*#__PURE__*/_react["default"].createElement(_grommet.RadioButtonGroup, {
      id: "ampm",
      name: "ampm",
      options: ['morning', 'evening']
    })), /*#__PURE__*/_react["default"].createElement(_grommet.FormField, {
      label: "Size",
      htmlFor: "size",
      name: "size"
    }, /*#__PURE__*/_react["default"].createElement(_grommet.Select, {
      id: "size",
      name: "size",
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
      "aria-valuemin": 15,
      "aria-valuemax": 75,
      "aria-valuenow": 30,
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
Controlled.args = {
  full: true
};
var _default = exports["default"] = {
  title: 'Input/Form/Controlled'
};