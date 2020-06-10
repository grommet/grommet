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

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

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
var defaultMessages = {
  enterSelect: '(Press Enter to Select)',
  suggestionsCount: 'suggestions available',
  suggestionsExist: 'This input has suggestions use arrow keys to navigate',
  suggestionIsOpen: 'Suggestions drop is open, continue to use arrow keys to navigate'
};
var TextInput = /*#__PURE__*/(0, _react.forwardRef)(function (_ref, ref) {
  var a11yTitle = _ref.a11yTitle,
      defaultValue = _ref.defaultValue,
      _ref$dropAlign = _ref.dropAlign,
      dropAlign = _ref$dropAlign === void 0 ? defaultDropAlign : _ref$dropAlign,
      dropHeight = _ref.dropHeight,
      dropTarget = _ref.dropTarget,
      dropProps = _ref.dropProps,
      icon = _ref.icon,
      id = _ref.id,
      _ref$messages = _ref.messages,
      messages = _ref$messages === void 0 ? defaultMessages : _ref$messages,
      name = _ref.name,
      _onBlur = _ref.onBlur,
      onChange = _ref.onChange,
      _onFocus = _ref.onFocus,
      onKeyDown = _ref.onKeyDown,
      onSelect = _ref.onSelect,
      onSuggestionsClose = _ref.onSuggestionsClose,
      onSuggestionsOpen = _ref.onSuggestionsOpen,
      placeholder = _ref.placeholder,
      plain = _ref.plain,
      readOnly = _ref.readOnly,
      reverse = _ref.reverse,
      suggestions = _ref.suggestions,
      valueProp = _ref.value,
      rest = _objectWithoutPropertiesLoose(_ref, ["a11yTitle", "defaultValue", "dropAlign", "dropHeight", "dropTarget", "dropProps", "icon", "id", "messages", "name", "onBlur", "onChange", "onFocus", "onKeyDown", "onSelect", "onSuggestionsClose", "onSuggestionsOpen", "placeholder", "plain", "readOnly", "reverse", "suggestions", "value"]);

  var theme = (0, _react.useContext)(_styledComponents.ThemeContext) || _defaultProps.defaultProps.theme;

  var announce = (0, _react.useContext)(_contexts.AnnounceContext);
  var formContext = (0, _react.useContext)(_FormContext.FormContext);
  var inputRef = (0, _utils.useForwardedRef)(ref);
  var dropRef = (0, _react.useRef)();
  var suggestionsRef = (0, _react.useRef)();
  var suggestionRefs = {}; // if this is a readOnly property, don't set a name with the form context
  // this allows Select to control the form context for the name.

  var _formContext$useFormI = formContext.useFormInput(readOnly ? undefined : name, valueProp),
      value = _formContext$useFormI[0],
      setValue = _formContext$useFormI[1];

  var _useState = (0, _react.useState)(),
      focus = _useState[0],
      setFocus = _useState[1];

  var _useState2 = (0, _react.useState)(),
      showDrop = _useState2[0],
      setShowDrop = _useState2[1]; // if we have no suggestions, close drop if it's open


  (0, _react.useEffect)(function () {
    if (showDrop && (!suggestions || !suggestions.length)) {
      setShowDrop(false);
      if (onSuggestionsClose) onSuggestionsClose();
    }
  }, [onSuggestionsClose, showDrop, suggestions]); // If we have suggestions and focus, open drop if it's closed.
  // This can occur when suggestions are tied to the value.
  // We don't want focus or showDrop in the dependencies because we
  // don't want to open the drop just because Esc close it.

  /* eslint-disable react-hooks/exhaustive-deps */

  (0, _react.useEffect)(function () {
    if (focus && !showDrop && suggestions && suggestions.length) {
      setShowDrop(true);
      if (onSuggestionsOpen) onSuggestionsOpen();
    }
  }, [onSuggestionsOpen, suggestions]);
  /* eslint-enable react-hooks/exhaustive-deps */

  var _useState3 = (0, _react.useState)(-1),
      activeSuggestionIndex = _useState3[0],
      setActiveSuggestionIndex = _useState3[1]; // reset activeSuggestionIndex when the drop is closed


  (0, _react.useEffect)(function () {
    if (activeSuggestionIndex !== -1 && !showDrop) {
      setActiveSuggestionIndex(-1);
    }
  }, [activeSuggestionIndex, showDrop]); // announce active suggestion

  (0, _react.useEffect)(function () {
    if (activeSuggestionIndex >= 0) {
      var label = stringLabel(suggestions[activeSuggestionIndex]);
      announce(label + " " + messages.enterSelect);
    }
  }, [activeSuggestionIndex, announce, messages, suggestions]);

  var _useState4 = (0, _react.useState)(-1),
      selectedSuggestionIndex = _useState4[0],
      setSelectedSuggestionIndex = _useState4[1]; // set selectedSuggestionIndex based on value and current suggestions


  (0, _react.useEffect)(function () {
    if (suggestions) {
      var suggestionValues = suggestions.map(function (suggestion) {
        return typeof suggestion === 'object' ? suggestion.value : suggestion;
      });
      setSelectedSuggestionIndex(suggestionValues.indexOf(value));
    } else setSelectedSuggestionIndex(-1);
  }, [suggestions, value]); // make sure activeSuggestion remains visible in scroll

  (0, _react.useEffect)(function () {
    var buttonNode = suggestionRefs[activeSuggestionIndex];
    var optionsNode = suggestionsRef.current;

    if (buttonNode && (0, _utils.isNodeAfterScroll)(buttonNode, optionsNode) && optionsNode.scrollTo) {
      optionsNode.scrollTo(0, buttonNode.offsetTop - (optionsNode.getBoundingClientRect().height - buttonNode.getBoundingClientRect().height));
    }

    if (buttonNode && (0, _utils.isNodeBeforeScroll)(buttonNode, optionsNode) && optionsNode.scrollTo) {
      optionsNode.scrollTo(0, buttonNode.offsetTop);
    }
  }, [activeSuggestionIndex, suggestionRefs]);
  var openDrop = (0, _react.useCallback)(function () {
    setShowDrop(true);
    announce(messages.suggestionIsOpen);
    announce(suggestions.length + " " + messages.suggestionsCount);
    if (onSuggestionsOpen) onSuggestionsOpen();
  }, [announce, messages.suggestionsCount, messages.suggestionIsOpen, onSuggestionsOpen, suggestions]);
  var closeDrop = (0, _react.useCallback)(function () {
    setShowDrop(false);
    if (messages.onSuggestionsClose) onSuggestionsClose();
    if (onSuggestionsClose) onSuggestionsClose();
  }, [messages.onSuggestionsClose, onSuggestionsClose]);

  var onNextSuggestion = function onNextSuggestion(event) {
    event.preventDefault();
    var nextActiveIndex = Math.min(activeSuggestionIndex + 1, suggestions.length - 1);
    setActiveSuggestionIndex(nextActiveIndex);
  };

  var onPreviousSuggestion = function onPreviousSuggestion(event) {
    event.preventDefault();
    var nextActiveIndex = Math.max(activeSuggestionIndex - 1, 0);
    setActiveSuggestionIndex(nextActiveIndex);
  };

  var showStyledPlaceholder = placeholder && typeof placeholder !== 'string' && !value;
  var drop;

  if (showDrop) {
    drop =
    /*#__PURE__*/
    // keyboard access needed here in case user clicks
    // and drags on scroll bar and focus shifts to drop
    _react["default"].createElement(_Keyboard.Keyboard, {
      onDown: function onDown(event) {
        return onNextSuggestion(event);
      },
      onUp: function onUp(event) {
        return onPreviousSuggestion(event);
      },
      onEnter: function onEnter(event) {
        // we stole the focus, give it back
        inputRef.current.focus();
        closeDrop();

        if (onSelect) {
          var adjustedEvent = event;
          adjustedEvent.suggestion = suggestions[activeSuggestionIndex];
          onSelect(adjustedEvent);
        }

        setValue(suggestions[activeSuggestionIndex]);
      }
    }, /*#__PURE__*/_react["default"].createElement(_Drop.Drop, _extends({
      ref: dropRef,
      id: id ? "text-input-drop__" + id : undefined,
      align: dropAlign,
      responsive: false,
      target: dropTarget || inputRef.current,
      onClickOutside: closeDrop,
      onEsc: closeDrop
    }, dropProps), /*#__PURE__*/_react["default"].createElement(ContainerBox, {
      ref: suggestionsRef,
      overflow: "auto",
      dropHeight: dropHeight
    }, /*#__PURE__*/_react["default"].createElement(_StyledTextInput.StyledSuggestions, null, /*#__PURE__*/_react["default"].createElement(_InfiniteScroll.InfiniteScroll, {
      items: suggestions,
      step: theme.select.step
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
        }, renderedLabel); // if we have a child, turn on plain, and hoverIndicator

      return /*#__PURE__*/_react["default"].createElement("li", {
        key: stringLabel(suggestion) + "-" + index,
        ref: itemRef
      }, /*#__PURE__*/_react["default"].createElement(_Button.Button, {
        active: activeSuggestionIndex === index || selectedSuggestionIndex === index,
        ref: function ref(r) {
          suggestionRefs[index] = r;
        },
        fill: true,
        plain: !child ? undefined : true,
        align: "start",
        kind: !child ? 'option' : undefined,
        hoverIndicator: !child ? undefined : 'background',
        label: !child ? renderedLabel : undefined,
        onClick: function onClick(event) {
          // we stole the focus, give it back
          inputRef.current.focus();
          closeDrop();

          if (onSelect) {
            event.persist();
            var adjustedEvent = event;
            adjustedEvent.suggestion = suggestion;
            adjustedEvent.target = inputRef.current;
            onSelect(adjustedEvent);
          }

          setValue(suggestion);
        },
        onMouseOver: function onMouseOver() {
          return setActiveSuggestionIndex(index);
        },
        onFocus: function onFocus() {
          return setActiveSuggestionIndex(index);
        }
      }, child));
    })))));
  }

  return /*#__PURE__*/_react["default"].createElement(_StyledTextInput.StyledTextInputContainer, {
    plain: plain
  }, showStyledPlaceholder && /*#__PURE__*/_react["default"].createElement(_StyledTextInput.StyledPlaceholder, null, placeholder), icon && /*#__PURE__*/_react["default"].createElement(_StyledTextInput.StyledIcon, {
    reverse: reverse,
    theme: theme
  }, icon), /*#__PURE__*/_react["default"].createElement(_Keyboard.Keyboard, {
    onEnter: function onEnter(event) {
      closeDrop();

      if (activeSuggestionIndex >= 0 && onSelect) {
        // prevent submitting forms when choosing a suggestion
        event.preventDefault();
        event.persist();
        var adjustedEvent = event;
        adjustedEvent.suggestion = suggestions[activeSuggestionIndex];
        adjustedEvent.target = inputRef.current;
        onSelect(adjustedEvent);
      }
    },
    onEsc: showDrop ? function (event) {
      closeDrop(); // we have to stop both synthetic events and native events
      // drop and layer should not close by pressing esc on this
      // input

      event.stopPropagation();
      event.nativeEvent.stopImmediatePropagation();
    } : undefined,
    onTab: showDrop ? closeDrop : undefined,
    onUp: showDrop && suggestions && suggestions.length > 0 && activeSuggestionIndex ? function (event) {
      onPreviousSuggestion(event);
    } : undefined,
    onDown: suggestions && suggestions.length > 0 ? function (event) {
      if (!showDrop) {
        openDrop();
      } else {
        onNextSuggestion(event);
      }
    } : undefined,
    onKeyDown: onKeyDown
  }, /*#__PURE__*/_react["default"].createElement(_StyledTextInput.StyledTextInput, _extends({
    "aria-label": a11yTitle,
    ref: inputRef,
    id: id,
    name: name,
    autoComplete: "off",
    plain: plain,
    placeholder: typeof placeholder === 'string' ? placeholder : undefined,
    icon: icon,
    reverse: reverse,
    focus: focus
  }, rest, {
    defaultValue: renderLabel(defaultValue),
    value: renderLabel(value),
    readOnly: readOnly,
    onFocus: function onFocus(event) {
      setFocus(true);

      if (suggestions && suggestions.length > 0) {
        announce(messages.suggestionsExist);
        openDrop();
      }

      if (_onFocus) _onFocus(event);
    },
    onBlur: function onBlur(event) {
      setFocus(false);
      if (_onBlur) _onBlur(event);
    },
    onChange: readOnly ? undefined : function (event) {
      setValue(event.target.value);
      if (onChange) onChange(event);
    }
  }))), drop);
});
TextInput.displayName = 'TextInput';
var TextInputDoc;

if (process.env.NODE_ENV !== 'production') {
  // eslint-disable-next-line global-require
  TextInputDoc = require('./doc').doc(TextInput);
}

var TextInputWrapper = TextInputDoc || TextInput;
exports.TextInput = TextInputWrapper;