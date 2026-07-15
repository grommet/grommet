"use strict";

exports.__esModule = true;
exports["default"] = exports.Validation = void 0;
var _react = _interopRequireWildcard(require("react"));
var _grommet = require("grommet");
var _Wizard = require("../Wizard");
var _themes = require("../../../themes");
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function _interopRequireWildcard(e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, "default": e }; if (null === e || "object" != typeof e && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (var _t in e) "default" !== _t && {}.hasOwnProperty.call(e, _t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, _t)) && (i.get || i.set) ? o(f, _t, i) : f[_t] = e[_t]); return f; })(e, t); }
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
var Validation = exports.Validation = function Validation() {
  var _useState = (0, _react.useState)(null),
    result = _useState[0],
    setResult = _useState[1];
  var steps = [{
    id: 'email',
    title: 'Email',
    description: 'Enter a valid email address.',
    validate: function validate(value) {
      if (!value.email) return 'Email is required.';
      if (!value.email.includes('@')) return 'Enter a valid email address.';
      return true;
    },
    render: function render(step, api) {
      return /*#__PURE__*/_react["default"].createElement(_grommet.TextInput, {
        placeholder: "you@example.com",
        value: api.formValue.email || '',
        onChange: function onChange(event) {
          return api.setFormValue(_extends({}, api.formValue, {
            email: event.target.value
          }));
        }
      });
    }
  }, {
    id: 'password',
    title: 'Password',
    description: 'Choose a password.',
    validate: function validate(value) {
      return value.password && value.password.length >= 6 ? true : 'Password must be at least 6 characters.';
    },
    render: function render(step, api) {
      return /*#__PURE__*/_react["default"].createElement(_grommet.TextInput, {
        type: "password",
        placeholder: "password",
        value: api.formValue.password || '',
        onChange: function onChange(event) {
          return api.setFormValue(_extends({}, api.formValue, {
            password: event.target.value
          }));
        }
      });
    }
  }, {
    id: 'confirm',
    title: 'Confirm',
    description: 'Ready to submit.',
    render: function render(step, api) {
      return /*#__PURE__*/_react["default"].createElement(_grommet.Paragraph, null, "Confirm sign-up for ", api.formValue.email, ".");
    }
  }];
  return /*#__PURE__*/_react["default"].createElement(_grommet.Grommet, {
    theme: _themes.grommet,
    full: true
  }, /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
    fill: true
  }, /*#__PURE__*/_react["default"].createElement(_Wizard.Wizard, {
    "aria-label": "Sign up",
    header: {
      title: 'Create your account'
    },
    steps: steps,
    defaultValue: {
      email: '',
      password: ''
    },
    onComplete: function onComplete(value) {
      return setResult({
        status: 'complete',
        value: value
      });
    }
  }), result && /*#__PURE__*/_react["default"].createElement(_grommet.Notification, {
    toast: {
      position: 'top'
    },
    status: "normal",
    title: "Wizard complete",
    message: result.value && Object.keys(result.value).length > 0 ? "Completed: " + JSON.stringify(result.value) : undefined,
    onClose: function onClose() {
      return setResult(null);
    }
  })));
};
var _default = exports["default"] = {
  title: 'Layout/Wizard/Validation'
};