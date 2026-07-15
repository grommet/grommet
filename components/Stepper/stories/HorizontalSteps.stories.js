"use strict";

exports.__esModule = true;
exports["default"] = exports.HorizontalSteps = void 0;
var _react = _interopRequireWildcard(require("react"));
var _grommet = require("grommet");
var _Stepper = require("../Stepper");
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function _interopRequireWildcard(e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, "default": e }; if (null === e || "object" != typeof e && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (var _t in e) "default" !== _t && {}.hasOwnProperty.call(e, _t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, _t)) && (i.get || i.set) ? o(f, _t, i) : f[_t] = e[_t]); return f; })(e, t); }
var HorizontalSteps = exports.HorizontalSteps = function HorizontalSteps() {
  var _useState = (0, _react.useState)('profile'),
    currentStep = _useState[0],
    setCurrentStep = _useState[1];
  var steps = [{
    id: 'account',
    title: 'Account',
    status: 'completed'
  }, {
    id: 'profile',
    title: 'Profile',
    status: 'pending'
  }, {
    id: 'review',
    title: 'Review',
    status: 'pending'
  }];
  return (
    /*#__PURE__*/
    // Uncomment <Grommet> lines when using outside of storybook
    // <Grommet theme={...}>
    _react["default"].createElement(_grommet.Box, {
      gap: "medium",
      pad: "large"
    }, /*#__PURE__*/_react["default"].createElement(_Stepper.Stepper, {
      steps: steps,
      currentStep: currentStep,
      direction: "horizontal",
      onStepClick: function onStepClick(id) {
        return setCurrentStep(id);
      }
    }), /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
      pad: "medium",
      background: "background-contrast",
      round: "small"
    }, /*#__PURE__*/_react["default"].createElement(_grommet.Paragraph, null, "Step content for \"", currentStep, "\"")))
    // </Grommet>
  );
};
var _default = exports["default"] = {
  title: 'Visualizations/Stepper/Horizontal Steps'
};