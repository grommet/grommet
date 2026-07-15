var _excluded = ["steps", "currentStep", "defaultStep", "direction", "kind", "onStepChange", "onComplete", "onCancel", "renderStep", "header", "footer", "scrollToTop", "value", "defaultValue", "onValueChange", "id", "aria-label", "a11yTitle", "messages", "children"];
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function _regenerator() { /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/babel/babel/blob/main/packages/babel-helpers/LICENSE */ var e, t, r = "function" == typeof Symbol ? Symbol : {}, n = r.iterator || "@@iterator", o = r.toStringTag || "@@toStringTag"; function i(r, n, o, i) { var c = n && n.prototype instanceof Generator ? n : Generator, u = Object.create(c.prototype); return _regeneratorDefine2(u, "_invoke", function (r, n, o) { var i, c, u, f = 0, p = o || [], y = !1, G = { p: 0, n: 0, v: e, a: d, f: d.bind(e, 4), d: function d(t, r) { return i = t, c = 0, u = e, G.n = r, a; } }; function d(r, n) { for (c = r, u = n, t = 0; !y && f && !o && t < p.length; t++) { var o, i = p[t], d = G.p, l = i[2]; r > 3 ? (o = l === n) && (u = i[(c = i[4]) ? 5 : (c = 3, 3)], i[4] = i[5] = e) : i[0] <= d && ((o = r < 2 && d < i[1]) ? (c = 0, G.v = n, G.n = i[1]) : d < l && (o = r < 3 || i[0] > n || n > l) && (i[4] = r, i[5] = n, G.n = l, c = 0)); } if (o || r > 1) return a; throw y = !0, n; } return function (o, p, l) { if (f > 1) throw TypeError("Generator is already running"); for (y && 1 === p && d(p, l), c = p, u = l; (t = c < 2 ? e : u) || !y;) { i || (c ? c < 3 ? (c > 1 && (G.n = -1), d(c, u)) : G.n = u : G.v = u); try { if (f = 2, i) { if (c || (o = "next"), t = i[o]) { if (!(t = t.call(i, u))) throw TypeError("iterator result is not an object"); if (!t.done) return t; u = t.value, c < 2 && (c = 0); } else 1 === c && (t = i["return"]) && t.call(i), c < 2 && (u = TypeError("The iterator does not provide a '" + o + "' method"), c = 1); i = e; } else if ((t = (y = G.n < 0) ? u : r.call(n, G)) !== a) break; } catch (t) { i = e, c = 1, u = t; } finally { f = 1; } } return { value: t, done: y }; }; }(r, o, i), !0), u; } var a = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} t = Object.getPrototypeOf; var c = [][n] ? t(t([][n]())) : (_regeneratorDefine2(t = {}, n, function () { return this; }), t), u = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(c); function f(e) { return Object.setPrototypeOf ? Object.setPrototypeOf(e, GeneratorFunctionPrototype) : (e.__proto__ = GeneratorFunctionPrototype, _regeneratorDefine2(e, o, "GeneratorFunction")), e.prototype = Object.create(u), e; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, _regeneratorDefine2(u, "constructor", GeneratorFunctionPrototype), _regeneratorDefine2(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = "GeneratorFunction", _regeneratorDefine2(GeneratorFunctionPrototype, o, "GeneratorFunction"), _regeneratorDefine2(u), _regeneratorDefine2(u, o, "Generator"), _regeneratorDefine2(u, n, function () { return this; }), _regeneratorDefine2(u, "toString", function () { return "[object Generator]"; }), (_regenerator = function _regenerator() { return { w: i, m: f }; })(); }
function _regeneratorDefine2(e, r, n, t) { var i = Object.defineProperty; try { i({}, "", {}); } catch (e) { i = 0; } _regeneratorDefine2 = function _regeneratorDefine(e, r, n, t) { function o(r, n) { _regeneratorDefine2(e, r, function (e) { return this._invoke(r, n, e); }); } r ? i ? i(e, r, { value: n, enumerable: !t, configurable: !t, writable: !t }) : e[r] = n : (o("next", 0), o("throw", 1), o("return", 2)); }, _regeneratorDefine2(e, r, n, t); }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
function _objectWithoutPropertiesLoose(r, e) { if (null == r) return {}; var t = {}; for (var n in r) if ({}.hasOwnProperty.call(r, n)) { if (-1 !== e.indexOf(n)) continue; t[n] = r[n]; } return t; }
function _createForOfIteratorHelperLoose(r, e) { var t = "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (t) return (t = t.call(r)).next.bind(t); if (Array.isArray(r) || (t = _unsupportedIterableToArray(r)) || e && r && "number" == typeof r.length) { t && (r = t); var o = 0; return function () { return o >= r.length ? { done: !0 } : { done: !1, value: r[o++] }; }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
import React, { forwardRef, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useAnalytics } from '../../contexts';
import { MessageContext } from '../../contexts/MessageContext';
import { ResponsiveContext } from '../../contexts/ResponsiveContext';
import { useForwardedRef } from '../../utils';
import { useThemeValue } from '../../utils/useThemeValue';
import { useLayoutEffect } from '../../utils/use-isomorphic-layout-effect';
import { Box } from '../Box';
import { WizardContext } from './WizardContext';
import { WizardHeader } from './WizardHeader';
import { WizardProgress } from './WizardProgress';
import { WizardStepHeader } from './WizardStepHeader';
import { WizardContent } from './WizardContent';
import { WizardFooter } from './WizardFooter';
import { StyledWizard, StyledWizardBody, StyledWizardCenter, StyledWizardContentColumn, StyledWizardFocusAnchor, StyledWizardMiddle } from './StyledWizard';
import { WizardPropTypes } from './propTypes';

// Flatten wizard step tree into an ordered list of leaves only. Parent
// steps with children are never nav targets; they are used only for
// aggregate status rendering in <WizardProgress>.
var flattenLeaves = function flattenLeaves(steps) {
  var leaves = [];
  steps.forEach(function (step) {
    if (step.children && step.children.length) {
      step.children.forEach(function (child) {
        return leaves.push(child);
      });
    } else {
      leaves.push(step);
    }
  });
  return leaves;
};

// Resolve a step object by id from either the tree or the leaf list.
var findStepById = function findStepById(steps, id) {
  // eslint-disable-next-line no-restricted-syntax
  for (var _iterator = _createForOfIteratorHelperLoose(steps), _step; !(_step = _iterator()).done;) {
    var step = _step.value;
    if (step.id === id) return step;
    if (step.children) {
      var match = step.children.find(function (child) {
        return child.id === id;
      });
      if (match) return match;
    }
  }
  return undefined;
};

// Find nearest scrollable ancestor. Used by scrollToTop when the wizard is
// inside a scrolling container smaller than the viewport.
var findScrollableAncestor = function findScrollableAncestor(node) {
  var element = node == null ? void 0 : node.parentElement;
  while (element && element !== document.body) {
    var _window$getComputedSt = window.getComputedStyle(element),
      overflowY = _window$getComputedSt.overflowY;
    if ((overflowY === 'auto' || overflowY === 'scroll') && element.scrollHeight > element.clientHeight) {
      return element;
    }
    element = element.parentElement;
  }
  return undefined;
};
var Wizard = /*#__PURE__*/forwardRef(function (_ref, ref) {
  var _theme$wizard, _theme$wizard2, _theme$wizard3;
  var steps = _ref.steps,
    currentStepProp = _ref.currentStep,
    defaultStep = _ref.defaultStep,
    _ref$direction = _ref.direction,
    direction = _ref$direction === void 0 ? 'horizontal' : _ref$direction,
    _ref$kind = _ref.kind,
    kind = _ref$kind === void 0 ? 'full' : _ref$kind,
    onStepChange = _ref.onStepChange,
    onComplete = _ref.onComplete,
    onCancel = _ref.onCancel,
    renderStep = _ref.renderStep,
    header = _ref.header,
    footer = _ref.footer,
    _ref$scrollToTop = _ref.scrollToTop,
    scrollToTop = _ref$scrollToTop === void 0 ? true : _ref$scrollToTop,
    valueProp = _ref.value,
    defaultValue = _ref.defaultValue,
    onValueChange = _ref.onValueChange,
    id = _ref.id,
    ariaLabel = _ref['aria-label'],
    a11yTitle = _ref.a11yTitle,
    messages = _ref.messages,
    children = _ref.children,
    rest = _objectWithoutPropertiesLoose(_ref, _excluded);
  var _useThemeValue = useThemeValue(),
    theme = _useThemeValue.theme,
    passThemeFlag = _useThemeValue.passThemeFlag;
  var _React$useContext = React.useContext(MessageContext),
    format = _React$useContext.format;
  var responsiveSize = React.useContext(ResponsiveContext);
  var sendAnalytics = useAnalytics();

  // Fallback horizontal direction when the caller asks for horizontal but
  // sub-steps are present. Stepper mirrors this rule; Wizard warns once.
  var hasSubSteps = steps.some(function (step) {
    return step.children && step.children.length > 0;
  });
  var effectiveDirection = hasSubSteps && direction === 'horizontal' ? 'vertical' : direction;

  // Wizard supports two levels only (step > child). Descendants beyond
  // the child level are ignored by `flattenLeaves` and `findStepById`.
  // Warn once in development so authors don't lose grandchildren silently.
  var hasDeepNesting = steps.some(function (step) {
    var _step$children;
    return (_step$children = step.children) == null ? void 0 : _step$children.some(function (child) {
      return child.children && child.children.length > 0;
    });
  });
  if (process.env.NODE_ENV !== 'production') {
    if (hasSubSteps && direction === 'horizontal') {
      console.warn('Wizard: horizontal direction with sub-steps is not supported. ' + 'Falling back to vertical.');
    }
    if (hasDeepNesting) {
      console.warn('Wizard: nesting deeper than one level (step > child) is not ' + 'supported. Descendants beyond the child level are ignored ' + 'by default.');
    }
  }
  var wizardRef = useForwardedRef(ref);
  var focusAnchorRef = useRef(null);
  var flatSteps = useMemo(function () {
    return flattenLeaves(steps);
  }, [steps]);
  var firstEnabled = flatSteps.find(function (step) {
    return !step.disabled;
  }) || flatSteps[0];
  var isControlled = currentStepProp !== undefined;
  var _useState = useState(defaultStep || (firstEnabled == null ? void 0 : firstEnabled.id)),
    uncontrolledStep = _useState[0],
    setUncontrolledStep = _useState[1];
  var currentStep = isControlled ? currentStepProp : uncontrolledStep;
  var isValueControlled = valueProp !== undefined;
  var _useState2 = useState(defaultValue || {}),
    uncontrolledValue = _useState2[0],
    setUncontrolledValue = _useState2[1];
  var formValue = isValueControlled ? valueProp : uncontrolledValue;
  var setFormValue = useCallback(function (nextValueOrFn) {
    var resolved = typeof nextValueOrFn === 'function' ? nextValueOrFn(formValue) : nextValueOrFn;
    if (!isValueControlled) setUncontrolledValue(resolved);
    if (onValueChange) onValueChange(resolved);
  }, [formValue, isValueControlled, onValueChange]);
  var _useState3 = useState([currentStep]),
    visitedSteps = _useState3[0],
    setVisitedSteps = _useState3[1];
  var _useState4 = useState(function () {
      return new Set();
    }),
    completedSteps = _useState4[0],
    setCompletedSteps = _useState4[1];
  var _useState5 = useState(undefined),
    validationError = _useState5[0],
    setValidationError = _useState5[1];
  var _useState6 = useState(false),
    isValidating = _useState6[0],
    setIsValidating = _useState6[1];
  // When no `onCancel` is provided, cancel self-closes the wizard.
  var _useState7 = useState(true),
    isOpen = _useState7[0],
    setIsOpen = _useState7[1];
  var hasCancelHandler = onCancel !== undefined;

  // Keep visited history synced when the current step is externally set.
  useEffect(function () {
    setVisitedSteps(function (prev) {
      return prev[prev.length - 1] === currentStep ? prev : [].concat(prev, [currentStep]);
    });
  }, [currentStep]);
  var currentStepObj = useMemo(function () {
    return findStepById(steps, currentStep);
  }, [steps, currentStep]);
  var currentStepIndex = useMemo(function () {
    return flatSteps.findIndex(function (step) {
      return step.id === currentStep;
    });
  }, [flatSteps, currentStep]);
  var totalSteps = flatSteps.length;
  var isFirstStep = currentStepIndex <= 0;
  var isLastStep = currentStepIndex >= totalSteps - 1;

  // getStepStatus derives status from wizard state. Parent steps aggregate
  // from their children so <WizardProgress> renders the right visual.
  var getStepStatus = useCallback(function (stepId) {
    // Parent-with-children aggregate
    var parent = steps.find(function (step) {
      return step.id === stepId && step.children && step.children.length;
    });
    if (parent) {
      var childStatuses = parent.children.map(function (child) {
        if (child.disabled) return 'disabled';
        if (child.id === currentStep && validationError) return 'error';
        if (completedSteps.has(child.id)) return 'completed';
        return 'pending';
      });
      if (childStatuses.some(function (status) {
        return status === 'error';
      })) return 'error';
      if (childStatuses.every(function (status) {
        return status === 'completed';
      })) return 'completed';
      if (childStatuses.every(function (status) {
        return status === 'disabled';
      })) return 'disabled';
      return 'pending';
    }
    var step = findStepById(steps, stepId);
    if (!step) return 'pending';
    if (step.disabled) return 'disabled';
    if (stepId === currentStep && validationError) return 'error';
    if (completedSteps.has(stepId)) return 'completed';
    return 'pending';
  }, [steps, currentStep, completedSteps, validationError]);

  // Emit a structured step change event. Consumers may swap steps or read
  // trigger/phase to drive analytics or logging without inspecting DOM.
  var emitStepChange = useCallback(function (event) {
    if (onStepChange) onStepChange(event);
  }, [onStepChange]);

  // Resolve the destination step id given the current step and a direction.
  // Honors step.nextStep(formValue) branching when defined.
  var resolveNextStepId = useCallback(function () {
    var _flatSteps$nextIndex;
    if (!currentStepObj) return undefined;
    if (typeof currentStepObj.nextStep === 'function') {
      var nextId = currentStepObj.nextStep(formValue);
      if (!nextId) return undefined;
      var match = findStepById(steps, nextId);
      if (!match) {
        if (process.env.NODE_ENV !== 'production') {
          console.warn("Wizard: nextStep(\"" + nextId + "\") does not match any step id. " + 'Staying on current step.');
        }
        return undefined;
      }
      return nextId;
    }
    var nextIndex = currentStepIndex + 1;
    return (_flatSteps$nextIndex = flatSteps[nextIndex]) == null ? void 0 : _flatSteps$nextIndex.id;
  }, [currentStepObj, currentStepIndex, flatSteps, formValue, steps]);

  // Apply a navigation transition (id change + history + completion + focus).
  var applyTransition = useCallback(function (nextId, _temp) {
    var _ref2 = _temp === void 0 ? {} : _temp,
      markCompleted = _ref2.markCompleted;
    if (!nextId) return;
    if (markCompleted && currentStep) {
      setCompletedSteps(function (prev) {
        var next = new Set(prev);
        next.add(currentStep);
        return next;
      });
    }
    setValidationError(undefined);
    setVisitedSteps(function (prev) {
      return [].concat(prev, [nextId]);
    });
    if (!isControlled) setUncontrolledStep(nextId);
  }, [currentStep, isControlled]);

  // Execute step.validate (sync or async). Returns { ok, error }.
  var runValidation = useCallback(/*#__PURE__*/_asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee() {
    var result, _t;
    return _regenerator().w(function (_context) {
      while (1) switch (_context.p = _context.n) {
        case 0:
          if (!(typeof (currentStepObj == null ? void 0 : currentStepObj.validate) !== 'function')) {
            _context.n = 1;
            break;
          }
          return _context.a(2, {
            ok: true
          });
        case 1:
          setIsValidating(true);
          _context.p = 2;
          _context.n = 3;
          return currentStepObj.validate(formValue);
        case 3:
          result = _context.v;
          setIsValidating(false);
          if (!(result === true || result === undefined)) {
            _context.n = 4;
            break;
          }
          return _context.a(2, {
            ok: true
          });
        case 4:
          if (!(result === false)) {
            _context.n = 5;
            break;
          }
          return _context.a(2, {
            ok: false,
            error: (messages == null ? void 0 : messages.validationError) || format({
              id: 'wizard.validationError'
            })
          });
        case 5:
          if (!(typeof result === 'string')) {
            _context.n = 6;
            break;
          }
          return _context.a(2, {
            ok: false,
            error: result
          });
        case 6:
          if (!(typeof result === 'object' && result.error)) {
            _context.n = 7;
            break;
          }
          return _context.a(2, {
            ok: false,
            error: result.error
          });
        case 7:
          return _context.a(2, {
            ok: true
          });
        case 8:
          _context.p = 8;
          _t = _context.v;
          setIsValidating(false);
          return _context.a(2, {
            ok: false,
            error: (_t == null ? void 0 : _t.message) || format({
              id: 'wizard.validationError'
            })
          });
      }
    }, _callee, null, [[2, 8]]);
  })), [currentStepObj, formValue, format, messages]);
  var next = useCallback(/*#__PURE__*/_asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee2() {
    var _yield$runValidation, ok, error, nextId;
    return _regenerator().w(function (_context2) {
      while (1) switch (_context2.n) {
        case 0:
          if (!isValidating) {
            _context2.n = 1;
            break;
          }
          return _context2.a(2);
        case 1:
          emitStepChange({
            trigger: 'next',
            phase: 'requested',
            from: currentStep
          });
          emitStepChange({
            trigger: 'next',
            phase: 'validating',
            from: currentStep
          });
          _context2.n = 2;
          return runValidation();
        case 2:
          _yield$runValidation = _context2.v;
          ok = _yield$runValidation.ok;
          error = _yield$runValidation.error;
          if (ok) {
            _context2.n = 3;
            break;
          }
          setValidationError(error);
          emitStepChange({
            trigger: 'next',
            phase: 'blocked',
            from: currentStep,
            error: error
          });
          return _context2.a(2);
        case 3:
          emitStepChange({
            trigger: 'next',
            phase: 'validated',
            from: currentStep
          });
          nextId = resolveNextStepId();
          if (nextId) {
            _context2.n = 4;
            break;
          }
          return _context2.a(2);
        case 4:
          applyTransition(nextId, {
            markCompleted: true
          });
          emitStepChange({
            trigger: 'next',
            phase: 'navigated',
            from: currentStep,
            to: nextId
          });
          if (sendAnalytics) sendAnalytics({
            type: 'wizardNext',
            element: 'Wizard'
          });
        case 5:
          return _context2.a(2);
      }
    }, _callee2);
  })), [sendAnalytics, applyTransition, currentStep, emitStepChange, isValidating, resolveNextStepId, runValidation]);
  var previous = useCallback(function () {
    var _flatSteps;
    // Use visited stack for history-aware previous. Falls back to the
    // linear predecessor when no history is available.
    var historyDest = visitedSteps.length > 1 ? visitedSteps[visitedSteps.length - 2] : undefined;
    var fallbackDest = (_flatSteps = flatSteps[currentStepIndex - 1]) == null ? void 0 : _flatSteps.id;
    var dest = historyDest || fallbackDest;
    if (!dest) return;
    setVisitedSteps(function (prev) {
      return prev.slice(0, -1);
    });
    setValidationError(undefined);
    if (!isControlled) setUncontrolledStep(dest);
    emitStepChange({
      trigger: 'previous',
      phase: 'navigated',
      from: currentStep,
      to: dest
    });
    if (sendAnalytics) sendAnalytics({
      type: 'wizardPrevious',
      element: 'Wizard'
    });
  }, [sendAnalytics, currentStep, currentStepIndex, emitStepChange, flatSteps, isControlled, visitedSteps]);
  var goTo = useCallback(/*#__PURE__*/function () {
    var _ref5 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee3(stepId) {
      var target, targetIndex, forward, _yield$runValidation2, ok, error;
      return _regenerator().w(function (_context3) {
        while (1) switch (_context3.n) {
          case 0:
            if (!(!stepId || stepId === currentStep)) {
              _context3.n = 1;
              break;
            }
            return _context3.a(2);
          case 1:
            target = findStepById(steps, stepId);
            if (!(!target || target.disabled)) {
              _context3.n = 2;
              break;
            }
            return _context3.a(2);
          case 2:
            targetIndex = flatSteps.findIndex(function (step) {
              return step.id === stepId;
            });
            forward = targetIndex > currentStepIndex;
            emitStepChange({
              trigger: 'goTo',
              phase: 'requested',
              from: currentStep,
              to: stepId
            });
            if (!forward) {
              _context3.n = 5;
              break;
            }
            emitStepChange({
              trigger: 'goTo',
              phase: 'validating',
              from: currentStep,
              to: stepId
            });
            _context3.n = 3;
            return runValidation();
          case 3:
            _yield$runValidation2 = _context3.v;
            ok = _yield$runValidation2.ok;
            error = _yield$runValidation2.error;
            if (ok) {
              _context3.n = 4;
              break;
            }
            setValidationError(error);
            emitStepChange({
              trigger: 'goTo',
              phase: 'blocked',
              from: currentStep,
              to: stepId,
              error: error
            });
            return _context3.a(2);
          case 4:
            emitStepChange({
              trigger: 'goTo',
              phase: 'validated',
              from: currentStep,
              to: stepId
            });
          case 5:
            applyTransition(stepId, {
              markCompleted: forward
            });
            emitStepChange({
              trigger: 'goTo',
              phase: 'navigated',
              from: currentStep,
              to: stepId
            });
          case 6:
            return _context3.a(2);
        }
      }, _callee3);
    }));
    return function (_x) {
      return _ref5.apply(this, arguments);
    };
  }(), [applyTransition, currentStep, currentStepIndex, emitStepChange, flatSteps, runValidation, steps]);
  var skip = useCallback(function () {
    if (!(currentStepObj != null && currentStepObj.skippable)) return;
    var nextId = resolveNextStepId();
    if (!nextId) return;
    // Skip does NOT validate and does NOT mark completed.
    setValidationError(undefined);
    setVisitedSteps(function (prev) {
      return [].concat(prev, [nextId]);
    });
    if (!isControlled) setUncontrolledStep(nextId);
    emitStepChange({
      trigger: 'skip',
      phase: 'navigated',
      from: currentStep,
      to: nextId
    });
    if (sendAnalytics) sendAnalytics({
      type: 'wizardSkip',
      element: 'Wizard'
    });
  }, [sendAnalytics, currentStep, currentStepObj, emitStepChange, isControlled, resolveNextStepId]);
  var complete = useCallback(/*#__PURE__*/_asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee4() {
    var _yield$runValidation3, ok, error;
    return _regenerator().w(function (_context4) {
      while (1) switch (_context4.n) {
        case 0:
          if (!isValidating) {
            _context4.n = 1;
            break;
          }
          return _context4.a(2);
        case 1:
          emitStepChange({
            trigger: 'complete',
            phase: 'requested',
            from: currentStep
          });
          emitStepChange({
            trigger: 'complete',
            phase: 'validating',
            from: currentStep
          });
          _context4.n = 2;
          return runValidation();
        case 2:
          _yield$runValidation3 = _context4.v;
          ok = _yield$runValidation3.ok;
          error = _yield$runValidation3.error;
          if (ok) {
            _context4.n = 3;
            break;
          }
          setValidationError(error);
          emitStepChange({
            trigger: 'complete',
            phase: 'blocked',
            from: currentStep,
            error: error
          });
          return _context4.a(2);
        case 3:
          emitStepChange({
            trigger: 'complete',
            phase: 'validated',
            from: currentStep
          });
          setCompletedSteps(function (prev) {
            var nextCompleted = new Set(prev);
            nextCompleted.add(currentStep);
            return nextCompleted;
          });
          // Emit 'completed' synchronously BEFORE onComplete callback.
          emitStepChange({
            trigger: 'complete',
            phase: 'completed',
            from: currentStep
          });
          if (onComplete) onComplete(formValue);
          if (sendAnalytics) sendAnalytics({
            type: 'wizardComplete',
            element: 'Wizard'
          });
        case 4:
          return _context4.a(2);
      }
    }, _callee4);
  })), [sendAnalytics, currentStep, emitStepChange, formValue, isValidating, onComplete, runValidation]);
  var cancel = useCallback(function () {
    emitStepChange({
      trigger: 'cancel',
      phase: 'cancelled',
      from: currentStep
    });
    if (onCancel) {
      onCancel(formValue);
    } else {
      // Self-close; remount requires the parent to change `key`.
      setIsOpen(false);
    }
    if (sendAnalytics) sendAnalytics({
      type: 'wizardCancel',
      element: 'Wizard'
    });
  }, [sendAnalytics, currentStep, emitStepChange, formValue, onCancel]);

  // Scroll to top on step transition. Container-first: scroll the wizard
  // container into view, then the nearest scrollable ancestor, then window.
  useLayoutEffect(function () {
    if (!scrollToTop) return;
    // Focus the anchor first so screen readers announce the new step.
    if (focusAnchorRef.current) {
      focusAnchorRef.current.focus({
        preventScroll: true
      });
    }
    var safeScrollTo = function safeScrollTo(target) {
      if (!target || typeof target.scrollTo !== 'function') return;
      try {
        target.scrollTo({
          top: 0,
          behavior: 'auto'
        });
      } catch (_unused) {
        // Some environments (jsdom) throw on scrollTo. Ignore.
      }
    };
    var container = wizardRef.current;
    safeScrollTo(container);
    safeScrollTo(findScrollableAncestor(container));
    if (typeof window !== 'undefined') safeScrollTo(window);
  }, [currentStep, scrollToTop, wizardRef]);
  var canGoNext = !(currentStepObj != null && currentStepObj.disabled) && !isValidating;
  var canGoPrevious = !isFirstStep;
  var contextValue = useMemo(function () {
    return {
      steps: steps,
      flatSteps: flatSteps,
      currentStep: currentStep,
      currentStepIndex: currentStepIndex,
      currentStepObj: currentStepObj,
      totalSteps: totalSteps,
      completedSteps: completedSteps,
      visitedSteps: visitedSteps,
      formValue: formValue,
      setFormValue: setFormValue,
      validationError: validationError,
      isFirstStep: isFirstStep,
      isLastStep: isLastStep,
      canGoNext: canGoNext,
      canGoPrevious: canGoPrevious,
      next: next,
      previous: previous,
      goTo: goTo,
      skip: skip,
      complete: complete,
      cancel: cancel,
      hasCancelHandler: hasCancelHandler,
      getStepStatus: getStepStatus,
      direction: effectiveDirection,
      messages: messages
    };
  }, [steps, flatSteps, currentStep, currentStepIndex, currentStepObj, totalSteps, completedSteps, visitedSteps, formValue, setFormValue, validationError, isFirstStep, isLastStep, canGoNext, canGoPrevious, next, previous, goTo, skip, complete, cancel, hasCancelHandler, getStepStatus, effectiveDirection, messages]);

  // Default composition when no children are provided.
  var footerNode;
  if (typeof footer === 'function') {
    footerNode = footer({
      next: next,
      previous: previous,
      goTo: goTo,
      skip: skip,
      complete: complete,
      cancel: cancel,
      currentStep: currentStep,
      currentStepObj: currentStepObj,
      isFirstStep: isFirstStep,
      isLastStep: isLastStep
    });
  } else if (footer !== undefined) {
    footerNode = footer;
  } else {
    footerNode = /*#__PURE__*/React.createElement(WizardFooter, null);
  }
  var containerTheme = (_theme$wizard = theme.wizard) == null ? void 0 : _theme$wizard.container;
  var bodyTheme = (_theme$wizard2 = theme.wizard) == null ? void 0 : _theme$wizard2.body;
  var kindTheme = (_theme$wizard3 = theme.wizard) == null || (_theme$wizard3 = _theme$wizard3.kind) == null ? void 0 : _theme$wizard3[kind];

  // Default composition. Header and footer are direct children of the
  // wizard column so they naturally stay pinned at the top and bottom
  // of a bounded parent. The middle region is a non-scrolling flex
  // container; scrolling happens inside <WizardContent> (the white
  // card) so the stepper and step title also stay in place while
  // just the card's body scrolls. The `kind` max-width is applied to
  // `StyledWizardCenter` inside the middle so header and footer
  // always span the full wizard width even when the content column
  // is narrowed. Header always renders to host the close (X) button.
  var defaultLayout = /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(WizardHeader, {
    header: header
  }), /*#__PURE__*/React.createElement(StyledWizardMiddle, passThemeFlag, /*#__PURE__*/React.createElement(StyledWizardCenter, _extends({
    maxWidth: kindTheme == null ? void 0 : kindTheme.maxWidth
  }, passThemeFlag), /*#__PURE__*/React.createElement(Box, {
    pad: bodyTheme == null ? void 0 : bodyTheme.pad,
    gap: bodyTheme == null ? void 0 : bodyTheme.gap
    // `flex` (1 1 auto) so this wrapper shrinks and lets
    // <WizardContent>'s `overflow: auto` engage.
    ,
    flex: true,
    style: {
      minHeight: 0
    }
  }, effectiveDirection === 'horizontal' && responsiveSize !== 'small' && /*#__PURE__*/React.createElement(WizardProgress, null), /*#__PURE__*/React.createElement(StyledWizardBody, {
    direction: effectiveDirection
  }, effectiveDirection === 'vertical' && responsiveSize !== 'small' && /*#__PURE__*/React.createElement(WizardProgress, null), /*#__PURE__*/React.createElement(StyledWizardContentColumn, null, /*#__PURE__*/React.createElement(StyledWizardFocusAnchor, {
    ref: focusAnchorRef,
    tabIndex: -1,
    "aria-live": "polite"
  }, /*#__PURE__*/React.createElement(WizardStepHeader, null)), /*#__PURE__*/React.createElement(WizardContent, {
    renderStep: renderStep
  })))))), footerNode);
  if (!isOpen) return null;
  return /*#__PURE__*/React.createElement(WizardContext.Provider, {
    value: contextValue
  }, /*#__PURE__*/React.createElement(StyledWizard, _extends({
    ref: wizardRef,
    id: id,
    "aria-label": ariaLabel || a11yTitle,
    role: "region"
  }, passThemeFlag, rest), children || /*#__PURE__*/React.createElement(Box, {
    background: containerTheme == null ? void 0 : containerTheme.background,
    pad: containerTheme == null ? void 0 : containerTheme.pad,
    gap: containerTheme == null ? void 0 : containerTheme.gap,
    round: containerTheme == null ? void 0 : containerTheme.round,
    elevation: containerTheme == null ? void 0 : containerTheme.elevation
    // `flex` (1 1 auto) + `minHeight: 0` so the middle region
    // shrinks and <WizardContent> scrolls internally.
    ,
    flex: true,
    style: {
      minHeight: 0
    }
  }, defaultLayout)));
});
Wizard.displayName = 'Wizard';
Wizard.propTypes = WizardPropTypes;
export { Wizard };