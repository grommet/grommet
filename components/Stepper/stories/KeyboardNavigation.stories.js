"use strict";

exports.__esModule = true;
exports["default"] = exports.KeyboardNavigation = void 0;
var _react = _interopRequireWildcard(require("react"));
var _grommet = require("grommet");
var _Stepper = require("../Stepper");
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function _interopRequireWildcard(e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, "default": e }; if (null === e || "object" != typeof e && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (var _t in e) "default" !== _t && {}.hasOwnProperty.call(e, _t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, _t)) && (i.get || i.set) ? o(f, _t, i) : f[_t] = e[_t]); return f; })(e, t); }
var KeyboardNavigation = exports.KeyboardNavigation = function KeyboardNavigation() {
  var _useState = (0, _react.useState)('step1'),
    currentStep = _useState[0],
    setCurrentStep = _useState[1];
  var stepperRef = (0, _react.useRef)();
  var steps = [{
    id: 'step1',
    title: 'Step 1',
    status: 'completed'
  }, {
    id: 'step2',
    title: 'Step 2',
    status: 'pending'
  }, {
    id: 'step3',
    title: 'Step 3',
    status: 'pending'
  }, {
    id: 'step4',
    title: 'Step 4',
    status: 'disabled',
    disabledReason: 'Complete all prior steps.'
  }, {
    id: 'step5',
    title: 'Step 5',
    status: 'pending'
  }];
  (0, _react.useEffect)(function () {
    var _stepperRef$current;
    // Auto-focus the first step button so the focus ring is visible immediately
    var firstButton = (_stepperRef$current = stepperRef.current) == null ? void 0 : _stepperRef$current.querySelector('button');
    if (firstButton) firstButton.focus();
  }, []);
  return (
    /*#__PURE__*/
    // Uncomment <Grommet> lines when using outside of storybook
    // <Grommet theme={...}>
    _react["default"].createElement(_grommet.Box, {
      pad: "large",
      gap: "medium"
    }, /*#__PURE__*/_react["default"].createElement(_grommet.Text, {
      weight: "bold"
    }, "Use Arrow keys to navigate and Enter/Space to select."), /*#__PURE__*/_react["default"].createElement(_Stepper.Stepper, {
      ref: stepperRef,
      steps: steps,
      currentStep: currentStep,
      onStepClick: function onStepClick(id) {
        setCurrentStep(id);
      }
    }), /*#__PURE__*/_react["default"].createElement(_grommet.Text, null, "Selected : ", currentStep))
    // </Grommet>
  );
};
var _default = exports["default"] = {
  title: 'Visualizations/Stepper/Keyboard Navigation'
};