"use strict";

exports.__esModule = true;
exports["default"] = exports.ControlledInput = void 0;
var _react = _interopRequireWildcard(require("react"));
var _grommet = require("grommet");
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function _interopRequireWildcard(e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, "default": e }; if (null === e || "object" != typeof e && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (var _t in e) "default" !== _t && {}.hasOwnProperty.call(e, _t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, _t)) && (i.get || i.set) ? o(f, _t, i) : f[_t] = e[_t]); return f; })(e, t); }
var ControlledInput = exports.ControlledInput = function ControlledInput() {
  var _useState = (0, _react.useState)(''),
    name = _useState[0],
    setName = _useState[1];
  var _useState2 = (0, _react.useState)(''),
    email = _useState2[0],
    setEmail = _useState2[1];
  var _useState3 = (0, _react.useState)(false),
    subscribe = _useState3[0],
    setSubscribe = _useState3[1];
  var _useState4 = (0, _react.useState)(''),
    ampm = _useState4[0],
    setAmpm = _useState4[1];
  var _useState5 = (0, _react.useState)(''),
    size = _useState5[0],
    setSize = _useState5[1];
  var _useState6 = (0, _react.useState)(''),
    comments = _useState6[0],
    setComments = _useState6[1];
  var _useState7 = (0, _react.useState)(''),
    age = _useState7[0],
    setAge = _useState7[1];
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
      onChange: function onChange(value) {
        return console.log('Change', value);
      },
      onReset: function onReset() {
        setName('');
        setEmail('');
        setSubscribe(false);
        setAmpm('');
        setSize('');
        setComments('');
        setAge('');
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
      value: name,
      onChange: function onChange(event) {
        return setName(event.target.value);
      }
    })), /*#__PURE__*/_react["default"].createElement(_grommet.FormField, {
      label: "Email",
      htmlFor: "email",
      name: "email",
      required: true
    }, /*#__PURE__*/_react["default"].createElement(_grommet.MaskedInput, {
      "aria-required": true,
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
      }],
      value: email,
      onChange: function onChange(event) {
        return setEmail(event.target.value);
      }
    })), /*#__PURE__*/_react["default"].createElement(_grommet.FormField, {
      htmlFor: "subscribe",
      name: "subscribe"
    }, /*#__PURE__*/_react["default"].createElement(_grommet.CheckBox, {
      name: "subscribe",
      id: "subscribe",
      label: "Subscribe?",
      checked: subscribe,
      onChange: function onChange(event) {
        return setSubscribe(event.target.checked);
      }
    })), /*#__PURE__*/_react["default"].createElement(_grommet.FormField, {
      label: "Time of day",
      htmlFor: "ampm",
      name: "ampm"
    }, /*#__PURE__*/_react["default"].createElement(_grommet.RadioButtonGroup, {
      name: "ampm",
      id: "ampm",
      options: ['morning', 'evening'],
      value: ampm,
      onChange: function onChange(event) {
        return setAmpm(event.target.value);
      }
    })), /*#__PURE__*/_react["default"].createElement(_grommet.FormField, {
      label: "Size",
      htmlFor: "size",
      name: "size"
    }, /*#__PURE__*/_react["default"].createElement(_grommet.Select, {
      id: "size",
      name: "size",
      options: ['small', 'medium', 'large'],
      value: size,
      onChange: function onChange(event) {
        return setSize(event.option);
      }
    })), /*#__PURE__*/_react["default"].createElement(_grommet.FormField, {
      label: "Comments",
      htmlFor: "comments",
      name: "comments"
    }, /*#__PURE__*/_react["default"].createElement(_grommet.TextArea, {
      id: "comments",
      name: "comments",
      value: comments,
      onChange: function onChange(event) {
        return setComments(event.target.value);
      }
    })), /*#__PURE__*/_react["default"].createElement(_grommet.FormField, {
      label: "Age",
      htmlFor: "age",
      name: "age",
      pad: true
    }, /*#__PURE__*/_react["default"].createElement(_grommet.RangeInput, {
      id: "age",
      name: "age",
      min: 15,
      max: 75,
      value: age,
      "aria-valuemin": 15,
      "aria-valuemax": 75,
      "aria-valuenow": 30,
      onChange: function onChange(event) {
        return setAge(event.target.value);
      }
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
ControlledInput.storyName = 'Controlled input';
ControlledInput.parameters = {
  // chromatic disabled because snapshot is the same as ControlledInputLazy
  chromatic: {
    disable: true
  }
};
ControlledInput.args = {
  full: true
};
var _default = exports["default"] = {
  title: 'Input/Form/Controlled input'
};