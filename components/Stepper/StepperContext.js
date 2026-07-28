"use strict";

exports.__esModule = true;
exports.useStepper = exports.useStepItem = exports.StepperContext = exports.StepItemContext = void 0;
var _react = require("react");
var StepperContext = exports.StepperContext = /*#__PURE__*/(0, _react.createContext)({
  currentStep: '',
  steps: [],
  direction: 'horizontal',
  clickableSteps: true,
  onStepClick: undefined,
  showDescription: true,
  stepIndex: function stepIndex() {
    return -1;
  },
  isPriorStep: function isPriorStep() {
    return false;
  },
  isAfterStep: function isAfterStep() {
    return false;
  },
  isCurrentStep: function isCurrentStep() {
    return false;
  },
  canNavigateTo: function canNavigateTo() {
    return false;
  }
});

// Step-level context: provides the current step's data to subcomponents
var StepItemContext = exports.StepItemContext = /*#__PURE__*/(0, _react.createContext)({
  step: null,
  index: 0,
  isLast: false,
  isLabelRevealed: false,
  isSubStep: false
});
var useStepper = exports.useStepper = function useStepper() {
  return (0, _react.useContext)(StepperContext);
};
var useStepItem = exports.useStepItem = function useStepItem() {
  return (0, _react.useContext)(StepItemContext);
};