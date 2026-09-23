"use strict";

exports.__esModule = true;
exports.TextInput = void 0;
var _react = _interopRequireWildcard(require("react"));
var _styledComponents = _interopRequireDefault(require("styled-components"));
var _Box = require("../Box");
var _Button = require("../Button");
var _Drop = require("../Drop");
var _InfiniteScroll = require("../InfiniteScroll");
var _Keyboard = require("../Keyboard");
var _FormContext = require("../Form/FormContext");
var _contexts = require("../../contexts");
var _utils = require("../../utils");
var _StyledTextInput = require("./StyledTextInput");
var _MessageContext = require("../../contexts/MessageContext");
var _propTypes = require("./propTypes");
var _CopyButton = require("./CopyButton");
var _useThemeValue2 = require("../../utils/useThemeValue");
var _excluded = ["a11yTitle", "copy", "defaultSuggestion", "defaultValue", "disabled", "dropAlign", "dropHeight", "dropProps", "dropTarget", "focusIndicator", "icon", "id", "messages", "name", "onBlur", "onChange", "onClickCopy", "onFocus", "onKeyDown", "onSelect", "onSuggestionSelect", "onSuggestionsClose", "onSuggestionsOpen", "password", "placeholder", "plain", "readOnly", "readOnlyCopy", "reverse", "suggestions", "textAlign", "type", "value", "width"]; // SPDX-FileCopyrightText: © Hewlett Packard Enterprise Development LP
// SPDX-License-Identifier: Apache-2.0
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function _interopRequireWildcard(e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, "default": e }; if (null === e || "object" != typeof e && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (var _t in e) "default" !== _t && {}.hasOwnProperty.call(e, _t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, _t)) && (i.get || i.set) ? o(f, _t, i) : f[_t] = e[_t]); return f; })(e, t); }
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function _regenerator() { /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/babel/babel/blob/main/packages/babel-helpers/LICENSE */ var e, t, r = "function" == typeof Symbol ? Symbol : {}, n = r.iterator || "@@iterator", o = r.toStringTag || "@@toStringTag"; function i(r, n, o, i) { var c = n && n.prototype instanceof Generator ? n : Generator, u = Object.create(c.prototype); return _regeneratorDefine2(u, "_invoke", function (r, n, o) { var i, c, u, f = 0, p = o || [], y = !1, G = { p: 0, n: 0, v: e, a: d, f: d.bind(e, 4), d: function d(t, r) { return i = t, c = 0, u = e, G.n = r, a; } }; function d(r, n) { for (c = r, u = n, t = 0; !y && f && !o && t < p.length; t++) { var o, i = p[t], d = G.p, l = i[2]; r > 3 ? (o = l === n) && (u = i[(c = i[4]) ? 5 : (c = 3, 3)], i[4] = i[5] = e) : i[0] <= d && ((o = r < 2 && d < i[1]) ? (c = 0, G.v = n, G.n = i[1]) : d < l && (o = r < 3 || i[0] > n || n > l) && (i[4] = r, i[5] = n, G.n = l, c = 0)); } if (o || r > 1) return a; throw y = !0, n; } return function (o, p, l) { if (f > 1) throw TypeError("Generator is already running"); for (y && 1 === p && d(p, l), c = p, u = l; (t = c < 2 ? e : u) || !y;) { i || (c ? c < 3 ? (c > 1 && (G.n = -1), d(c, u)) : G.n = u : G.v = u); try { if (f = 2, i) { if (c || (o = "next"), t = i[o]) { if (!(t = t.call(i, u))) throw TypeError("iterator result is not an object"); if (!t.done) return t; u = t.value, c < 2 && (c = 0); } else 1 === c && (t = i["return"]) && t.call(i), c < 2 && (u = TypeError("The iterator does not provide a '" + o + "' method"), c = 1); i = e; } else if ((t = (y = G.n < 0) ? u : r.call(n, G)) !== a) break; } catch (t) { i = e, c = 1, u = t; } finally { f = 1; } } return { value: t, done: y }; }; }(r, o, i), !0), u; } var a = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} t = Object.getPrototypeOf; var c = [][n] ? t(t([][n]())) : (_regeneratorDefine2(t = {}, n, function () { return this; }), t), u = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(c); function f(e) { return Object.setPrototypeOf ? Object.setPrototypeOf(e, GeneratorFunctionPrototype) : (e.__proto__ = GeneratorFunctionPrototype, _regeneratorDefine2(e, o, "GeneratorFunction")), e.prototype = Object.create(u), e; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, _regeneratorDefine2(u, "constructor", GeneratorFunctionPrototype), _regeneratorDefine2(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = "GeneratorFunction", _regeneratorDefine2(GeneratorFunctionPrototype, o, "GeneratorFunction"), _regeneratorDefine2(u), _regeneratorDefine2(u, o, "Generator"), _regeneratorDefine2(u, n, function () { return this; }), _regeneratorDefine2(u, "toString", function () { return "[object Generator]"; }), (_regenerator = function _regenerator() { return { w: i, m: f }; })(); }
function _regeneratorDefine2(e, r, n, t) { var i = Object.defineProperty; try { i({}, "", {}); } catch (e) { i = 0; } _regeneratorDefine2 = function _regeneratorDefine(e, r, n, t) { function o(r, n) { _regeneratorDefine2(e, r, function (e) { return this._invoke(r, n, e); }); } r ? i ? i(e, r, { value: n, enumerable: !t, configurable: !t, writable: !t }) : e[r] = n : (o("next", 0), o("throw", 1), o("return", 2)); }, _regeneratorDefine2(e, r, n, t); }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
function _objectWithoutPropertiesLoose(r, e) { if (null == r) return {}; var t = {}; for (var n in r) if ({}.hasOwnProperty.call(r, n)) { if (-1 !== e.indexOf(n)) continue; t[n] = r[n]; } return t; }
var renderLabel = function renderLabel(suggestion) {
  if (suggestion && typeof suggestion === 'object') {
    return suggestion.label || suggestion.value;
  }
  return suggestion;
};
var stringLabel = function stringLabel(suggestion) {
  if (suggestion && typeof suggestion === 'object') {
    if (suggestion.label && typeof suggestion.label === 'string') {
      return suggestion.label;
    }
    return suggestion.value;
  }
  return suggestion;
};
var renderIcon = function renderIcon(iconValue, props) {
  if (/*#__PURE__*/_react["default"].isValidElement(iconValue)) return /*#__PURE__*/_react["default"].cloneElement(iconValue, props);
  var IconComponent = iconValue;
  return IconComponent ? /*#__PURE__*/_react["default"].createElement(IconComponent, props) : undefined;
};
var ContainerBox = (0, _styledComponents["default"])(_Box.Box).withConfig({
  displayName: "TextInput__ContainerBox",
  componentId: "sc-1ai0c08-0"
})(["", ";@media screen and (-ms-high-contrast:active),(-ms-high-contrast:none){width:100%;}"], function (props) {
  return props.dropHeight ? (0, _utils.sizeStyle)('max-height', props.dropHeight, props.theme) : 'max-height: inherit;';
});
var StyledPasswordToggleButton = (0, _styledComponents["default"])(_Button.Button).withConfig({
  displayName: "TextInput__StyledPasswordToggleButton",
  componentId: "sc-1ai0c08-1"
})(["padding-top:0;padding-bottom:0;"]);
var defaultDropAlign = {
  top: 'bottom',
  left: 'left'
};
var TextInput = exports.TextInput = /*#__PURE__*/(0, _react.forwardRef)(function (_ref, ref) {
  var _inputRef$current2, _inputRef$current3, _theme$textInput, _theme$textInput2;
  var a11yTitle = _ref.a11yTitle,
    copy = _ref.copy,
    defaultSuggestion = _ref.defaultSuggestion,
    defaultValue = _ref.defaultValue,
    disabled = _ref.disabled,
    _ref$dropAlign = _ref.dropAlign,
    dropAlign = _ref$dropAlign === void 0 ? defaultDropAlign : _ref$dropAlign,
    dropHeight = _ref.dropHeight,
    dropProps = _ref.dropProps,
    dropTarget = _ref.dropTarget,
    _ref$focusIndicator = _ref.focusIndicator,
    focusIndicator = _ref$focusIndicator === void 0 ? true : _ref$focusIndicator,
    icon = _ref.icon,
    id = _ref.id,
    messages = _ref.messages,
    name = _ref.name,
    _onBlur = _ref.onBlur,
    onChange = _ref.onChange,
    onClickCopy = _ref.onClickCopy,
    _onFocus = _ref.onFocus,
    onKeyDown = _ref.onKeyDown,
    onSelect = _ref.onSelect,
    onSuggestionSelect = _ref.onSuggestionSelect,
    onSuggestionsClose = _ref.onSuggestionsClose,
    onSuggestionsOpen = _ref.onSuggestionsOpen,
    password = _ref.password,
    placeholder = _ref.placeholder,
    plain = _ref.plain,
    readOnlyProp = _ref.readOnly,
    readOnlyCopy = _ref.readOnlyCopy,
    reverse = _ref.reverse,
    suggestions = _ref.suggestions,
    textAlign = _ref.textAlign,
    typeProp = _ref.type,
    valueProp = _ref.value,
    widthProp = _ref.width,
    rest = _objectWithoutPropertiesLoose(_ref, _excluded);
  var _useThemeValue = (0, _useThemeValue2.useThemeValue)(),
    theme = _useThemeValue.theme,
    passThemeFlag = _useThemeValue.passThemeFlag;
  var _useContext = (0, _react.useContext)(_MessageContext.MessageContext),
    format = _useContext.format;
  var announce = (0, _react.useContext)(_contexts.AnnounceContext);
  var formContext = (0, _react.useContext)(_FormContext.FormContext);
  var inputRef = (0, _utils.useForwardedRef)(ref);
  var dropRef = (0, _react.useRef)();
  var suggestionsRef = (0, _react.useRef)();
  var readOnly = readOnlyProp || readOnlyCopy;
  // if this is a readOnly property, don't set a name with the form context
  // this allows Select to control the form context for the name.
  var _formContext$useFormI = formContext.useFormInput({
      name: readOnly ? undefined : name,
      value: valueProp
    }),
    value = _formContext$useFormI[0],
    setValue = _formContext$useFormI[1];
  var _useState = (0, _react.useState)(),
    focus = _useState[0],
    setFocus = _useState[1];
  var _useState2 = (0, _react.useState)(false),
    showDrop = _useState2[0],
    setShowDrop = _useState2[1];
  var _useState3 = (0, _react.useState)(false),
    passwordRevealed = _useState3[0],
    setPasswordRevealed = _useState3[1];
  var handleSuggestionSelect = (0, _react.useMemo)(function () {
    return onSelect && !onSuggestionSelect ? onSelect : onSuggestionSelect;
  }, [onSelect, onSuggestionSelect]);
  var handleTextSelect = (0, _react.useMemo)(function () {
    return onSelect && onSuggestionSelect ? onSelect : undefined;
  }, [onSelect, onSuggestionSelect]);
  var _useState4 = (0, _react.useState)(),
    suggestionsAtClose = _useState4[0],
    setSuggestionsAtClose = _useState4[1];
  var readOnlyCopyValidation = format({
    id: 'input.readOnlyCopy.validation',
    messages: messages
  });
  var readOnlyCopyPrompt = format({
    id: 'input.readOnlyCopy.prompt',
    messages: messages
  });
  var _useState5 = (0, _react.useState)(readOnlyCopyPrompt),
    tip = _useState5[0],
    setTip = _useState5[1];
  var showPasswordMessage = format({
    id: 'textInput.showPassword',
    messages: messages
  });
  var hidePasswordMessage = format({
    id: 'textInput.hidePassword',
    messages: messages
  });
  var handleCopyClick = /*#__PURE__*/function () {
    var _ref2 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee(event) {
      var _ref3, _inputRef$current$val, _inputRef$current;
      var currentValue;
      return _regenerator().w(function (_context) {
        while (1) switch (_context.n) {
          case 0:
            // uncontrolled inputs keep their current text on the DOM node, not
            // in `value`, which stays undefined outside a Form
            currentValue = (_ref3 = (_inputRef$current$val = (_inputRef$current = inputRef.current) == null ? void 0 : _inputRef$current.value) != null ? _inputRef$current$val : value) != null ? _ref3 : '';
            if (!onClickCopy) {
              _context.n = 2;
              break;
            }
            _context.n = 1;
            return onClickCopy(event, currentValue);
          case 1:
            _context.n = 3;
            break;
          case 2:
            _context.n = 3;
            return navigator.clipboard.writeText(currentValue);
          case 3:
            announce(readOnlyCopyValidation, 'assertive');
            setTip(readOnlyCopyValidation);
          case 4:
            return _context.a(2);
        }
      }, _callee);
    }));
    return function handleCopyClick(_x) {
      return _ref2.apply(this, arguments);
    };
  }();
  var onBlurCopy = function onBlurCopy() {
    if (tip === readOnlyCopyValidation) setTip(readOnlyCopyPrompt);
  };
  var authoredType = typeProp || (password ? 'password' : undefined);
  var passwordToggle = password && authoredType === 'password' && !readOnlyCopy;
  (0, _react.useEffect)(function () {
    // When the toggle stops applying, return the input to its authored type.
    if (!passwordToggle) setPasswordRevealed(false);
  }, [passwordToggle]);
  var openDrop = (0, _react.useCallback)(function () {
    setShowDrop(true);
    announce(format({
      id: 'textInput.suggestionIsOpen',
      messages: messages
    }));
    announce(suggestions.length + " " + format({
      id: 'textInput.suggestionsCount',
      messages: messages
    }));
    if (onSuggestionsOpen) onSuggestionsOpen();
  }, [announce, messages, format, onSuggestionsOpen, suggestions]);
  var closeDrop = (0, _react.useCallback)(function () {
    setSuggestionsAtClose(suggestions); // must be before closing drop
    setShowDrop(false);
    if (onSuggestionsClose) onSuggestionsClose();
  }, [onSuggestionsClose, suggestions]);
  var clickOutside = (0, _react.useCallback)(function (event) {
    if (event.target !== inputRef.current) closeDrop();
  }, [inputRef, closeDrop]);

  // Handle scenarios where we have focus, the drop isn't showing,
  // and the suggestions change. We don't want to open the drop if
  // the drop has been closed by onEsc and the suggestions haven't
  // changed. So, we remember the suggestions we are showing when
  // the drop was closed and only re-open it when the suggestions
  // subsequently change.
  (0, _react.useEffect)(function () {
    if (focus && !showDrop && suggestions && suggestions.length && (!suggestionsAtClose || suggestionsAtClose.length !== suggestions.length)) {
      openDrop();
    }
  }, [focus, openDrop, showDrop, suggestions, suggestionsAtClose]);

  // if we have no suggestions, close drop if it's open
  (0, _react.useEffect)(function () {
    if (showDrop && (!suggestions || !suggestions.length)) {
      closeDrop();
    }
  }, [closeDrop, showDrop, suggestions]);
  var valueSuggestionIndex = (0, _react.useMemo)(function () {
    return suggestions ? suggestions.map(function (suggestion) {
      return typeof suggestion === 'object' ? suggestion.value : suggestion;
    }).indexOf(value) : -1;
  }, [suggestions, value]);

  // choose the best suggestion, either the explicit default or the one
  // that matches the current value
  var resetSuggestionIndex = (0, _react.useMemo)(function () {
    if (valueSuggestionIndex === -1 && typeof defaultSuggestion === 'number') {
      return defaultSuggestion;
    }
    return valueSuggestionIndex;
  }, [defaultSuggestion, valueSuggestionIndex]);

  // activeSuggestionIndex unifies mouse and keyboard interaction of
  // the suggestions
  var _useState6 = (0, _react.useState)(resetSuggestionIndex),
    activeSuggestionIndex = _useState6[0],
    setActiveSuggestionIndex = _useState6[1];

  // Only update active suggestion index when the mouse actually moves,
  // not when suggestions are moving under the mouse.
  var _useState7 = (0, _react.useState)(),
    mouseMovedSinceLastKey = _useState7[0],
    setMouseMovedSinceLastKey = _useState7[1];

  // set activeSuggestionIndex when value changes
  (0, _react.useEffect)(function () {
    return setActiveSuggestionIndex(valueSuggestionIndex);
  }, [valueSuggestionIndex]);

  // reset activeSuggestionIndex when the drop is closed
  (0, _react.useEffect)(function () {
    if (!showDrop) setActiveSuggestionIndex(resetSuggestionIndex);
  }, [resetSuggestionIndex, showDrop]);

  // announce active suggestion
  (0, _react.useEffect)(function () {
    if (activeSuggestionIndex >= 0) {
      var label = stringLabel(suggestions[activeSuggestionIndex]);
      announce(label + " " + format({
        id: 'textInput.enterSelect',
        messages: messages
      }));
    }
  }, [activeSuggestionIndex, announce, messages, format, suggestions]);

  // make sure activeSuggestion is visible in scroll
  (0, _react.useEffect)(function () {
    var timer = setTimeout(function () {
      var list = suggestionsRef.current;
      if (showDrop && activeSuggestionIndex !== -1 && list) {
        var container = list.parentNode;
        var item = list.children[activeSuggestionIndex];
        if (container.scrollTo) {
          if ((0, _utils.isNodeAfterScroll)(item, container)) container.scrollTo(0, item.offsetTop - (container.getBoundingClientRect().height - item.getBoundingClientRect().height));else if ((0, _utils.isNodeBeforeScroll)(item, container)) container.scrollTo(0, item.offsetTop);
        }
      }
    }, 50); // delay to allow Drop to animate in
    return function () {
      return clearTimeout(timer);
    };
  }, [activeSuggestionIndex, showDrop]);
  (0, _react.useEffect)(function () {
    if (readOnly && inputRef != null && inputRef.current && inputRef.current.scrollLeft > 0) {
      inputRef.current.scrollLeft = 0;
    }
  }, [readOnly, inputRef, inputRef == null || (_inputRef$current2 = inputRef.current) == null ? void 0 : _inputRef$current2.scrollLeft]);
  var setValueFromSuggestion = function setValueFromSuggestion(event, suggestion) {
    // if we stole the focus in the drop, perhaps by interacting with
    // a suggestion button or the scrollbar, give it back
    inputRef.current.focus();
    inputRef.current.value = suggestion; // needed for uncontrolled cases
    closeDrop();
    if (handleSuggestionSelect) {
      if (event.persist) event.persist();
      var adjustedEvent = event;
      adjustedEvent.suggestion = suggestion;
      handleSuggestionSelect(adjustedEvent);
    }
    setValue(suggestion);
  };
  var onNextSuggestion = (0, _react.useCallback)(function (event) {
    event.preventDefault();
    var nextActiveIndex = Math.min(activeSuggestionIndex + 1, suggestions.length - 1);
    setActiveSuggestionIndex(nextActiveIndex);
    setMouseMovedSinceLastKey(false);
  }, [activeSuggestionIndex, suggestions]);
  var onPreviousSuggestion = (0, _react.useCallback)(function (event) {
    event.preventDefault();
    var nextActiveIndex = Math.max(activeSuggestionIndex - 1, 0);
    setActiveSuggestionIndex(nextActiveIndex);
    setMouseMovedSinceLastKey(false);
  }, [activeSuggestionIndex]);

  // account for input value in both controlled and uncontrolled scenarios
  var hasValue = value || ((_inputRef$current3 = inputRef.current) == null ? void 0 : _inputRef$current3.value);
  var showStyledPlaceholder = (0, _react.useMemo)(function () {
    return placeholder && typeof placeholder !== 'string' && !hasValue;
  }, [hasValue, placeholder]);
  var drop;
  var extraProps = {
    onSelect: handleTextSelect
  };
  if (showDrop) {
    drop = /*#__PURE__*/_react["default"].createElement(_Drop.Drop, _extends({
      ref: dropRef,
      id: id ? "text-input-drop__" + id : undefined,
      align: dropAlign,
      responsive: false,
      target: dropTarget || inputRef.current,
      onClickOutside: clickOutside,
      onEsc: closeDrop
      // TextInput manages its own keyboard behavior via keyboardProps
      ,
      trapFocus: false
    }, dropProps), /*#__PURE__*/_react["default"].createElement(ContainerBox, _extends({
      id: id ? "listbox__" + id : undefined,
      role: "listbox",
      overflow: "auto",
      dropHeight: dropHeight,
      onMouseMove: function onMouseMove() {
        return setMouseMovedSinceLastKey(true);
      }
    }, passThemeFlag), /*#__PURE__*/_react["default"].createElement(_StyledTextInput.StyledSuggestions, _extends({
      ref: suggestionsRef
    }, passThemeFlag), /*#__PURE__*/_react["default"].createElement(_InfiniteScroll.InfiniteScroll, {
      items: suggestions,
      step: theme.select.step,
      show: activeSuggestionIndex !== -1 ? activeSuggestionIndex : undefined
    }, function (suggestion, index, itemRef) {
      var active = activeSuggestionIndex === index;
      var selected = suggestion === value;
      // Determine whether the label is done as a child or
      // as an option Button kind property.
      var renderedLabel = renderLabel(suggestion);
      var child;
      if (typeof renderedLabel !== 'string')
        // must be an element rendered by suggestions.label
        child = renderedLabel;else if (!theme.button.option)
        // don't have theme support, need to layout here
        /*
        Not adding a theme object now because this code path
        is not used in the HPE theme, but we may add theme
        support here in the future.
        */
        child = /*#__PURE__*/_react["default"].createElement(_Box.Box, {
          align: "start",
          pad: "small"
        }, renderedLabel);
      // if we have a child, turn on plain

      return /*#__PURE__*/_react["default"].createElement("li", {
        key: stringLabel(suggestion) + "-" + index,
        ref: itemRef
      }, /*#__PURE__*/_react["default"].createElement(_Button.Button, {
        id: id ? "listbox-option-" + index + "__" + id : undefined,
        role: "option",
        "aria-selected": selected ? 'true' : 'false',
        active: active,
        fill: "horizontal",
        plain: !child ? undefined : true,
        align: "start",
        kind: !child ? 'option' : undefined,
        label: !child ? renderedLabel : undefined,
        onClick: function onClick(event) {
          return setValueFromSuggestion(event, suggestion);
        },
        onMouseMove: mouseMovedSinceLastKey && activeSuggestionIndex !== index ? function () {
          return setActiveSuggestionIndex(index);
        } : undefined,
        keyboard: !mouseMovedSinceLastKey
      }, child));
    }))));
  }
  var keyboardProps = {
    onKeyDown: onKeyDown
  };
  if (showDrop) {
    keyboardProps.onEnter = function (event) {
      // prevent submitting forms via Enter when the drop is open
      event.preventDefault();
      if (activeSuggestionIndex >= 0) setValueFromSuggestion(event, suggestions[activeSuggestionIndex]);else closeDrop();
    };
    if (activeSuggestionIndex > 0) keyboardProps.onUp = onPreviousSuggestion;
    if (activeSuggestionIndex < suggestions.length - 1) keyboardProps.onDown = onNextSuggestion;
    keyboardProps.onTab = closeDrop;
  } else if (suggestions && suggestions.length > 0) {
    keyboardProps.onDown = openDrop;
  }

  /*
  If the text input has a list of suggestions, add the WAI-ARIA 1.2
  combobox role and states.
  */
  var comboboxProps = {};
  var activeOptionID;
  if (id && (suggestions == null ? void 0 : suggestions.length) > -1) {
    if (showDrop && activeSuggestionIndex > -1) {
      activeOptionID = "listbox-option-" + activeSuggestionIndex + "__" + id;
    }
    comboboxProps = {
      'aria-activedescendant': activeOptionID,
      'aria-autocomplete': 'list',
      'aria-expanded': showDrop ? 'true' : 'false',
      'aria-controls': showDrop ? "listbox__" + id : undefined,
      role: 'combobox'
    };
  }
  // For the Keyboard target below, if we have focus,
  // either on the input element or within the drop,
  // then we set the target to the document,
  // otherwise we only listen to onDown on the input element itself,
  // primarily for tests.

  var textInputIcon = (0, _utils.useSizedIcon)(icon, rest.size, theme);
  var showPasswordIcon = (_theme$textInput = theme.textInput) == null || (_theme$textInput = _theme$textInput.icons) == null ? void 0 : _theme$textInput.showPassword;
  var hidePasswordIcon = (_theme$textInput2 = theme.textInput) == null || (_theme$textInput2 = _theme$textInput2.icons) == null ? void 0 : _theme$textInput2.hidePassword;
  var inputType = authoredType;
  if (passwordToggle) {
    inputType = passwordRevealed ? 'text' : 'password';
  }
  var showTextInputIcon = !!textInputIcon && !readOnlyCopy;
  var copyButtonElement = /*#__PURE__*/_react["default"].createElement(_CopyButton.CopyButton, {
    authoredType: authoredType,
    disabled: disabled,
    messages: messages,
    onBlurCopy: onBlurCopy,
    onCopy: handleCopyClick,
    tip: tip,
    value: value
  });
  var passwordToggleButton = passwordToggle ? /*#__PURE__*/_react["default"].createElement(StyledPasswordToggleButton, _extends({
    disabled: disabled,
    kind: "toolbar",
    icon: passwordRevealed ? renderIcon(hidePasswordIcon, {
      'aria-hidden': true
    }) : renderIcon(showPasswordIcon, {
      'aria-hidden': true
    }),
    onClick: function onClick() {
      return setPasswordRevealed(function (current) {
        return !current;
      });
    },
    "aria-label": passwordRevealed ? hidePasswordMessage : showPasswordMessage
  }, passThemeFlag)) : undefined;
  var copyButton = readOnlyCopy || copy ? copyButtonElement : undefined;
  // Keep state-changing password visibility before the non-destructive
  // copy action.
  var actionsGroup = passwordToggleButton || copyButton ? /*#__PURE__*/_react["default"].createElement(_StyledTextInput.StyledActionsGroup, passThemeFlag, passwordToggleButton, copyButton) : undefined;
  var hasActionsGroup = !!actionsGroup;
  var iconOnRight = reverse;
  var showLeadingIcon = showTextInputIcon && !iconOnRight;
  var showTrailingIcon = showTextInputIcon && iconOnRight;
  return /*#__PURE__*/_react["default"].createElement(_StyledTextInput.StyledTextInputContainer, _extends({
    hasButton: !!actionsGroup,
    readOnlyProp: readOnly // readOnlyProp to avoid passing to DOM
    ,
    readOnlyCopy: readOnlyCopy,
    plain: plain,
    border: !plain,
    widthProp: widthProp,
    onMouseMove: function onMouseMove() {
      return setMouseMovedSinceLastKey(true);
    }
  }, passThemeFlag), showStyledPlaceholder && /*#__PURE__*/_react["default"].createElement(_StyledTextInput.StyledPlaceholder, passThemeFlag, placeholder), showLeadingIcon && /*#__PURE__*/_react["default"].createElement(_StyledTextInput.StyledIcon, {
    reverse: iconOnRight,
    hasActionsGroup: hasActionsGroup,
    theme: theme
  }, textInputIcon), /*#__PURE__*/_react["default"].createElement(_Keyboard.Keyboard, _extends({
    target: focus ? 'document' : undefined
  }, keyboardProps), /*#__PURE__*/_react["default"].createElement(_StyledTextInput.StyledTextInput, _extends({
    "aria-label": a11yTitle,
    ref: inputRef,
    id: id,
    name: name,
    autoComplete: "off",
    disabled: disabled,
    plain: plain,
    placeholder: typeof placeholder === 'string' ? placeholder : undefined,
    icon: showTextInputIcon && !hasActionsGroup ? icon : undefined,
    reverse: iconOnRight,
    focus: focus,
    hasButton: hasActionsGroup,
    hasActionsGroup: hasActionsGroup,
    hasTrailingIcon: showTrailingIcon,
    focusIndicator: focusIndicator,
    textAlign: textAlign,
    type: inputType,
    widthProp: widthProp
  }, passThemeFlag, rest, extraProps, comboboxProps, {
    defaultValue: renderLabel(defaultValue),
    value: renderLabel(value),
    readOnly: readOnly,
    readOnlyCopy: readOnlyCopy,
    onFocus: function onFocus(event) {
      // Don't do anything if we are acting like we already have
      // focus. This can happen when this input loses focus temporarily
      // to our drop, see onBlur() handler below.
      if (!focus) {
        setFocus(true);
        if (suggestions && suggestions.length > 0) {
          announce(format({
            id: 'textInput.suggestionsExist',
            messages: messages
          }));
          openDrop();
        }
        if (_onFocus) _onFocus(event);
      }
    },
    onBlur: function onBlur(event) {
      // Only treat it as a blur if the element receiving focus
      // isn't in our drop. The relatedTarget will be our drop
      // when the user clicks on a suggestion or interacts with the
      // scrollbar in the drop.
      if (!event.relatedTarget || event.relatedTarget !== dropRef.current) {
        setFocus(false);
        if (_onBlur) _onBlur(event);
      }
    },
    onChange: readOnly ? undefined : function (event) {
      // when TextInput is not contained in a Form, no re-render
      // will come from this onChange and remove the placeholder
      // so we need to update state to ensure the styled
      // placeholder only appears when there is no value
      if (suggestions && focus && !showDrop) {
        openDrop();
      }
      setValue(event.target.value);
      setActiveSuggestionIndex(resetSuggestionIndex);
      if (onChange) onChange(event);
    }
  }))), showTrailingIcon && /*#__PURE__*/_react["default"].createElement(_StyledTextInput.StyledIcon, {
    reverse: iconOnRight,
    hasActionsGroup: hasActionsGroup,
    theme: theme
  }, textInputIcon), actionsGroup, !readOnly && drop);
});
TextInput.displayName = 'TextInput';
TextInput.propTypes = _propTypes.TextInputPropTypes;