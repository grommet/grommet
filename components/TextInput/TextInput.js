"use strict";

exports.__esModule = true;
exports.TextInput = void 0;

var _react = _interopRequireWildcard(require("react"));

var _styledComponents = _interopRequireWildcard(require("styled-components"));

var _defaultProps = require("../../default-props");

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

var _excluded = ["a11yTitle", "defaultSuggestion", "defaultValue", "dropAlign", "dropHeight", "dropTarget", "dropProps", "focusIndicator", "icon", "id", "messages", "name", "onBlur", "onChange", "onFocus", "onKeyDown", "onSelect", "onSuggestionSelect", "onSuggestionsClose", "onSuggestionsOpen", "placeholder", "plain", "readOnly", "reverse", "suggestions", "textAlign", "value"];

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

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

var ContainerBox = (0, _styledComponents["default"])(_Box.Box).withConfig({
  displayName: "TextInput__ContainerBox",
  componentId: "sc-1ai0c08-0"
})(["", ";@media screen and (-ms-high-contrast:active),(-ms-high-contrast:none){width:100%;}"], function (props) {
  return props.dropHeight ? (0, _utils.sizeStyle)('max-height', props.dropHeight, props.theme) : 'max-height: inherit;';
});
var defaultDropAlign = {
  top: 'bottom',
  left: 'left'
};
var TextInput = /*#__PURE__*/(0, _react.forwardRef)(function (_ref, ref) {
  var a11yTitle = _ref.a11yTitle,
      defaultSuggestion = _ref.defaultSuggestion,
      defaultValue = _ref.defaultValue,
      _ref$dropAlign = _ref.dropAlign,
      dropAlign = _ref$dropAlign === void 0 ? defaultDropAlign : _ref$dropAlign,
      dropHeight = _ref.dropHeight,
      dropTarget = _ref.dropTarget,
      dropProps = _ref.dropProps,
      _ref$focusIndicator = _ref.focusIndicator,
      focusIndicator = _ref$focusIndicator === void 0 ? true : _ref$focusIndicator,
      icon = _ref.icon,
      id = _ref.id,
      messages = _ref.messages,
      name = _ref.name,
      _onBlur = _ref.onBlur,
      onChange = _ref.onChange,
      _onFocus = _ref.onFocus,
      onKeyDown = _ref.onKeyDown,
      onSelect = _ref.onSelect,
      onSuggestionSelect = _ref.onSuggestionSelect,
      onSuggestionsClose = _ref.onSuggestionsClose,
      onSuggestionsOpen = _ref.onSuggestionsOpen,
      placeholder = _ref.placeholder,
      plain = _ref.plain,
      readOnly = _ref.readOnly,
      reverse = _ref.reverse,
      suggestions = _ref.suggestions,
      textAlign = _ref.textAlign,
      valueProp = _ref.value,
      rest = _objectWithoutPropertiesLoose(_ref, _excluded);

  var theme = (0, _react.useContext)(_styledComponents.ThemeContext) || _defaultProps.defaultProps.theme;

  var _useContext = (0, _react.useContext)(_MessageContext.MessageContext),
      format = _useContext.format;

  var announce = (0, _react.useContext)(_contexts.AnnounceContext);
  var formContext = (0, _react.useContext)(_FormContext.FormContext);
  var inputRef = (0, _utils.useForwardedRef)(ref);
  var dropRef = (0, _react.useRef)();
  var suggestionsRef = (0, _react.useRef)(); // if this is a readOnly property, don't set a name with the form context
  // this allows Select to control the form context for the name.

  var _formContext$useFormI = formContext.useFormInput(readOnly ? undefined : name, valueProp),
      value = _formContext$useFormI[0],
      setValue = _formContext$useFormI[1];

  var _useState = (0, _react.useState)(),
      focus = _useState[0],
      setFocus = _useState[1];

  var _useState2 = (0, _react.useState)(false),
      showDrop = _useState2[0],
      setShowDrop = _useState2[1];

  var handleSuggestionSelect = (0, _react.useMemo)(function () {
    return onSelect && !onSuggestionSelect ? onSelect : onSuggestionSelect;
  }, [onSelect, onSuggestionSelect]);
  var handleTextSelect = (0, _react.useMemo)(function () {
    return onSelect && onSuggestionSelect ? onSelect : undefined;
  }, [onSelect, onSuggestionSelect]);

  var _useState3 = (0, _react.useState)(),
      suggestionsAtClose = _useState3[0],
      setSuggestionsAtClose = _useState3[1];

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
  }, [onSuggestionsClose, suggestions]); // Handle scenarios where we have focus, the drop isn't showing,
  // and the suggestions change. We don't want to open the drop if
  // the drop has been closed by onEsc and the suggestions haven't
  // changed. So, we remember the suggestions we are showing when
  // the drop was closed and only re-open it when the suggestions
  // subsequently change.

  (0, _react.useEffect)(function () {
    if (focus && !showDrop && suggestions && suggestions.length && (!suggestionsAtClose || suggestionsAtClose.length !== suggestions.length)) {
      openDrop();
    }
  }, [focus, openDrop, showDrop, suggestions, suggestionsAtClose]); // if we have no suggestions, close drop if it's open

  (0, _react.useEffect)(function () {
    if (showDrop && (!suggestions || !suggestions.length)) closeDrop();
  }, [closeDrop, showDrop, suggestions]);
  var valueSuggestionIndex = (0, _react.useMemo)(function () {
    return suggestions ? suggestions.map(function (suggestion) {
      return typeof suggestion === 'object' ? suggestion.value : suggestion;
    }).indexOf(value) : -1;
  }, [suggestions, value]); // choose the best suggestion, either the explicit default or the one
  // that matches the current value

  var resetSuggestionIndex = (0, _react.useMemo)(function () {
    if (valueSuggestionIndex === -1 && typeof defaultSuggestion === 'number') {
      return defaultSuggestion;
    }

    return valueSuggestionIndex;
  }, [defaultSuggestion, valueSuggestionIndex]); // activeSuggestionIndex unifies mouse and keyboard interaction of
  // the suggestions

  var _useState4 = (0, _react.useState)(resetSuggestionIndex),
      activeSuggestionIndex = _useState4[0],
      setActiveSuggestionIndex = _useState4[1]; // Only update active suggestion index when the mouse actually moves,
  // not when suggestions are moving under the mouse.


  var _useState5 = (0, _react.useState)(),
      mouseMovedSinceLastKey = _useState5[0],
      setMouseMovedSinceLastKey = _useState5[1]; // set activeSuggestionIndex when value changes


  (0, _react.useEffect)(function () {
    return setActiveSuggestionIndex(valueSuggestionIndex);
  }, [valueSuggestionIndex]); // reset activeSuggestionIndex when the drop is closed

  (0, _react.useEffect)(function () {
    if (!showDrop) setActiveSuggestionIndex(resetSuggestionIndex);
  }, [resetSuggestionIndex, showDrop]); // announce active suggestion

  (0, _react.useEffect)(function () {
    if (activeSuggestionIndex >= 0) {
      var label = stringLabel(suggestions[activeSuggestionIndex]);
      announce(label + " " + format({
        id: 'textInput.enterSelect',
        messages: messages
      }));
    }
  }, [activeSuggestionIndex, announce, messages, format, suggestions]); // make sure activeSuggestion is visible in scroll

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

  var _useState6 = (0, _react.useState)(placeholder && typeof placeholder !== 'string' && !(inputRef.current && inputRef.current.value) && !value),
      showStyledPlaceholder = _useState6[0],
      setShowStyledPlaceholder = _useState6[1];

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
      onClickOutside: closeDrop,
      onEsc: closeDrop
    }, dropProps), /*#__PURE__*/_react["default"].createElement(ContainerBox, {
      overflow: "auto",
      dropHeight: dropHeight,
      onMouseMove: function onMouseMove() {
        return setMouseMovedSinceLastKey(true);
      }
    }, /*#__PURE__*/_react["default"].createElement(_StyledTextInput.StyledSuggestions, {
      ref: suggestionsRef
    }, /*#__PURE__*/_react["default"].createElement(_InfiniteScroll.InfiniteScroll, {
      items: suggestions,
      step: theme.select.step,
      show: activeSuggestionIndex !== -1 ? activeSuggestionIndex : undefined
    }, function (suggestion, index, itemRef) {
      // Determine whether the label is done as a child or
      // as an option Button kind property.
      var renderedLabel = renderLabel(suggestion);
      var child;
      if (typeof renderedLabel !== 'string') // must be an element rendered by suggestions.label
        child = renderedLabel;else if (!theme.button.option) // don't have theme support, need to layout here
        child = /*#__PURE__*/_react["default"].createElement(_Box.Box, {
          align: "start",
          pad: "small"
        }, renderedLabel); // if we have a child, turn on plain

      return /*#__PURE__*/_react["default"].createElement("li", {
        key: stringLabel(suggestion) + "-" + index,
        ref: itemRef
      }, /*#__PURE__*/_react["default"].createElement(_Button.Button, {
        active: activeSuggestionIndex === index,
        fill: true,
        plain: !child ? undefined : true,
        align: "start",
        kind: !child ? 'option' : undefined,
        label: !child ? renderedLabel : undefined,
        onClick: function onClick(event) {
          return setValueFromSuggestion(event, suggestion);
        },
        onMouseMove: mouseMovedSinceLastKey && activeSuggestionIndex !== index ? function () {
          return setActiveSuggestionIndex(index);
        } : undefined
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
  } // For the Keyboard target below, if we have focus,
  // either on the input element or within the drop,
  // then we set the target to the document,
  // otherwise we only listen to onDown on the input element itself,
  // primarily for tests.


  return /*#__PURE__*/_react["default"].createElement(_StyledTextInput.StyledTextInputContainer, {
    plain: plain
  }, showStyledPlaceholder && /*#__PURE__*/_react["default"].createElement(_StyledTextInput.StyledPlaceholder, null, placeholder), icon && /*#__PURE__*/_react["default"].createElement(_StyledTextInput.StyledIcon, {
    reverse: reverse,
    theme: theme
  }, icon), /*#__PURE__*/_react["default"].createElement(_Keyboard.Keyboard, _extends({
    target: focus ? 'document' : undefined
  }, keyboardProps), /*#__PURE__*/_react["default"].createElement(_StyledTextInput.StyledTextInput, _extends({
    "aria-label": a11yTitle,
    ref: inputRef,
    id: id,
    name: name,
    autoComplete: "off",
    plain: plain,
    placeholder: typeof placeholder === 'string' ? placeholder : undefined,
    icon: icon,
    reverse: reverse,
    focus: focus,
    focusIndicator: focusIndicator,
    textAlign: textAlign
  }, rest, extraProps, {
    defaultValue: renderLabel(defaultValue),
    value: renderLabel(value),
    readOnly: readOnly,
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
      setShowStyledPlaceholder(placeholder && typeof placeholder !== 'string' && !event.target.value);
      setValue(event.target.value);
      setActiveSuggestionIndex(resetSuggestionIndex);
      if (onChange) onChange(event);
    }
  }))), drop);
});
exports.TextInput = TextInput;
TextInput.displayName = 'TextInput';
TextInput.propTypes = _propTypes.TextInputPropTypes;