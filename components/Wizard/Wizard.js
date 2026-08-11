"use strict";

exports.__esModule = true;
exports.Wizard = void 0;
var _react = _interopRequireWildcard(require("react"));
var _contexts = require("../../contexts");
var _MessageContext = require("../../contexts/MessageContext");
var _ResponsiveContext = require("../../contexts/ResponsiveContext");
var _utils = require("../../utils");
var _useThemeValue2 = require("../../utils/useThemeValue");
var _useIsomorphicLayoutEffect = require("../../utils/use-isomorphic-layout-effect");
var _Box = require("../Box");
var _WizardContext = require("./WizardContext");
var _WizardHeader = require("./WizardHeader");
var _WizardProgress = require("./WizardProgress");
var _WizardStepHeader = require("./WizardStepHeader");
var _WizardContent = require("./WizardContent");
var _WizardFooter = require("./WizardFooter");
var _propTypes = require("./propTypes");
var _excluded = ["steps", "currentStep", "defaultStep", "showProgress", "onStepChange", "onComplete", "onCancel", "renderStep", "title", "footer", "scrollToTop", "value", "defaultValue", "onChange", "id", "aria-label", "messages", "children"];
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function _interopRequireWildcard(e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, "default": e }; if (null === e || "object" != typeof e && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (var _t2 in e) "default" !== _t2 && {}.hasOwnProperty.call(e, _t2) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, _t2)) && (i.get || i.set) ? o(f, _t2, i) : f[_t2] = e[_t2]); return f; })(e, t); }
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function _regenerator() { /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/babel/babel/blob/main/packages/babel-helpers/LICENSE */ var e, t, r = "function" == typeof Symbol ? Symbol : {}, n = r.iterator || "@@iterator", o = r.toStringTag || "@@toStringTag"; function i(r, n, o, i) { var c = n && n.prototype instanceof Generator ? n : Generator, u = Object.create(c.prototype); return _regeneratorDefine2(u, "_invoke", function (r, n, o) { var i, c, u, f = 0, p = o || [], y = !1, G = { p: 0, n: 0, v: e, a: d, f: d.bind(e, 4), d: function d(t, r) { return i = t, c = 0, u = e, G.n = r, a; } }; function d(r, n) { for (c = r, u = n, t = 0; !y && f && !o && t < p.length; t++) { var o, i = p[t], d = G.p, l = i[2]; r > 3 ? (o = l === n) && (u = i[(c = i[4]) ? 5 : (c = 3, 3)], i[4] = i[5] = e) : i[0] <= d && ((o = r < 2 && d < i[1]) ? (c = 0, G.v = n, G.n = i[1]) : d < l && (o = r < 3 || i[0] > n || n > l) && (i[4] = r, i[5] = n, G.n = l, c = 0)); } if (o || r > 1) return a; throw y = !0, n; } return function (o, p, l) { if (f > 1) throw TypeError("Generator is already running"); for (y && 1 === p && d(p, l), c = p, u = l; (t = c < 2 ? e : u) || !y;) { i || (c ? c < 3 ? (c > 1 && (G.n = -1), d(c, u)) : G.n = u : G.v = u); try { if (f = 2, i) { if (c || (o = "next"), t = i[o]) { if (!(t = t.call(i, u))) throw TypeError("iterator result is not an object"); if (!t.done) return t; u = t.value, c < 2 && (c = 0); } else 1 === c && (t = i["return"]) && t.call(i), c < 2 && (u = TypeError("The iterator does not provide a '" + o + "' method"), c = 1); i = e; } else if ((t = (y = G.n < 0) ? u : r.call(n, G)) !== a) break; } catch (t) { i = e, c = 1, u = t; } finally { f = 1; } } return { value: t, done: y }; }; }(r, o, i), !0), u; } var a = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} t = Object.getPrototypeOf; var c = [][n] ? t(t([][n]())) : (_regeneratorDefine2(t = {}, n, function () { return this; }), t), u = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(c); function f(e) { return Object.setPrototypeOf ? Object.setPrototypeOf(e, GeneratorFunctionPrototype) : (e.__proto__ = GeneratorFunctionPrototype, _regeneratorDefine2(e, o, "GeneratorFunction")), e.prototype = Object.create(u), e; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, _regeneratorDefine2(u, "constructor", GeneratorFunctionPrototype), _regeneratorDefine2(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = "GeneratorFunction", _regeneratorDefine2(GeneratorFunctionPrototype, o, "GeneratorFunction"), _regeneratorDefine2(u), _regeneratorDefine2(u, o, "Generator"), _regeneratorDefine2(u, n, function () { return this; }), _regeneratorDefine2(u, "toString", function () { return "[object Generator]"; }), (_regenerator = function _regenerator() { return { w: i, m: f }; })(); }
function _regeneratorDefine2(e, r, n, t) { var i = Object.defineProperty; try { i({}, "", {}); } catch (e) { i = 0; } _regeneratorDefine2 = function _regeneratorDefine(e, r, n, t) { function o(r, n) { _regeneratorDefine2(e, r, function (e) { return this._invoke(r, n, e); }); } r ? i ? i(e, r, { value: n, enumerable: !t, configurable: !t, writable: !t }) : e[r] = n : (o("next", 0), o("throw", 1), o("return", 2)); }, _regeneratorDefine2(e, r, n, t); }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
function _objectWithoutPropertiesLoose(r, e) { if (null == r) return {}; var t = {}; for (var n in r) if ({}.hasOwnProperty.call(r, n)) { if (-1 !== e.indexOf(n)) continue; t[n] = r[n]; } return t; }
function _createForOfIteratorHelperLoose(r, e) { var t = "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (t) return (t = t.call(r)).next.bind(t); if (Array.isArray(r) || (t = _unsupportedIterableToArray(r)) || e && r && "number" == typeof r.length) { t && (r = t); var o = 0; return function () { return o >= r.length ? { done: !0 } : { done: !1, value: r[o++] }; }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; } // SPDX-FileCopyrightText: © Hewlett Packard Enterprise Development LP
// SPDX-License-Identifier: Apache-2.0
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
var Wizard = exports.Wizard = /*#__PURE__*/(0, _react.forwardRef)(function (_ref, ref) {
  var steps = _ref.steps,
    currentStepProp = _ref.currentStep,
    defaultStep = _ref.defaultStep,
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
    rest = _objectWithoutPropertiesLoose(_ref, _excluded);
  var _useThemeValue = (0, _useThemeValue2.useThemeValue)(),
    theme = _useThemeValue.theme;
  var _React$useContext = _react["default"].useContext(_MessageContext.MessageContext),
    format = _React$useContext.format;
  var responsiveSize = _react["default"].useContext(_ResponsiveContext.ResponsiveContext);
  var sendAnalytics = (0, _contexts.useAnalytics)();

  // Horizontal progress + sub-steps: fall back to vertical.
  var hasSubSteps = steps.some(function (step) {
    return step.children && step.children.length > 0;
  });
  var effectiveShowProgress = hasSubSteps && showProgress === 'horizontal' ? 'vertical' : showProgress;

  // Only two levels supported (step > child); warn on deeper nesting.
  var hasDeepNesting = steps.some(function (step) {
    var _step$children;
    return (_step$children = step.children) == null ? void 0 : _step$children.some(function (child) {
      return child.children && child.children.length > 0;
    });
  });
  (0, _react.useEffect)(function () {
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
  var wizardRef = (0, _utils.useForwardedRef)(ref);
  var flatSteps = (0, _react.useMemo)(function () {
    return flattenLeaves(steps);
  }, [steps]);
  var firstEnabled = flatSteps.find(function (step) {
    return !step.disabled;
  }) || flatSteps[0];
  var isControlled = currentStepProp !== undefined;
  var _useState = (0, _react.useState)(defaultStep || (firstEnabled == null ? void 0 : firstEnabled.id)),
    uncontrolledStep = _useState[0],
    setUncontrolledStep = _useState[1];
  var currentStep = isControlled ? currentStepProp : uncontrolledStep;
  var isValueControlled = valueProp !== undefined;
  var _useState2 = (0, _react.useState)(defaultValue || {}),
    uncontrolledValue = _useState2[0],
    setUncontrolledValue = _useState2[1];
  var formValue = isValueControlled ? valueProp : uncontrolledValue;
  var setFormValue = (0, _react.useCallback)(function (nextValueOrFn) {
    var resolved = typeof nextValueOrFn === 'function' ? nextValueOrFn(formValue) : nextValueOrFn;
    if (!isValueControlled) setUncontrolledValue(resolved);
    if (onChange) onChange({
      value: resolved
    });
  }, [formValue, isValueControlled, onChange]);
  var _useState3 = (0, _react.useState)([currentStep]),
    visitedSteps = _useState3[0],
    setVisitedSteps = _useState3[1];
  var _useState4 = (0, _react.useState)(function () {
      return new Set();
    }),
    completedSteps = _useState4[0],
    setCompletedSteps = _useState4[1];
  var _useState5 = (0, _react.useState)(undefined),
    validationError = _useState5[0],
    setValidationError = _useState5[1];
  var _useState6 = (0, _react.useState)(false),
    isValidating = _useState6[0],
    setIsValidating = _useState6[1];
  // Without `onCancel`, cancel self-closes the wizard.
  var _useState7 = (0, _react.useState)(true),
    isOpen = _useState7[0],
    setIsOpen = _useState7[1];
  var hasCancelHandler = onCancel !== undefined;

  // Keep visited history in sync when currentStep is externally set.
  (0, _react.useEffect)(function () {
    setVisitedSteps(function (prev) {
      return prev[prev.length - 1] === currentStep ? prev : [].concat(prev, [currentStep]);
    });
  }, [currentStep]);
  var currentStepObj = (0, _react.useMemo)(function () {
    return findStepById(steps, currentStep);
  }, [steps, currentStep]);
  var currentStepIndex = (0, _react.useMemo)(function () {
    return flatSteps.findIndex(function (step) {
      return step.id === currentStep;
    });
  }, [flatSteps, currentStep]);
  var totalSteps = flatSteps.length;

  // Derive step status; parents aggregate from their children.
  var getStepStatus = (0, _react.useCallback)(function (stepId) {
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

  // Record<id, status> for every step (top-level + children).
  var stepStates = (0, _react.useMemo)(function () {
    var record = {};
    var _walk = function walk(nodes) {
      nodes.forEach(function (node) {
        record[node.id] = getStepStatus(node.id);
        if (node.children && node.children.length) _walk(node.children);
      });
    };
    _walk(steps);
    return record;
  }, [steps, getStepStatus]);

  // Emit a step change event to onStepChange.
  var emitStepChange = (0, _react.useCallback)(function (event) {
    if (onStepChange) onStepChange(event);
  }, [onStepChange]);

  // Resolve next step id, honoring step.nextStep(formValue) branching.
  var resolveNextStepId = (0, _react.useCallback)(function () {
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

  // Apply a navigation transition (id, history, completion, focus).
  var applyTransition = (0, _react.useCallback)(function (nextId, _temp) {
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

  // Run step.validate (sync or async). Returns { ok, error }.
  var runValidation = (0, _react.useCallback)(/*#__PURE__*/_asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee() {
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
            error: format({
              id: 'wizard.validationError',
              messages: messages
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
              id: 'wizard.validationError',
              messages: messages
            })
          });
      }
    }, _callee, null, [[2, 8]]);
  })), [currentStepObj, formValue, format, messages]);
  var next = (0, _react.useCallback)(/*#__PURE__*/_asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee2() {
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
  var previous = (0, _react.useCallback)(function () {
    var _flatSteps;
    // History-aware; falls back to the linear predecessor.
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
  var goTo = (0, _react.useCallback)(/*#__PURE__*/function () {
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
  var skip = (0, _react.useCallback)(function () {
    if (!(currentStepObj != null && currentStepObj.skippable)) return;
    var nextId = resolveNextStepId();
    if (!nextId) return;
    // Skip: no validation, no completion.
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
  var complete = (0, _react.useCallback)(/*#__PURE__*/_asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee4() {
    var _yield$runValidation3, ok, error, completedStepsList;
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
          // Emit 'completed' before invoking onComplete.
          emitStepChange({
            trigger: 'complete',
            phase: 'completed',
            from: currentStep
          });
          if (onComplete) {
            // setCompletedSteps above is async; include currentStep here so the
            // payload reflects the just-completed final step.
            completedStepsList = [].concat(completedSteps, [currentStep]);
            onComplete({
              value: formValue,
              completedSteps: completedStepsList
            });
          }
          if (sendAnalytics) sendAnalytics({
            type: 'wizardComplete',
            element: 'Wizard'
          });
        case 4:
          return _context4.a(2);
      }
    }, _callee4);
  })), [sendAnalytics, completedSteps, currentStep, emitStepChange, formValue, isValidating, onComplete, runValidation]);
  var cancel = (0, _react.useCallback)(function () {
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
  (0, _useIsomorphicLayoutEffect.useLayoutEffect)(function () {
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
  var isBlocked = !!validationError && !(currentStepObj != null && currentStepObj.skippable);
  var isCompleted = completedSteps.has(currentStep);
  var contextValue = (0, _react.useMemo)(function () {
    return {
      steps: steps,
      flatSteps: flatSteps,
      currentStep: currentStep,
      currentStepIndex: currentStepIndex,
      currentStepObj: currentStepObj,
      totalSteps: totalSteps,
      stepStates: stepStates,
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
  }, [steps, flatSteps, currentStep, currentStepIndex, currentStepObj, totalSteps, stepStates, formValue, setFormValue, validationError, isValidating, isBlocked, isCompleted, canGoNext, next, previous, goTo, skip, complete, cancel, hasCancelHandler, effectiveShowProgress, renderStep, messages]);
  if (!isOpen) return null;

  // Custom composition: consumers supply their own tree via `children`.
  var content = children;
  if (!content) {
    var _theme$wizard, _theme$wizard2;
    var footerNode = footer != null ? footer : /*#__PURE__*/_react["default"].createElement(_WizardFooter.WizardFooter, null);
    var bodyTheme = (_theme$wizard = theme.wizard) == null ? void 0 : _theme$wizard.body;

    // Default layout: header + middle (progress + step body) + footer.
    // Header/footer stay pinned; only WizardContent scrolls internally.
    content = /*#__PURE__*/_react["default"].createElement(_Box.Box, _extends({}, (_theme$wizard2 = theme.wizard) == null ? void 0 : _theme$wizard2.container, {
      flex: true
    }), /*#__PURE__*/_react["default"].createElement(_react["default"].Fragment, null, /*#__PURE__*/_react["default"].createElement(_WizardHeader.WizardHeader, {
      title: title
    }), /*#__PURE__*/_react["default"].createElement(_Box.Box, {
      align: "center",
      flex: {
        grow: 1,
        shrink: 1
      },
      fill: "horizontal",
      overflow: "auto"
    }, /*#__PURE__*/_react["default"].createElement(_Box.Box, {
      pad: bodyTheme == null ? void 0 : bodyTheme.pad,
      gap: bodyTheme == null ? void 0 : bodyTheme.gap,
      flex: "grow",
      fill: "horizontal",
      direction: effectiveShowProgress === 'vertical' ? 'row' : 'column'
    }, effectiveShowProgress && responsiveSize !== 'small' && responsiveSize !== 'xsmall' && /*#__PURE__*/_react["default"].createElement(_WizardProgress.WizardProgress, null), /*#__PURE__*/_react["default"].createElement(_Box.Box, {
      flex: "grow"
    }, /*#__PURE__*/_react["default"].createElement(_WizardStepHeader.WizardStepHeader, null), /*#__PURE__*/_react["default"].createElement(_WizardContent.WizardContent, null)))), footerNode));
  }
  return /*#__PURE__*/_react["default"].createElement(_WizardContext.WizardContext.Provider, {
    value: contextValue
  }, /*#__PURE__*/_react["default"].createElement(_Box.Box, _extends({
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
Wizard.propTypes = _propTypes.WizardPropTypes;