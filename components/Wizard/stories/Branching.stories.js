"use strict";

exports.__esModule = true;
exports["default"] = exports.Branching = void 0;
var _react = _interopRequireWildcard(require("react"));
var _grommet = require("grommet");
var _Wizard = require("../Wizard");
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function _interopRequireWildcard(e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, "default": e }; if (null === e || "object" != typeof e && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (var _t in e) "default" !== _t && {}.hasOwnProperty.call(e, _t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, _t)) && (i.get || i.set) ? o(f, _t, i) : f[_t] = e[_t]); return f; })(e, t); }
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
// Branching wizard: the Review step is added only when the user checks
// "Include a manual review step"; the stepper updates live.
var planStep = {
  id: 'plan',
  title: 'Plan',
  description: 'Include optional a manual review.',
  render: function render(step, api) {
    return /*#__PURE__*/_react["default"].createElement(_grommet.CheckBox, {
      label: "Include a manual review step",
      checked: !!api.formValue.review,
      onChange: function onChange(event) {
        return api.setFormValue(_extends({}, api.formValue, {
          review: event.target.checked
        }));
      }
    });
  }
};
var reviewStep = {
  id: 'review',
  title: 'Review',
  description: 'Someone will review your changes.',
  render: function render() {
    return /*#__PURE__*/_react["default"].createElement(_grommet.Paragraph, null, "Reviewer will be assigned.");
  }
};
var deployStep = {
  id: 'deploy',
  title: 'Deploy',
  description: 'Deploy your changes.',
  render: function render() {
    return /*#__PURE__*/_react["default"].createElement(_grommet.Paragraph, null, "Ready to deploy.");
  }
};
var Branching = exports.Branching = function Branching() {
  var _useState = (0, _react.useState)({
      review: false
    }),
    value = _useState[0],
    setValue = _useState[1];
  var _useState2 = (0, _react.useState)(null),
    result = _useState2[0],
    setResult = _useState2[1];
  var steps = (0, _react.useMemo)(function () {
    return value.review ? [planStep, reviewStep, deployStep] : [planStep, deployStep];
  }, [value.review]);
  return /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
    fill: true
  }, /*#__PURE__*/_react["default"].createElement(_Wizard.Wizard, {
    "aria-label": "Deployment",
    title: "Deploy an application",
    showProgress: "horizontal",
    steps: steps,
    value: value,
    onChange: function onChange(_ref) {
      var nextValue = _ref.value;
      return setValue(nextValue);
    },
    messages: {
      next: 'Continue',
      complete: 'Deploy'
    },
    onComplete: function onComplete(_ref2) {
      var nextValue = _ref2.value;
      return setResult({
        status: 'complete',
        value: nextValue
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
  }));
};
Branching.args = {
  full: true
};
var _default = exports["default"] = {
  title: 'Layout/Wizard/Branching'
};