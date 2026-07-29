"use strict";

exports.__esModule = true;
exports.Stepper = void 0;
var _react = _interopRequireWildcard(require("react"));
var _Box = require("../Box");
var _MessageContext = require("../../contexts/MessageContext");
var _Keyboard = require("../Keyboard");
var _StepConnector = require("./StepConnector");
var _StepperContext = require("./StepperContext");
var _StepperStep = require("./StepperStep");
var _propTypes = require("./propTypes");
var _excluded = ["steps", "currentStep", "direction", "clickableSteps", "showDescription", "onStepClick", "aria-label", "children", "id"];
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function _interopRequireWildcard(e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, "default": e }; if (null === e || "object" != typeof e && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (var _t in e) "default" !== _t && {}.hasOwnProperty.call(e, _t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, _t)) && (i.get || i.set) ? o(f, _t, i) : f[_t] = e[_t]); return f; })(e, t); }
function _objectWithoutPropertiesLoose(r, e) { if (null == r) return {}; var t = {}; for (var n in r) if ({}.hasOwnProperty.call(r, n)) { if (-1 !== e.indexOf(n)) continue; t[n] = r[n]; } return t; }
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
// Flattens steps with parent/child relationships into a linear list
// for keyboard navigation and index-based tracking.
var flattenSteps = function flattenSteps(steps) {
  var flat = [];
  var hasSubSubSteps = false;
  steps.forEach(function (step, parentIdx) {
    var hasChildren = step.children && step.children.length > 0;
    var isLastParent = parentIdx === steps.length - 1;
    flat.push(_extends({}, step, {
      isSubStep: false,
      showConnector: !isLastParent,
      childIds: hasChildren ? step.children.map(function (c) {
        return c.id;
      }) : []
    }));
    if (hasChildren) {
      step.children.forEach(function (child) {
        flat.push(_extends({}, child, {
          isSubStep: true,
          showConnector: false,
          parentId: step.id,
          childIds: []
        }));
        if (child.children && child.children.length > 0) {
          hasSubSubSteps = true;
        }
      });
    }
  });
  if (process.env.NODE_ENV !== 'production' && hasSubSubSteps) {
    console.warn('Stepper: sub-steps with their own children are not supported.');
  }
  return flat;
};
var Stepper = exports.Stepper = /*#__PURE__*/(0, _react.forwardRef)(function (_ref, ref) {
  var _ref$steps = _ref.steps,
    steps = _ref$steps === void 0 ? [] : _ref$steps,
    currentStep = _ref.currentStep,
    _ref$direction = _ref.direction,
    directionProp = _ref$direction === void 0 ? 'horizontal' : _ref$direction,
    _ref$clickableSteps = _ref.clickableSteps,
    clickableSteps = _ref$clickableSteps === void 0 ? true : _ref$clickableSteps,
    _ref$showDescription = _ref.showDescription,
    showDescription = _ref$showDescription === void 0 ? true : _ref$showDescription,
    onStepClick = _ref.onStepClick,
    ariaLabel = _ref['aria-label'],
    children = _ref.children,
    id = _ref.id,
    rest = _objectWithoutPropertiesLoose(_ref, _excluded);
  var _useContext = (0, _react.useContext)(_MessageContext.MessageContext),
    format = _useContext.format;
  var stepRefs = (0, _react.useRef)(new Map());
  var flatSteps = (0, _react.useMemo)(function () {
    return flattenSteps(steps);
  }, [steps]);
  var stepsRef = (0, _react.useRef)(flatSteps);
  stepsRef.current = flatSteps;
  (0, _react.useEffect)(function () {
    if (process.env.NODE_ENV !== 'production') {
      console.warn('Warning: Stepper is currently in beta. The API is subject ' + 'to change in future releases.');
    }
  }, []);

  // Force vertical if steps have children
  // (horizontal substeps not supported)
  var hasSubSteps = steps.some(function (step) {
    return step.children && step.children.length > 0;
  });
  var direction = hasSubSteps && directionProp === 'horizontal' ? 'vertical' : directionProp;

  // Warn in dev about invalid state
  if (process.env.NODE_ENV !== 'production') {
    if (hasSubSteps && directionProp === 'horizontal') {
      console.warn('Stepper: horizontal direction with sub-steps is not supported. ' + 'Falling back to vertical.');
    }
    if (currentStep) {
      var currentStepObj = flatSteps.find(function (s) {
        return s.id === currentStep;
      });
      if (!currentStepObj) {
        console.warn('Stepper: currentStep "' + (currentStep + "\" does not match any ") + 'step id. Falling back to the ' + 'first non-disabled step.');
      } else if (currentStepObj.status === 'disabled') {
        console.warn("Stepper: currentStep \"" + currentStep + "\" matches a disabled step. " + "This is an invalid state. The step will render as disabled.");
      }
    }
  }

  // Determine effective current step (fallback to first non-disabled)
  var effectiveCurrentStep = (0, _react.useMemo)(function () {
    var _flatSteps$;
    var match = flatSteps.find(function (s) {
      return s.id === currentStep;
    });
    if (match && match.status !== 'disabled') return currentStep;
    var fallback = flatSteps.find(function (s) {
      return s.status !== 'disabled';
    });
    return fallback ? fallback.id : ((_flatSteps$ = flatSteps[0]) == null ? void 0 : _flatSteps$.id) || '';
  }, [currentStep, flatSteps]);

  // Roving tabindex: only the focused step has tabIndex=0,
  // all others have tabIndex=-1. A ref keeps the index synchronous
  // for keyboard handlers that fire before React re-renders.
  var currentIndex = flatSteps.findIndex(function (s) {
    return s.id === effectiveCurrentStep;
  });
  var flatStepsLength = flatSteps.length;
  var _useState = (0, _react.useState)(currentIndex >= 0 ? currentIndex : 0),
    focusedIndex = _useState[0],
    setFocusedIndex = _useState[1];
  var focusedIndexRef = (0, _react.useRef)(focusedIndex);
  var updateFocusedIndex = (0, _react.useCallback)(function (idx) {
    focusedIndexRef.current = idx;
    setFocusedIndex(idx);
  }, []);
  var stepIndex = (0, _react.useCallback)(function (stepId) {
    return flatSteps.findIndex(function (s) {
      return s.id === stepId;
    });
  }, [flatSteps]);
  var isPriorStep = (0, _react.useCallback)(function (stepId) {
    var idx = stepIndex(stepId);
    var curIdx = stepIndex(effectiveCurrentStep);
    return idx < curIdx;
  }, [stepIndex, effectiveCurrentStep]);
  var isAfterStep = (0, _react.useCallback)(function (stepId) {
    var idx = stepIndex(stepId);
    var curIdx = stepIndex(effectiveCurrentStep);
    return idx > curIdx;
  }, [stepIndex, effectiveCurrentStep]);
  var isCurrentStep = (0, _react.useCallback)(function (stepId) {
    return stepId === effectiveCurrentStep;
  }, [effectiveCurrentStep]);
  var canNavigateTo = (0, _react.useCallback)(function (stepId) {
    var step = flatSteps.find(function (s) {
      return s.id === stepId;
    });
    return clickableSteps && step && step.status !== 'disabled';
  }, [flatSteps, clickableSteps]);
  var contextValue = (0, _react.useMemo)(function () {
    return {
      currentStep: effectiveCurrentStep,
      steps: flatSteps,
      direction: direction,
      clickableSteps: clickableSteps,
      onStepClick: onStepClick,
      showDescription: showDescription,
      stepIndex: stepIndex,
      isPriorStep: isPriorStep,
      isAfterStep: isAfterStep,
      isCurrentStep: isCurrentStep,
      canNavigateTo: canNavigateTo
    };
  }, [effectiveCurrentStep, flatSteps, direction, clickableSteps, onStepClick, showDescription, stepIndex, isPriorStep, isAfterStep, isCurrentStep, canNavigateTo]);

  // Wraps around the step list to find the next step
  // in the given direction (+1 forward, -1 backward).
  var findNextEnabledIndex = (0, _react.useCallback)(function (startIndex, delta) {
    return (startIndex + delta + flatStepsLength) % flatStepsLength;
  }, [flatStepsLength]);
  var findFirstEnabledIndex = (0, _react.useCallback)(function () {
    return 0;
  }, []);
  var findLastEnabledIndex = (0, _react.useCallback)(function () {
    return flatStepsLength - 1;
  }, [flatStepsLength]);
  var moveFocus = (0, _react.useCallback)(function (nextIndex) {
    if (nextIndex !== undefined && nextIndex !== focusedIndexRef.current) {
      updateFocusedIndex(nextIndex);
      var nextButton = stepRefs.current.get(nextIndex);
      if (nextButton) {
        nextButton.focus();
      }
    }
  }, [updateFocusedIndex]);
  var onNext = (0, _react.useCallback)(function () {
    moveFocus(findNextEnabledIndex(focusedIndexRef.current, 1));
  }, [findNextEnabledIndex, moveFocus]);
  var onPrevious = (0, _react.useCallback)(function () {
    moveFocus(findNextEnabledIndex(focusedIndexRef.current, -1));
  }, [findNextEnabledIndex, moveFocus]);
  var handleKeyDown = (0, _react.useCallback)(function (event) {
    var isHorizontal = direction === 'horizontal';
    switch (event.key) {
      case 'ArrowRight':
        if (isHorizontal) {
          event.preventDefault();
          onNext();
        }
        break;
      case 'ArrowLeft':
        if (isHorizontal) {
          event.preventDefault();
          onPrevious();
        }
        break;
      case 'ArrowDown':
        if (!isHorizontal) {
          event.preventDefault();
          onNext();
        }
        break;
      case 'ArrowUp':
        if (!isHorizontal) {
          event.preventDefault();
          onPrevious();
        }
        break;
      case 'Home':
        event.preventDefault();
        moveFocus(findFirstEnabledIndex());
        break;
      case 'End':
        event.preventDefault();
        moveFocus(findLastEnabledIndex());
        break;
      default:
        break;
    }
  }, [direction, onNext, onPrevious, findFirstEnabledIndex, findLastEnabledIndex, moveFocus]);
  var renderDefaultSteps = function renderDefaultSteps() {
    var flatIndex = 0;
    var elements = [];
    steps.forEach(function (step, parentIdx) {
      var parentFlatIndex = flatIndex;
      flatIndex += 1;
      var childElements = step.children ? step.children.map(function (child) {
        var childFlatIndex = flatIndex;
        flatIndex += 1;
        return /*#__PURE__*/_react["default"].createElement(_StepperStep.StepperStep, {
          key: child.id,
          step: child,
          stepNumber: childFlatIndex + 1,
          isLast: false,
          showConnector: false,
          direction: direction,
          focusedIndex: focusedIndex,
          index: childFlatIndex,
          isSubStep: true,
          onFocusStep: updateFocusedIndex,
          stepsRef: stepsRef,
          stepRefs: stepRefs
        });
      }) : null;
      var isLastParent = parentIdx === steps.length - 1;
      elements.push(/*#__PURE__*/_react["default"].createElement(_StepperStep.StepperStep, {
        key: step.id,
        step: step,
        stepNumber: parentFlatIndex + 1,
        isLast: isLastParent,
        showConnector: direction === 'horizontal' ? false : !isLastParent || !!childElements,
        direction: direction,
        focusedIndex: focusedIndex,
        index: parentFlatIndex,
        isSubStep: false,
        onFocusStep: updateFocusedIndex,
        stepsRef: stepsRef,
        stepRefs: stepRefs
      }));
      if (!isLastParent || childElements && direction === 'vertical') {
        elements.push(/*#__PURE__*/_react["default"].createElement(_StepConnector.StepConnector, {
          key: step.id + "-connector",
          step: step,
          direction: direction
        }, childElements));
      }
    });
    return elements;
  };
  var stepperContent = /*#__PURE__*/_react["default"].createElement(_Box.Box, _extends({
    ref: ref,
    as: "ol",
    "aria-label": ariaLabel || format({
      id: 'stepper.progress'
    }),
    direction: direction === 'horizontal' ? 'row' : 'column',
    fill: direction,
    id: id,
    overflow: "hidden",
    pad: "none",
    margin: "none",
    style: {
      listStyle: 'none'
    }
  }, rest), children || renderDefaultSteps());
  return /*#__PURE__*/_react["default"].createElement(_StepperContext.StepperContext.Provider, {
    value: contextValue
  }, clickableSteps ? /*#__PURE__*/_react["default"].createElement(_Keyboard.Keyboard, {
    onKeyDown: handleKeyDown
  }, stepperContent) : stepperContent);
});
Stepper.displayName = 'Stepper';
Stepper.propTypes = _propTypes.StepperPropTypes;