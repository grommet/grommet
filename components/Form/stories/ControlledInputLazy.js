"use strict";

exports.__esModule = true;
exports["default"] = exports.ControlledInputLazy = void 0;
var _react = _interopRequireWildcard(require("react"));
var _grommet = require("grommet");
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { "default": e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && Object.prototype.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n["default"] = e, t && t.set(e, n), n; }
var ControlledInputLazy = exports.ControlledInputLazy = function ControlledInputLazy() {
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
  (0, _react.useEffect)(function () {
    setName('initial');
    setEmail('initial@my.com');
    setSubscribe(true);
    setAmpm('evening');
    setSize('large');
    setComments('initial');
    setAge(60);
  }, []);
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
      name: "subscribe"
    }, /*#__PURE__*/_react["default"].createElement(_grommet.CheckBox, {
      name: "subscribe",
      label: "Subscribe?",
      checked: subscribe,
      onChange: function onChange(event) {
        return setSubscribe(event.target.checked);
      }
    })), /*#__PURE__*/_react["default"].createElement(_grommet.FormField, {
      name: "ampm"
    }, /*#__PURE__*/_react["default"].createElement(_grommet.RadioButtonGroup, {
      name: "ampm",
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
      "aria-label": "size",
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

ControlledInputLazy.storyName = 'Controlled input lazy';
ControlledInputLazy.args = {
  full: true
};
var _default = exports["default"] = {
  title: 'Input/Form/Controlled input lazy'
};