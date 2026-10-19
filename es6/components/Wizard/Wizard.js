var _excluded = ["children"],
  _excluded2 = ["steps", "clickableSteps", "closable", "currentStep", "defaultStep", "form", "showProgress", "onStepChange", "onComplete", "onCancel", "renderStep", "title", "footer", "scrollToTop", "value", "defaultValue", "onChange", "id", "aria-label", "messages", "children"];
function _regenerator() { /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/babel/babel/blob/main/packages/babel-helpers/LICENSE */ var e, t, r = "function" == typeof Symbol ? Symbol : {}, n = r.iterator || "@@iterator", o = r.toStringTag || "@@toStringTag"; function i(r, n, o, i) { var c = n && n.prototype instanceof Generator ? n : Generator, u = Object.create(c.prototype); return _regeneratorDefine2(u, "_invoke", function (r, n, o) { var i, c, u, f = 0, p = o || [], y = !1, G = { p: 0, n: 0, v: e, a: d, f: d.bind(e, 4), d: function d(t, r) { return i = t, c = 0, u = e, G.n = r, a; } }; function d(r, n) { for (c = r, u = n, t = 0; !y && f && !o && t < p.length; t++) { var o, i = p[t], d = G.p, l = i[2]; r > 3 ? (o = l === n) && (u = i[(c = i[4]) ? 5 : (c = 3, 3)], i[4] = i[5] = e) : i[0] <= d && ((o = r < 2 && d < i[1]) ? (c = 0, G.v = n, G.n = i[1]) : d < l && (o = r < 3 || i[0] > n || n > l) && (i[4] = r, i[5] = n, G.n = l, c = 0)); } if (o || r > 1) return a; throw y = !0, n; } return function (o, p, l) { if (f > 1) throw TypeError("Generator is already running"); for (y && 1 === p && d(p, l), c = p, u = l; (t = c < 2 ? e : u) || !y;) { i || (c ? c < 3 ? (c > 1 && (G.n = -1), d(c, u)) : G.n = u : G.v = u); try { if (f = 2, i) { if (c || (o = "next"), t = i[o]) { if (!(t = t.call(i, u))) throw TypeError("iterator result is not an object"); if (!t.done) return t; u = t.value, c < 2 && (c = 0); } else 1 === c && (t = i["return"]) && t.call(i), c < 2 && (u = TypeError("The iterator does not provide a '" + o + "' method"), c = 1); i = e; } else if ((t = (y = G.n < 0) ? u : r.call(n, G)) !== a) break; } catch (t) { i = e, c = 1, u = t; } finally { f = 1; } } return { value: t, done: y }; }; }(r, o, i), !0), u; } var a = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} t = Object.getPrototypeOf; var c = [][n] ? t(t([][n]())) : (_regeneratorDefine2(t = {}, n, function () { return this; }), t), u = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(c); function f(e) { return Object.setPrototypeOf ? Object.setPrototypeOf(e, GeneratorFunctionPrototype) : (e.__proto__ = GeneratorFunctionPrototype, _regeneratorDefine2(e, o, "GeneratorFunction")), e.prototype = Object.create(u), e; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, _regeneratorDefine2(u, "constructor", GeneratorFunctionPrototype), _regeneratorDefine2(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = "GeneratorFunction", _regeneratorDefine2(GeneratorFunctionPrototype, o, "GeneratorFunction"), _regeneratorDefine2(u), _regeneratorDefine2(u, o, "Generator"), _regeneratorDefine2(u, n, function () { return this; }), _regeneratorDefine2(u, "toString", function () { return "[object Generator]"; }), (_regenerator = function _regenerator() { return { w: i, m: f }; })(); }
function _regeneratorDefine2(e, r, n, t) { var i = Object.defineProperty; try { i({}, "", {}); } catch (e) { i = 0; } _regeneratorDefine2 = function _regeneratorDefine(e, r, n, t) { function o(r, n) { _regeneratorDefine2(e, r, function (e) { return this._invoke(r, n, e); }); } r ? i ? i(e, r, { value: n, enumerable: !t, configurable: !t, writable: !t }) : e[r] = n : (o("next", 0), o("throw", 1), o("return", 2)); }, _regeneratorDefine2(e, r, n, t); }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function _objectWithoutPropertiesLoose(r, e) { if (null == r) return {}; var t = {}; for (var n in r) if ({}.hasOwnProperty.call(r, n)) { if (-1 !== e.indexOf(n)) continue; t[n] = r[n]; } return t; }
function _createForOfIteratorHelperLoose(r, e) { var t = "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (t) return (t = t.call(r)).next.bind(t); if (Array.isArray(r) || (t = _unsupportedIterableToArray(r)) || e && r && "number" == typeof r.length) { t && (r = t); var o = 0; return function () { return o >= r.length ? { done: !0 } : { done: !1, value: r[o++] }; }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
// SPDX-FileCopyrightText: © Hewlett Packard Enterprise Development LP
// SPDX-License-Identifier: Apache-2.0
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
import { WizardPropTypes } from './propTypes';

// Flatten step tree into ordered leaves; parents with children are
// aggregate-only, never nav targets.
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

// Find step by id in the tree or leaf list.
var _findStepById = function findStepById(steps, id) {
  // eslint-disable-next-line no-restricted-syntax
  for (var _iterator = _createForOfIteratorHelperLoose(steps), _step; !(_step = _iterator()).done;) {
    var step = _step.value;
    if (step.id === id) return step;
    if (step.children) {
      var match = _findStepById(step.children, id);
      if (match) return match;
    }
  }
  return undefined;
};
var formHasErrors = function formHasErrors(result) {
  var _result$form, _result$form2;
  return (result == null || (_result$form = result.form) == null ? void 0 : _result$form.ok) === false || Object.keys((result == null || (_result$form2 = result.form) == null ? void 0 : _result$form2.errors) || {}).length > 0;
};
var statusFromStep = function statusFromStep(step, validation, completed) {
  var _validation$step$id;
  if (!step) return 'pending';
  if (step.disabled) return 'disabled';
  if (step.status) return step.status;
  if (formHasErrors(validation[step.id]) || ((_validation$step$id = validation[step.id]) == null || (_validation$step$id = _validation$step$id.callback) == null ? void 0 : _validation$step$id.ok) === false) return 'error';
  if (completed.has(step.id)) return 'completed';
  return 'pending';
};
var getStepStatus = function getStepStatus(step, validation, completed) {
  var _step$children;
  if (step != null && step.disabled || step != null && step.status || !(step != null && (_step$children = step.children) != null && _step$children.length)) return statusFromStep(step, validation, completed);
  var childStatuses = step.children.map(function (child) {
    return statusFromStep(child, validation, completed);
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
};
var filterCompletedSteps = function filterCompletedSteps(steps, validation, completed) {
  var remaining = Array.from(completed).filter(function (stepId) {
    var step = _findStepById(steps, stepId);
    return step && getStepStatus(step, validation, completed) !== 'error';
  });
  return remaining.length === completed.size ? completed : new Set(remaining);
};
var resolveStepResults = function resolveStepResults(steps, validation, completed) {
  var results = [];
  var _walk = function walk(nodes) {
    return nodes.forEach(function (step) {
      var _step$errorMessage, _validation$step$id2;
      var childSteps = step.children,
        details = _objectWithoutPropertiesLoose(step, _excluded);
      var status = getStepStatus(step, validation, completed);
      var errorMessage = status === 'error' ? (_step$errorMessage = step.errorMessage) != null ? _step$errorMessage : formHasErrors(validation[step.id]) ? undefined : (_validation$step$id2 = validation[step.id]) == null || (_validation$step$id2 = _validation$step$id2.callback) == null ? void 0 : _validation$step$id2.error : undefined;
      results.push(_extends({}, details, {
        status: status,
        errorMessage: errorMessage
      }));
      if (childSteps != null && childSteps.length) _walk(childSteps);
    });
  };
  _walk(steps);
  return results;
};

// Nearest scrollable ancestor for scrollToTop.
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
  var _currentValidation$ca, _currentValidation$fo, _currentValidation$ca2;
  var steps = _ref.steps,
    _ref$clickableSteps = _ref.clickableSteps,
    clickableSteps = _ref$clickableSteps === void 0 ? false : _ref$clickableSteps,
    _ref$closable = _ref.closable,
    closable = _ref$closable === void 0 ? true : _ref$closable,
    currentStepProp = _ref.currentStep,
    defaultStep = _ref.defaultStep,
    _ref$form = _ref.form,
    form = _ref$form === void 0 ? true : _ref$form,
    _ref$showProgress = _ref.showProgress,
    showProgress = _ref$showProgress === void 0 ? false : _ref$showProgress,
    onStepChange = _ref.onStepChange,
    onComplete = _ref.onComplete,
    onCancel = _ref.onCancel,
    renderStep = _ref.renderStep,
    title = _ref.title,
    footer = _ref.footer,
    _ref$scrollToTop = _ref.scrollToTop,
    scrollToTop = _ref$scrollToTop === void 0 ? true : _ref$scrollToTop,
    valueProp = _ref.value,
    defaultValue = _ref.defaultValue,
    onChange = _ref.onChange,
    id = _ref.id,
    ariaLabel = _ref['aria-label'],
    messages = _ref.messages,
    children = _ref.children,
    rest = _objectWithoutPropertiesLoose(_ref, _excluded2);
  var _useThemeValue = useThemeValue(),
    theme = _useThemeValue.theme;
  var _React$useContext = React.useContext(MessageContext),
    format = _React$useContext.format;
  var responsiveSize = React.useContext(ResponsiveContext);
  var sendAnalytics = useAnalytics();

  // Horizontal progress + sub-steps: fall back to vertical.
  var hasSubSteps = steps.some(function (step) {
    return step.children && step.children.length > 0;
  });
  var effectiveShowProgress = hasSubSteps && showProgress === 'horizontal' ? 'vertical' : showProgress;

  // Only two levels supported (step > child); warn on deeper nesting.
  var hasDeepNesting = steps.some(function (step) {
    var _step$children2;
    return (_step$children2 = step.children) == null ? void 0 : _step$children2.some(function (child) {
      return child.children && child.children.length > 0;
    });
  });
  useEffect(function () {
    if (process.env.NODE_ENV !== 'production') {
      console.warn('Warning: Wizard is currently in beta. The API is subject ' + 'to change in future releases.');
    }
  }, []);
  if (process.env.NODE_ENV !== 'production') {
    if (hasSubSteps && showProgress === 'horizontal') {
      console.warn('Wizard: horizontal showProgress with sub-steps is not supported. ' + 'Falling back to vertical.');
    }
    if (hasDeepNesting) {
      console.warn('Wizard: nesting deeper than one level (step > child) is not ' + 'supported. Descendants beyond the child level are ignored ' + 'by default.');
    }
  }
  var wizardRef = useForwardedRef(ref);
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
  var latest = useRef({
    currentStep: currentStep,
    steps: steps
  });
  latest.current = {
    currentStep: currentStep,
    steps: steps
  };
  var mounted = useRef(false);
  var navigationVersion = useRef(0);
  var validationInFlight = useRef();
  var formValidators = useRef(new Map());
  useLayoutEffect(function () {
    mounted.current = true;
    return function () {
      mounted.current = false;
    };
  }, []);
  useLayoutEffect(function () {
    navigationVersion.current += 1;
  }, [currentStep]);
  var registerForm = useCallback(function (stepId, validateForm) {
    formValidators.current.set(stepId, validateForm);
    return function () {
      if (formValidators.current.get(stepId) === validateForm) formValidators.current["delete"](stepId);
    };
  }, []);
  var isValueControlled = valueProp !== undefined;
  var _useState2 = useState(defaultValue || {}),
    uncontrolledValue = _useState2[0],
    setUncontrolledValue = _useState2[1];
  var formValue = isValueControlled ? valueProp : uncontrolledValue;
  var setFormValue = useCallback(function (nextValueOrFn) {
    var resolved = typeof nextValueOrFn === 'function' ? nextValueOrFn(formValue) : nextValueOrFn;
    if (!isValueControlled) setUncontrolledValue(resolved);
    if (onChange) onChange({
      value: resolved
    });
  }, [formValue, isValueControlled, onChange]);
  var _useState3 = useState(function () {
      return new Set();
    }),
    completedSteps = _useState3[0],
    setCompletedSteps = _useState3[1];
  var stepValidationRef = useRef({});
  var _useState4 = useState(stepValidationRef.current),
    stepValidation = _useState4[0],
    setStepValidation = _useState4[1];
  var updateValidation = useCallback(function (stepId, source, result) {
    var _extends2, _extends3;
    if (!mounted.current || !_findStepById(latest.current.steps, stepId)) return;
    var nextResults = _extends({}, stepValidationRef.current, (_extends3 = {}, _extends3[stepId] = _extends({}, stepValidationRef.current[stepId], (_extends2 = {}, _extends2[source] = result, _extends2)), _extends3));
    stepValidationRef.current = nextResults;
    setStepValidation(nextResults);
    if (result.ok === false) {
      setCompletedSteps(function (previousCompleted) {
        if (!previousCompleted.has(stepId)) return previousCompleted;
        var nextCompleted = new Set(previousCompleted);
        nextCompleted["delete"](stepId);
        return nextCompleted;
      });
    }
  }, []);
  var currentValidation = stepValidation[currentStep];
  var validationError = !formHasErrors(currentValidation) && (currentValidation == null || (_currentValidation$ca = currentValidation.callback) == null ? void 0 : _currentValidation$ca.ok) === false ? currentValidation.callback.error : undefined;
  var _useState5 = useState(false),
    isValidating = _useState5[0],
    setIsValidating = _useState5[1];
  // Without `onCancel`, cancel self-closes the wizard.
  var _useState6 = useState(true),
    isOpen = _useState6[0],
    setIsOpen = _useState6[1];
  var hasCancelHandler = onCancel !== undefined;
  useEffect(function () {
    if (validationInFlight.current && !_findStepById(steps, validationInFlight.current.stepId)) validationInFlight.current.removed = true;
    var entries = Object.entries(stepValidationRef.current).filter(function (_ref2) {
      var stepId = _ref2[0];
      return _findStepById(steps, stepId);
    });
    if (entries.length !== Object.keys(stepValidationRef.current).length) {
      stepValidationRef.current = Object.fromEntries(entries);
      setStepValidation(stepValidationRef.current);
    }
    setCompletedSteps(function (previousCompleted) {
      return filterCompletedSteps(steps, stepValidationRef.current, previousCompleted);
    });
  }, [steps]);
  var currentStepObj = useMemo(function () {
    return _findStepById(steps, currentStep);
  }, [steps, currentStep]);
  var currentStepIndex = useMemo(function () {
    return flatSteps.findIndex(function (step) {
      return step.id === currentStep;
    });
  }, [flatSteps, currentStep]);
  var totalSteps = flatSteps.length;
  var stepResults = useMemo(function () {
    return resolveStepResults(steps, stepValidation, completedSteps);
  }, [steps, stepValidation, completedSteps]);

  // Record<id, status> for every step (top-level + children).
  var stepStates = useMemo(function () {
    return Object.fromEntries(stepResults.map(function (step) {
      return [step.id, step.status];
    }));
  }, [stepResults]);
  var stepErrorMessages = useMemo(function () {
    return Object.fromEntries(stepResults.map(function (step) {
      return [step.id, step.errorMessage];
    }));
  }, [stepResults]);

  // Emit a step change event to onStepChange.
  var emitStepChange = useCallback(function (event) {
    if (onStepChange) onStepChange(event);
  }, [onStepChange]);

  // Resolve next step id, honoring step.nextStep(formValue) branching.
  var resolveNextStepId = useCallback(function () {
    if (!currentStepObj) return undefined;
    if (typeof currentStepObj.nextStep === 'function') {
      var nextId = currentStepObj.nextStep(formValue);
      if (!nextId) return undefined;
      var match = _findStepById(steps, nextId);
      if (!match) {
        if (process.env.NODE_ENV !== 'production') {
          console.warn("Wizard: nextStep(\"" + nextId + "\") does not match any step id. " + 'Staying on current step.');
        }
        return undefined;
      }
      return !match.disabled ? nextId : undefined;
    }
    var nextIndex = currentStepIndex + 1;
    while (nextIndex < flatSteps.length) {
      var nextStep = flatSteps[nextIndex];
      if (!(nextStep != null && nextStep.disabled)) return nextStep.id;
      if (nextStep != null && nextStep.disabled && (clickableSteps || nextStep != null && nextStep.skippable)) {
        nextIndex += 1;
      } else {
        return undefined;
      }
    }
    return undefined;
  }, [clickableSteps, currentStepObj, currentStepIndex, flatSteps, formValue, steps]);
  var resolvePreviousStepId = useCallback(function () {
    var prevIndex = currentStepIndex - 1;
    while (prevIndex >= 0) {
      var prevStep = flatSteps[prevIndex];
      if (!(prevStep != null && prevStep.disabled)) return prevStep.id;
      prevIndex -= 1;
    }
    return undefined;
  }, [currentStepIndex, flatSteps]);

  // Apply a navigation transition (id, history, completion, focus).
  var applyTransition = useCallback(function (nextId, _temp) {
    var _ref3 = _temp === void 0 ? {} : _temp,
      markCompleted = _ref3.markCompleted;
    if (!nextId) return;
    navigationVersion.current += 1;
    if (markCompleted && currentStep) {
      setCompletedSteps(function (prev) {
        var next = new Set(prev);
        next.add(currentStep);
        return filterCompletedSteps(latest.current.steps, stepValidationRef.current, next);
      });
    }
    if (!isControlled) setUncontrolledStep(nextId);
  }, [currentStep, isControlled]);

  // Run step.validate (sync or async). Returns { ok, error }.
  var runStepValidation = useCallback(/*#__PURE__*/_asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee() {
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
          _context.p = 1;
          _context.n = 2;
          return currentStepObj.validate(formValue);
        case 2:
          result = _context.v;
          if (!(result === true || result === undefined)) {
            _context.n = 3;
            break;
          }
          return _context.a(2, {
            ok: true
          });
        case 3:
          if (!(result === false)) {
            _context.n = 4;
            break;
          }
          return _context.a(2, {
            ok: false,
            error: format({
              id: 'wizard.validationError',
              messages: messages
            })
          });
        case 4:
          if (!(typeof result === 'string')) {
            _context.n = 5;
            break;
          }
          return _context.a(2, {
            ok: false,
            error: result
          });
        case 5:
          if (!(result && typeof result === 'object' && result.error)) {
            _context.n = 6;
            break;
          }
          return _context.a(2, {
            ok: false,
            error: result.error
          });
        case 6:
          return _context.a(2, {
            ok: true
          });
        case 7:
          _context.p = 7;
          _t = _context.v;
          return _context.a(2, {
            ok: false,
            error: (_t == null ? void 0 : _t.message) || format({
              id: 'wizard.validationError',
              messages: messages
            })
          });
      }
    }, _callee, null, [[1, 7]]);
  })), [currentStepObj, formValue, format, messages]);
  var runValidation = useCallback(/*#__PURE__*/_asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee2() {
    var attempt, isStale, validateForm, _result, result;
    return _regenerator().w(function (_context2) {
      while (1) switch (_context2.p = _context2.n) {
        case 0:
          if (!validationInFlight.current) {
            _context2.n = 1;
            break;
          }
          return _context2.a(2, {
            cancelled: true
          });
        case 1:
          attempt = {
            stepId: currentStep,
            version: navigationVersion.current
          };
          validationInFlight.current = attempt;
          setIsValidating(true);
          isStale = function isStale() {
            return !mounted.current || attempt.removed || latest.current.currentStep !== attempt.stepId || navigationVersion.current !== attempt.version || !_findStepById(latest.current.steps, attempt.stepId);
          };
          _context2.p = 2;
          validateForm = form && formValidators.current.get(currentStep);
          if (!validateForm) {
            _context2.n = 6;
            break;
          }
          _context2.n = 3;
          return validateForm();
        case 3:
          _result = _context2.v;
          if (!_result.cancelled) {
            _context2.n = 4;
            break;
          }
          return _context2.a(2, {
            cancelled: true
          });
        case 4:
          if (_result.ok) {
            _context2.n = 5;
            break;
          }
          return _context2.a(2, {
            ok: false,
            cancelled: isStale()
          });
        case 5:
          if (!isStale()) {
            _context2.n = 6;
            break;
          }
          return _context2.a(2, {
            cancelled: true
          });
        case 6:
          _context2.n = 7;
          return runStepValidation();
        case 7:
          result = _context2.v;
          if (!attempt.removed) updateValidation(attempt.stepId, 'callback', result);
          return _context2.a(2, _extends({}, result, {
            cancelled: isStale()
          }));
        case 8:
          _context2.p = 8;
          validationInFlight.current = undefined;
          if (mounted.current) setIsValidating(false);
          return _context2.f(8);
        case 9:
          return _context2.a(2);
      }
    }, _callee2, null, [[2,, 8, 9]]);
  })), [currentStep, form, runStepValidation, updateValidation]);
  var next = useCallback(/*#__PURE__*/_asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee3() {
    var _yield$runValidation, ok, error, cancelled, sourceStep, nextId;
    return _regenerator().w(function (_context3) {
      while (1) switch (_context3.n) {
        case 0:
          if (!(validationInFlight.current || currentStepObj != null && currentStepObj.disabled)) {
            _context3.n = 1;
            break;
          }
          return _context3.a(2);
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
          _context3.n = 2;
          return runValidation();
        case 2:
          _yield$runValidation = _context3.v;
          ok = _yield$runValidation.ok;
          error = _yield$runValidation.error;
          cancelled = _yield$runValidation.cancelled;
          if (!cancelled) {
            _context3.n = 3;
            break;
          }
          return _context3.a(2);
        case 3:
          sourceStep = _findStepById(latest.current.steps, currentStep);
          if (!(!ok || (sourceStep == null ? void 0 : sourceStep.status) === 'error')) {
            _context3.n = 4;
            break;
          }
          emitStepChange({
            trigger: 'next',
            phase: 'blocked',
            from: currentStep,
            error: error != null ? error : sourceStep == null ? void 0 : sourceStep.errorMessage
          });
          return _context3.a(2);
        case 4:
          emitStepChange({
            trigger: 'next',
            phase: 'validated',
            from: currentStep
          });
          nextId = resolveNextStepId();
          if (nextId) {
            _context3.n = 5;
            break;
          }
          return _context3.a(2);
        case 5:
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
        case 6:
          return _context3.a(2);
      }
    }, _callee3);
  })), [sendAnalytics, applyTransition, currentStep, currentStepObj, emitStepChange, resolveNextStepId, runValidation]);
  var previous = useCallback(function () {
    var dest = resolvePreviousStepId();
    if (!dest) return;
    navigationVersion.current += 1;
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
  }, [sendAnalytics, currentStep, resolvePreviousStepId, emitStepChange, isControlled]);
  var goTo = useCallback(/*#__PURE__*/function () {
    var _ref7 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee4(stepId) {
      var target, targetIndex, forward, markCompleted, navigationError, _yield$runValidation2, ok, error, cancelled;
      return _regenerator().w(function (_context4) {
        while (1) switch (_context4.n) {
          case 0:
            if (!(!stepId || stepId === currentStep)) {
              _context4.n = 1;
              break;
            }
            return _context4.a(2);
          case 1:
            target = _findStepById(steps, stepId);
            if (!(!target || target.disabled)) {
              _context4.n = 2;
              break;
            }
            return _context4.a(2);
          case 2:
            targetIndex = flatSteps.findIndex(function (step) {
              return step.id === stepId;
            });
            if (!(targetIndex < 0)) {
              _context4.n = 3;
              break;
            }
            return _context4.a(2);
          case 3:
            forward = targetIndex > currentStepIndex;
            markCompleted = false;
            if (!(forward && validationInFlight.current)) {
              _context4.n = 4;
              break;
            }
            return _context4.a(2);
          case 4:
            emitStepChange({
              trigger: 'goTo',
              phase: 'requested',
              from: currentStep,
              to: stepId
            });
            if (!forward) {
              _context4.n = 8;
              break;
            }
            emitStepChange({
              trigger: 'goTo',
              phase: 'validating',
              from: currentStep,
              to: stepId
            });
            _context4.n = 5;
            return runValidation();
          case 5:
            _yield$runValidation2 = _context4.v;
            ok = _yield$runValidation2.ok;
            error = _yield$runValidation2.error;
            cancelled = _yield$runValidation2.cancelled;
            if (!cancelled) {
              _context4.n = 6;
              break;
            }
            return _context4.a(2);
          case 6:
            if (!(!ok && !(currentStepObj != null && currentStepObj.skippable))) {
              _context4.n = 7;
              break;
            }
            emitStepChange({
              trigger: 'goTo',
              phase: 'blocked',
              from: currentStep,
              to: stepId,
              error: error
            });
            return _context4.a(2);
          case 7:
            markCompleted = ok;
            navigationError = error;
            if (ok) emitStepChange({
              trigger: 'goTo',
              phase: 'validated',
              from: currentStep,
              to: stepId
            });
          case 8:
            applyTransition(stepId, {
              markCompleted: markCompleted
            });
            emitStepChange(_extends({
              trigger: 'goTo',
              phase: 'navigated',
              from: currentStep,
              to: stepId
            }, navigationError ? {
              error: navigationError
            } : {}));
          case 9:
            return _context4.a(2);
        }
      }, _callee4);
    }));
    return function (_x) {
      return _ref7.apply(this, arguments);
    };
  }(), [applyTransition, currentStep, currentStepIndex, currentStepObj, emitStepChange, flatSteps, runValidation, steps]);
  var skip = useCallback(function () {
    if (!(currentStepObj != null && currentStepObj.skippable)) return;
    var nextId = resolveNextStepId();
    if (!nextId) return;
    // Skip: no validation, no completion.
    navigationVersion.current += 1;
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
  var complete = useCallback(/*#__PURE__*/_asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee5() {
    var _yield$runValidation3, ok, error, cancelled, completionCandidates, nextCompleted, completedStepsList;
    return _regenerator().w(function (_context5) {
      while (1) switch (_context5.n) {
        case 0:
          if (!(validationInFlight.current || currentStepObj != null && currentStepObj.disabled)) {
            _context5.n = 1;
            break;
          }
          return _context5.a(2);
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
          _context5.n = 2;
          return runValidation();
        case 2:
          _yield$runValidation3 = _context5.v;
          ok = _yield$runValidation3.ok;
          error = _yield$runValidation3.error;
          cancelled = _yield$runValidation3.cancelled;
          if (!cancelled) {
            _context5.n = 3;
            break;
          }
          return _context5.a(2);
        case 3:
          if (!(!ok && !(currentStepObj != null && currentStepObj.skippable))) {
            _context5.n = 4;
            break;
          }
          emitStepChange({
            trigger: 'complete',
            phase: 'blocked',
            from: currentStep,
            error: error
          });
          return _context5.a(2);
        case 4:
          if (ok) emitStepChange({
            trigger: 'complete',
            phase: 'validated',
            from: currentStep
          });
          completionCandidates = new Set(completedSteps);
          if (ok) completionCandidates.add(currentStep);else completionCandidates["delete"](currentStep);
          nextCompleted = filterCompletedSteps(latest.current.steps, stepValidationRef.current, completionCandidates);
          setCompletedSteps(nextCompleted);
          // Emit 'completed' before invoking onComplete.
          emitStepChange({
            trigger: 'complete',
            phase: 'completed',
            from: currentStep
          });
          if (onComplete) {
            completedStepsList = Array.from(nextCompleted);
            onComplete({
              value: formValue,
              completedSteps: completedStepsList,
              steps: resolveStepResults(latest.current.steps, stepValidationRef.current, nextCompleted)
            });
          }
          if (sendAnalytics) sendAnalytics({
            type: 'wizardComplete',
            element: 'Wizard'
          });
        case 5:
          return _context5.a(2);
      }
    }, _callee5);
  })), [sendAnalytics, completedSteps, currentStep, currentStepObj, emitStepChange, formValue, onComplete, runValidation]);
  var cancel = useCallback(function () {
    navigationVersion.current += 1;
    emitStepChange({
      trigger: 'cancel',
      phase: 'cancelled',
      from: currentStep
    });
    if (onCancel) {
      onCancel({
        value: formValue,
        reason: 'user'
      });
    } else {
      // Self-close; parent must change `key` to remount.
      setIsOpen(false);
    }
    if (sendAnalytics) sendAnalytics({
      type: 'wizardCancel',
      element: 'Wizard'
    });
  }, [sendAnalytics, currentStep, emitStepChange, formValue, onCancel]);

  // Scroll to top on step transition: container, then ancestor, then window.
  useLayoutEffect(function () {
    var _wizardRef$current;
    if (!scrollToTop) return;
    // Focus the anchor rendered by WizardStepHeader so screen readers
    // announce the new step. The anchor is located via a data attribute
    // so composed layouts get the same behavior for free.
    (_wizardRef$current = wizardRef.current) == null || (_wizardRef$current = _wizardRef$current.querySelector('[data-g-wizard-focus-anchor]')) == null || _wizardRef$current.focus({
      preventScroll: true
    });
    var safeScrollTo = function safeScrollTo(target) {
      if (!target || typeof target.scrollTo !== 'function') return;
      try {
        target.scrollTo({
          top: 0,
          behavior: 'auto'
        });
      } catch (_unused) {
        // jsdom may throw on scrollTo; ignore.
      }
    };
    var container = wizardRef.current;
    safeScrollTo(container);
    safeScrollTo(findScrollableAncestor(container));
    if (typeof window !== 'undefined') safeScrollTo(window);
  }, [currentStep, scrollToTop, wizardRef]);
  var canGoNext = !(currentStepObj != null && currentStepObj.disabled) && !isValidating;
  var isBlocked = (currentValidation == null || (_currentValidation$fo = currentValidation.form) == null ? void 0 : _currentValidation$fo.ok) === false || (currentValidation == null || (_currentValidation$ca2 = currentValidation.callback) == null ? void 0 : _currentValidation$ca2.ok) === false;
  var isCompleted = completedSteps.has(currentStep);
  var contextValue = useMemo(function () {
    return {
      steps: steps,
      flatSteps: flatSteps,
      clickableSteps: clickableSteps,
      closable: closable,
      currentStep: currentStep,
      currentStepIndex: currentStepIndex,
      currentStepObj: currentStepObj,
      totalSteps: totalSteps,
      stepStates: stepStates,
      stepErrorMessages: stepErrorMessages,
      stepValidation: stepValidation,
      updateValidation: updateValidation,
      registerForm: registerForm,
      form: form,
      formValue: formValue,
      setFormValue: setFormValue,
      validationError: validationError,
      isValidating: isValidating,
      isBlocked: isBlocked,
      isCompleted: isCompleted,
      canGoNext: canGoNext,
      next: next,
      previous: previous,
      goTo: goTo,
      skip: skip,
      complete: complete,
      cancel: cancel,
      hasCancelHandler: hasCancelHandler,
      showProgress: effectiveShowProgress,
      renderStep: renderStep,
      // Internal only: `messages` is not part of the public
      // WizardContextValue but is read by internal subcomponents
      // (same pattern as `hasCancelHandler`).
      messages: messages
    };
  }, [steps, flatSteps, clickableSteps, closable, currentStep, currentStepIndex, currentStepObj, totalSteps, stepStates, stepErrorMessages, stepValidation, updateValidation, registerForm, form, formValue, setFormValue, validationError, isValidating, isBlocked, isCompleted, canGoNext, next, previous, goTo, skip, complete, cancel, hasCancelHandler, effectiveShowProgress, renderStep, messages]);
  if (!isOpen) return null;

  // Custom composition: consumers supply their own tree via `children`.
  var content = children;
  if (!content) {
    var _theme$wizard, _theme$wizard2;
    var footerNode = footer != null ? footer : /*#__PURE__*/React.createElement(WizardFooter, null);
    var bodyTheme = (_theme$wizard = theme.wizard) == null ? void 0 : _theme$wizard.body;

    // Default layout: header + middle (progress + step body) + footer.
    // Header/footer stay pinned; only WizardContent scrolls internally.
    content = /*#__PURE__*/React.createElement(Box, _extends({}, (_theme$wizard2 = theme.wizard) == null ? void 0 : _theme$wizard2.container, {
      flex: true
    }), /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(WizardHeader, {
      title: title
    }), /*#__PURE__*/React.createElement(Box, {
      align: "center",
      flex: {
        grow: 1,
        shrink: 1
      },
      fill: "horizontal",
      overflow: "auto"
    }, /*#__PURE__*/React.createElement(Box, {
      pad: bodyTheme == null ? void 0 : bodyTheme.pad,
      gap: bodyTheme == null ? void 0 : bodyTheme.gap,
      flex: "grow",
      fill: "horizontal",
      direction: effectiveShowProgress === 'vertical' ? 'row' : 'column'
    }, effectiveShowProgress && responsiveSize !== 'small' && responsiveSize !== 'xsmall' && /*#__PURE__*/React.createElement(WizardProgress, null), /*#__PURE__*/React.createElement(Box, {
      flex: "grow"
    }, /*#__PURE__*/React.createElement(WizardStepHeader, null), /*#__PURE__*/React.createElement(WizardContent, null)))), footerNode));
  }
  return /*#__PURE__*/React.createElement(WizardContext.Provider, {
    value: contextValue
  }, /*#__PURE__*/React.createElement(Box, _extends({
    ref: wizardRef,
    id: id,
    "aria-label": ariaLabel,
    role: "region",
    flex: {
      grow: 1,
      shrink: 1
    }
  }, rest), content));
});
Wizard.displayName = 'Wizard';
Wizard.propTypes = WizardPropTypes;
export { Wizard };