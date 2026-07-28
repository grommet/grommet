var _excluded = ["steps", "currentStep", "direction", "clickableSteps", "showDescription", "onStepClick", "aria-label", "children", "id"];
function _objectWithoutPropertiesLoose(r, e) { if (null == r) return {}; var t = {}; for (var n in r) if ({}.hasOwnProperty.call(r, n)) { if (-1 !== e.indexOf(n)) continue; t[n] = r[n]; } return t; }
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
import React, { forwardRef, useCallback, useContext, useMemo, useRef, useState } from 'react';
import { Box } from '../Box';
import { MessageContext } from '../../contexts/MessageContext';
import { Keyboard } from '../Keyboard';
import { StepConnector } from './StepConnector';
import { StepperContext } from './StepperContext';
import { StepperStep } from './StepperStep';
import { StepperPropTypes } from './propTypes';

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
var Stepper = /*#__PURE__*/forwardRef(function (_ref, ref) {
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
  var _useContext = useContext(MessageContext),
    format = _useContext.format;
  var stepRefs = useRef(new Map());
  var flatSteps = useMemo(function () {
    return flattenSteps(steps);
  }, [steps]);
  var stepsRef = useRef(flatSteps);
  stepsRef.current = flatSteps;

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
  var effectiveCurrentStep = useMemo(function () {
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
  var _useState = useState(currentIndex >= 0 ? currentIndex : 0),
    focusedIndex = _useState[0],
    setFocusedIndex = _useState[1];
  var focusedIndexRef = useRef(focusedIndex);
  var updateFocusedIndex = useCallback(function (idx) {
    focusedIndexRef.current = idx;
    setFocusedIndex(idx);
  }, []);
  var stepIndex = useCallback(function (stepId) {
    return flatSteps.findIndex(function (s) {
      return s.id === stepId;
    });
  }, [flatSteps]);
  var isPriorStep = useCallback(function (stepId) {
    var idx = stepIndex(stepId);
    var curIdx = stepIndex(effectiveCurrentStep);
    return idx < curIdx;
  }, [stepIndex, effectiveCurrentStep]);
  var isAfterStep = useCallback(function (stepId) {
    var idx = stepIndex(stepId);
    var curIdx = stepIndex(effectiveCurrentStep);
    return idx > curIdx;
  }, [stepIndex, effectiveCurrentStep]);
  var isCurrentStep = useCallback(function (stepId) {
    return stepId === effectiveCurrentStep;
  }, [effectiveCurrentStep]);
  var canNavigateTo = useCallback(function (stepId) {
    var step = flatSteps.find(function (s) {
      return s.id === stepId;
    });
    return clickableSteps && step && step.status !== 'disabled';
  }, [flatSteps, clickableSteps]);
  var contextValue = useMemo(function () {
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
  var findNextEnabledIndex = useCallback(function (startIndex, delta) {
    return (startIndex + delta + flatStepsLength) % flatStepsLength;
  }, [flatStepsLength]);
  var findFirstEnabledIndex = useCallback(function () {
    return 0;
  }, []);
  var findLastEnabledIndex = useCallback(function () {
    return flatStepsLength - 1;
  }, [flatStepsLength]);
  var moveFocus = useCallback(function (nextIndex) {
    if (nextIndex !== undefined && nextIndex !== focusedIndexRef.current) {
      updateFocusedIndex(nextIndex);
      var nextButton = stepRefs.current.get(nextIndex);
      if (nextButton) {
        nextButton.focus();
      }
    }
  }, [updateFocusedIndex]);
  var onNext = useCallback(function () {
    moveFocus(findNextEnabledIndex(focusedIndexRef.current, 1));
  }, [findNextEnabledIndex, moveFocus]);
  var onPrevious = useCallback(function () {
    moveFocus(findNextEnabledIndex(focusedIndexRef.current, -1));
  }, [findNextEnabledIndex, moveFocus]);
  var handleKeyDown = useCallback(function (event) {
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
        return /*#__PURE__*/React.createElement(StepperStep, {
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
      elements.push(/*#__PURE__*/React.createElement(StepperStep, {
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
        elements.push(/*#__PURE__*/React.createElement(StepConnector, {
          key: step.id + "-connector",
          step: step,
          direction: direction
        }, childElements));
      }
    });
    return elements;
  };
  var stepperContent = /*#__PURE__*/React.createElement(Box, _extends({
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
  return /*#__PURE__*/React.createElement(StepperContext.Provider, {
    value: contextValue
  }, clickableSteps ? /*#__PURE__*/React.createElement(Keyboard, {
    onKeyDown: handleKeyDown
  }, stepperContent) : stepperContent);
});
Stepper.displayName = 'Stepper';
Stepper.propTypes = StepperPropTypes;
export { Stepper };