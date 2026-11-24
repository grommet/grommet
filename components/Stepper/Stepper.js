"use strict";

exports.__esModule = true;
exports.Stepper = void 0;
var _react = _interopRequireWildcard(require("react"));
var _Box = require("../Box");
var _MessageContext = require("../../contexts/MessageContext");
var _useThemeValue2 = require("../../utils/useThemeValue");
var _Keyboard = require("../Keyboard");
var _StepperContext = require("./StepperContext");
var _StepperStep = require("./StepperStep");
var _propTypes = require("./propTypes");
var _utils = require("./utils");
var _excluded = ["steps", "currentStep", "direction", "clickableSteps", "showDescription", "errorAnnouncement", "onStepClick", "aria-label", "children", "id"];
var cache;
function _interopRequireWildcard(e, t) { if (!t && e && e.__esModule) return e; var r, c, a = Object.defineProperty, n = { __proto__: null, "default": e }; if (Object(e) !== e) return n; if (cache || "function" != typeof WeakMap || (cache = new WeakMap()), cache) { if (cache.has(e)) return cache.get(e); cache.set(e, n); } for (c in e) "default" !== c && {}.hasOwnProperty.call(e, c) && ((r = a && Object.getOwnPropertyDescriptor(e, c)) && (r.get || r.set) ? a(n, c, r) : n[c] = e[c]); return n; }
function _objectWithoutPropertiesLoose(r, e) { if (null == r) return {}; var t = {}; for (var n in r) if ({}.hasOwnProperty.call(r, n)) { if (-1 !== e.indexOf(n)) continue; t[n] = r[n]; } return t; }
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); } // SPDX-FileCopyrightText: © Hewlett Packard Enterprise Development LP
// SPDX-License-Identifier: Apache-2.0
// Flattens steps with parent/child relationships into a linear list
// for keyboard navigation.
var flattenSteps = function flattenSteps(steps) {
  var flat = [];
  var hasSubSubSteps = false;
  steps.forEach(function (step) {
    var hasChildren = step.children && step.children.length > 0;
    flat.push(_extends({}, step, {
      isSubStep: false,
      childIds: hasChildren ? step.children.map(function (c) {
        return c.id;
      }) : []
    }));
    if (hasChildren) {
      step.children.forEach(function (child) {
        flat.push(_extends({}, child, {
          isSubStep: true,
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
var isEnabledLeaf = function isEnabledLeaf(step) {
  return step.status !== 'disabled' && (!step.childIds.length || step.isSubStep);
};
var findFirstEnabledChild = function findFirstEnabledChild(steps, parentId) {
  return steps.find(function (step) {
    return step.parentId === parentId && step.status !== 'disabled';
  });
};
var findFirstEnabledLeaf = function findFirstEnabledLeaf(steps, startIndex) {
  if (startIndex === void 0) {
    startIndex = 0;
  }
  return steps.slice(startIndex).find(isEnabledLeaf) || steps.find(isEnabledLeaf);
};
var resolveCurrentStep = function resolveCurrentStep(steps, currentStepId) {
  var _steps$;
  var requestedIndex = steps.findIndex(function (step) {
    return step.id === currentStepId;
  });
  var requestedStep = steps[requestedIndex];
  var canUseRequestedStep = requestedStep && requestedStep.status !== 'disabled';
  var requestedTarget;
  if (canUseRequestedStep) {
    requestedTarget = requestedStep.childIds.length ? findFirstEnabledChild(steps, requestedStep.id) : requestedStep;
  }

  // Parents with children are headings, not navigation stops. If the
  // requested group has no enabled child, scan in input order for an enabled
  // leaf, matching Wizard's forward-order navigation policy.
  var fallback = requestedTarget || findFirstEnabledLeaf(steps, requestedIndex >= 0 ? requestedIndex + 1 : 0);
  return (fallback == null ? void 0 : fallback.id) || ((_steps$ = steps[0]) == null ? void 0 : _steps$.id) || '';
};
var Stepper = exports.Stepper = /*#__PURE__*/(0, _react.forwardRef)(function (_ref, ref) {
  var _allSteps$find;
  var _ref$steps = _ref.steps,
    steps = _ref$steps === void 0 ? [] : _ref$steps,
    currentStep = _ref.currentStep,
    _ref$direction = _ref.direction,
    directionProp = _ref$direction === void 0 ? 'horizontal' : _ref$direction,
    _ref$clickableSteps = _ref.clickableSteps,
    clickableSteps = _ref$clickableSteps === void 0 ? true : _ref$clickableSteps,
    _ref$showDescription = _ref.showDescription,
    showDescription = _ref$showDescription === void 0 ? true : _ref$showDescription,
    _ref$errorAnnouncemen = _ref.errorAnnouncement,
    errorAnnouncement = _ref$errorAnnouncemen === void 0 ? 'polite' : _ref$errorAnnouncemen,
    onStepClick = _ref.onStepClick,
    ariaLabel = _ref['aria-label'],
    children = _ref.children,
    id = _ref.id,
    rest = _objectWithoutPropertiesLoose(_ref, _excluded);
  var _useContext = (0, _react.useContext)(_MessageContext.MessageContext),
    format = _useContext.format;
  var _useThemeValue = (0, _useThemeValue2.useThemeValue)(),
    theme = _useThemeValue.theme;
  var stepRefs = (0, _react.useRef)(new Map());
  var allSteps = (0, _react.useMemo)(function () {
    return flattenSteps(steps);
  }, [steps]);

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
      var currentStepObj = allSteps.find(function (s) {
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
    return resolveCurrentStep(allSteps, currentStep);
  }, [currentStep, allSteps]);

  // Reveal a whole group on entry, not just the active child. Remember
  // groups by id so controlled changes and recreated step objects do not
  // collapse visited children. Adjust during render so an initial
  // current child is visible immediately, without an effect or hidden frame.
  var currentParentId = (_allSteps$find = allSteps.find(function (step) {
    return step.id === effectiveCurrentStep;
  })) == null ? void 0 : _allSteps$find.parentId;
  var _useState = (0, _react.useState)(function () {
      return new Set();
    }),
    localRevealedParents = _useState[0],
    setLocalRevealedParents = _useState[1];
  var revealedParents = localRevealedParents;
  if (currentParentId && !localRevealedParents.has(currentParentId)) {
    setLocalRevealedParents(new Set(Array.from(localRevealedParents).concat(currentParentId)));
  }
  var flatSteps = (0, _react.useMemo)(function () {
    return allSteps.filter(function (step) {
      return !step.isSubStep || step.parentId === currentParentId || revealedParents.has(step.parentId);
    });
  }, [allSteps, currentParentId, revealedParents]);
  // Roving tabindex: only the focused step has tabIndex=0,
  // all others have tabIndex=-1. Track focus by id so inserting
  // revealed children does not shift focus.
  var _useState2 = (0, _react.useState)(effectiveCurrentStep),
    focusedStep = _useState2[0],
    setFocusedStep = _useState2[1];
  var focusedStepId = flatSteps.some(function (s) {
    return s.id === focusedStep;
  }) ? focusedStep : effectiveCurrentStep;
  var focusedStepRef = (0, _react.useRef)(focusedStepId);
  focusedStepRef.current = focusedStepId;
  var updateFocusedStep = (0, _react.useCallback)(function (stepId) {
    focusedStepRef.current = stepId;
    setFocusedStep(stepId);
  }, []);
  var registerStepRef = (0, _react.useCallback)(function (stepId, element) {
    if (element) stepRefs.current.set(stepId, element);else stepRefs.current["delete"](stepId);
  }, []);
  var stepIndex = (0, _react.useCallback)(function (stepId) {
    return allSteps.findIndex(function (s) {
      return s.id === stepId;
    });
  }, [allSteps]);
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
    var step = allSteps.find(function (s) {
      return s.id === stepId;
    });
    if (!clickableSteps || !step || step.status === 'disabled') return false;
    if (step.childIds.length) {
      return allSteps.some(function (child) {
        return child.parentId === step.id && child.status !== 'disabled';
      });
    }
    return true;
  }, [allSteps, clickableSteps]);
  var contextValue = (0, _react.useMemo)(function () {
    return {
      currentStep: effectiveCurrentStep,
      focusedStepId: focusedStepId,
      steps: allSteps,
      direction: direction,
      clickableSteps: clickableSteps,
      onStepClick: onStepClick,
      onFocusStep: updateFocusedStep,
      registerStepRef: registerStepRef,
      showDescription: showDescription,
      errorAnnouncement: errorAnnouncement,
      stepIndex: stepIndex,
      isPriorStep: isPriorStep,
      isAfterStep: isAfterStep,
      isCurrentStep: isCurrentStep,
      canNavigateTo: canNavigateTo
    };
  }, [effectiveCurrentStep, focusedStepId, allSteps, direction, clickableSteps, onStepClick, updateFocusedStep, registerStepRef, showDescription, errorAnnouncement, stepIndex, isPriorStep, isAfterStep, isCurrentStep, canNavigateTo]);

  // Wraps around the step list to find the next step
  // in the given direction (+1 forward, -1 backward).
  var findNextStepId = (0, _react.useCallback)(function (delta) {
    var _flatSteps$nextIndex;
    if (!flatSteps.length) return undefined;
    var index = flatSteps.findIndex(function (step) {
      return step.id === focusedStepRef.current;
    });
    var startIndex = index >= 0 ? index : 0;
    var nextIndex = (startIndex + delta + flatSteps.length) % flatSteps.length;
    return (_flatSteps$nextIndex = flatSteps[nextIndex]) == null ? void 0 : _flatSteps$nextIndex.id;
  }, [flatSteps]);
  var moveFocus = (0, _react.useCallback)(function (nextStepId) {
    if (nextStepId && nextStepId !== focusedStepRef.current) {
      updateFocusedStep(nextStepId);
      var nextButton = stepRefs.current.get(nextStepId);
      if (nextButton) {
        nextButton.focus();
      }
    }
  }, [updateFocusedStep]);
  var onNext = (0, _react.useCallback)(function () {
    moveFocus(findNextStepId(1));
  }, [findNextStepId, moveFocus]);
  var onPrevious = (0, _react.useCallback)(function () {
    moveFocus(findNextStepId(-1));
  }, [findNextStepId, moveFocus]);
  var handleKeyDown = (0, _react.useCallback)(function (event) {
    var _flatSteps$, _flatSteps;
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
        moveFocus((_flatSteps$ = flatSteps[0]) == null ? void 0 : _flatSteps$.id);
        break;
      case 'End':
        event.preventDefault();
        moveFocus((_flatSteps = flatSteps[flatSteps.length - 1]) == null ? void 0 : _flatSteps.id);
        break;
      default:
        break;
    }
  }, [direction, onNext, onPrevious, flatSteps, moveFocus]);
  var renderDefaultSteps = function renderDefaultSteps() {
    var elements = [];
    steps.forEach(function (step) {
      var visibleChildren = revealedParents.has(step.id) || step.id === currentParentId ? step.children : undefined;
      var childElements = visibleChildren ? visibleChildren.map(function (child) {
        return /*#__PURE__*/_react["default"].createElement(_StepperStep.StepperStep, {
          key: child.id,
          stepId: child.id
        });
      }) : null;
      elements.push(/*#__PURE__*/_react["default"].createElement(_StepperStep.StepperStep, {
        key: step.id,
        stepId: step.id
      }, childElements));
    });
    return elements;
  };
  var stepperTheme = (0, _utils.resolveStepperTheme)(theme, direction);
  var stepperContent = /*#__PURE__*/_react["default"].createElement(_Box.Box, _extends({
    ref: ref,
    as: "ol",
    "aria-label": ariaLabel || format({
      id: 'stepper.progress'
    }),
    direction: direction === 'horizontal' ? 'row' : 'column',
    fill: direction
    // string gaps must still render as CSS gap, never spacer divs,
    // to keep the list's li-only children
    ,
    cssGap: true
    // avoiding letting the pad shrink for now
    ,
    responsive: false,
    id: id,
    overflow: "visible",
    pad: "none",
    margin: "none",
    style: {
      listStyle: 'none'
    }
  }, stepperTheme.container, rest), children || renderDefaultSteps());
  return /*#__PURE__*/_react["default"].createElement(_StepperContext.StepperContext.Provider, {
    value: contextValue
  }, clickableSteps ? /*#__PURE__*/_react["default"].createElement(_Keyboard.Keyboard, {
    onKeyDown: handleKeyDown
  }, stepperContent) : stepperContent);
});
Stepper.displayName = 'Stepper';
Stepper.propTypes = _propTypes.StepperPropTypes;