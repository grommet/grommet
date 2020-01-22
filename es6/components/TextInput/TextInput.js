function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

import React, { forwardRef, isValidElement, useContext, useEffect, useRef, useState } from 'react';
import styled, { ThemeContext } from 'styled-components';
import { defaultProps } from '../../default-props';
import { Box } from '../Box';
import { Button } from '../Button';
import { Drop } from '../Drop';
import { InfiniteScroll } from '../InfiniteScroll';
import { Keyboard } from '../Keyboard';
import { AnnounceContext } from '../../contexts';
import { sizeStyle } from '../../utils';
import { StyledTextInput, StyledTextInputContainer, StyledPlaceholder, StyledSuggestions } from './StyledTextInput';

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

var ContainerBox = styled(Box).withConfig({
  displayName: "TextInput__ContainerBox",
  componentId: "sc-1ai0c08-0"
})(["", ";@media screen and (-ms-high-contrast:active),(-ms-high-contrast:none){width:100%;}"], function (props) {
  return props.dropHeight ? sizeStyle('max-height', props.dropHeight, props.theme) : 'max-height: inherit;';
});
var TextInput = forwardRef(function (_ref, ref) {
  var defaultValue = _ref.defaultValue,
      _ref$dropAlign = _ref.dropAlign,
      dropAlign = _ref$dropAlign === void 0 ? {
    top: 'bottom',
    left: 'left'
  } : _ref$dropAlign,
      dropHeight = _ref.dropHeight,
      dropTarget = _ref.dropTarget,
      dropProps = _ref.dropProps,
      id = _ref.id,
      _ref$messages = _ref.messages,
      messages = _ref$messages === void 0 ? {
    enterSelect: '(Press Enter to Select)',
    suggestionsCount: 'suggestions available',
    suggestionsExist: 'This input has suggestions use arrow keys to navigate',
    suggestionIsOpen: 'Suggestions drop is open, continue to use arrow keys to navigate'
  } : _ref$messages,
      _onBlur = _ref.onBlur,
      _onChange = _ref.onChange,
      _onFocus = _ref.onFocus,
      onKeyDown = _ref.onKeyDown,
      onSelect = _ref.onSelect,
      onSuggestionsClose = _ref.onSuggestionsClose,
      onSuggestionsOpen = _ref.onSuggestionsOpen,
      placeholder = _ref.placeholder,
      plain = _ref.plain,
      suggestions = _ref.suggestions,
      value = _ref.value,
      rest = _objectWithoutPropertiesLoose(_ref, ["defaultValue", "dropAlign", "dropHeight", "dropTarget", "dropProps", "id", "messages", "onBlur", "onChange", "onFocus", "onKeyDown", "onSelect", "onSuggestionsClose", "onSuggestionsOpen", "placeholder", "plain", "suggestions", "value"]);

  var theme = useContext(ThemeContext) || defaultProps.theme;
  var announce = useContext(AnnounceContext);
  var inputRef = useRef();
  var dropRef = useRef();

  var _useState = useState(true),
      empty = _useState[0],
      setEmpty = _useState[1];

  var _useState2 = useState(),
      focus = _useState2[0],
      setFocus = _useState2[1];

  var _useState3 = useState(),
      showDrop = _useState3[0],
      setShowDrop = _useState3[1]; // if we have no suggestions, close drop if it's open


  useEffect(function () {
    if (showDrop && (!suggestions || !suggestions.length)) {
      setShowDrop(false);
      if (onSuggestionsClose) onSuggestionsClose();
    }
  }, [onSuggestionsClose, showDrop, suggestions]);

  var _useState4 = useState(-1),
      activeSuggestionIndex = _useState4[0],
      setActiveSuggestionIndex = _useState4[1]; // reset activeSuggestionIndex when the drop is closed


  useEffect(function () {
    if (activeSuggestionIndex !== -1 && !showDrop) {
      setActiveSuggestionIndex(-1);
    }
  }, [activeSuggestionIndex, showDrop]); // announce active suggestion

  useEffect(function () {
    if (activeSuggestionIndex >= 0) {
      var label = stringLabel(suggestions[activeSuggestionIndex]);
      announce(label + " " + messages.enterSelect);
    }
  }, [activeSuggestionIndex, announce, messages, suggestions]);

  var _useState5 = useState(-1),
      selectedSuggestionIndex = _useState5[0],
      setSelectedSuggestionIndex = _useState5[1]; // set selectedSuggestionIndex based on value and current suggestions


  useEffect(function () {
    if (suggestions) {
      var suggestionValues = suggestions.map(function (suggestion) {
        return typeof suggestion === 'object' ? suggestion.value : suggestion;
      });
      setSelectedSuggestionIndex(suggestionValues.indexOf(value));
    } else setSelectedSuggestionIndex(-1);
  }, [suggestions, value]);

  var openDrop = function openDrop() {
    setShowDrop(true);
    announce(messages.suggestionIsOpen);
    announce(suggestions.length + " " + messages.suggestionsCount);
    if (onSuggestionsOpen) onSuggestionsOpen();
  };

  var closeDrop = function closeDrop() {
    setShowDrop(false);
    if (messages.onSuggestionsClose) onSuggestionsClose();
  };

  var showStyledPlaceholder = placeholder && typeof placeholder !== 'string' && empty && !value;
  var drop;

  if (showDrop) {
    drop = React.createElement(Drop, _extends({
      ref: dropRef,
      id: id ? "text-input-drop__" + id : undefined,
      align: dropAlign,
      responsive: false,
      target: dropTarget || (ref || inputRef).current,
      onClickOutside: closeDrop,
      onEsc: closeDrop
    }, dropProps), React.createElement(ContainerBox, {
      overflow: "auto",
      dropHeight: dropHeight
    }, React.createElement(StyledSuggestions, null, React.createElement(InfiniteScroll, {
      items: suggestions,
      step: theme.select.step
    }, function (suggestion, index) {
      var plainLabel = typeof suggestion === 'object' && typeof isValidElement(suggestion.label);
      return React.createElement("li", {
        key: stringLabel(suggestion) + "-" + index
      }, React.createElement(Button, {
        active: activeSuggestionIndex === index || selectedSuggestionIndex === index,
        fill: true,
        hoverIndicator: "background",
        onClick: function onClick(event) {
          // we stole the focus, give it back
          inputRef.current.focus();
          closeDrop();

          if (onSelect) {
            event.persist();
            var adjustedEvent = event;
            adjustedEvent.suggestion = suggestion;
            adjustedEvent.target = (ref || inputRef).current;
            onSelect(adjustedEvent);
          }
        }
      }, plainLabel ? renderLabel(suggestion) : React.createElement(Box, {
        align: "start",
        pad: "small"
      }, renderLabel(suggestion))));
    }))));
  }

  return React.createElement(StyledTextInputContainer, {
    plain: plain
  }, showStyledPlaceholder && React.createElement(StyledPlaceholder, null, placeholder), React.createElement(Keyboard, {
    onEnter: function onEnter(event) {
      closeDrop();

      if (activeSuggestionIndex >= 0 && onSelect) {
        // prevent submitting forms when choosing a suggestion
        event.preventDefault();
        event.persist();
        var adjustedEvent = event;
        adjustedEvent.suggestion = suggestions[activeSuggestionIndex];
        adjustedEvent.target = (ref || inputRef).current;
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
      event.preventDefault();
      var index = Math.max(activeSuggestionIndex - 1, 0);
      setActiveSuggestionIndex(index);
    } : undefined,
    onDown: suggestions && suggestions.length > 0 ? function (event) {
      if (!showDrop) {
        openDrop();
      } else {
        event.preventDefault();
        var index = Math.min(activeSuggestionIndex + 1, suggestions.length - 1);
        setActiveSuggestionIndex(index);
      }
    } : undefined,
    onKeyDown: onKeyDown
  }, React.createElement(StyledTextInput, _extends({
    id: id,
    ref: ref || inputRef,
    autoComplete: "off",
    plain: plain,
    placeholder: typeof placeholder === 'string' ? placeholder : undefined,
    focus: focus
  }, rest, {
    defaultValue: renderLabel(defaultValue),
    value: renderLabel(value),
    onFocus: function onFocus(event) {
      setFocus(true);

      if (suggestions && suggestions.length > 0) {
        announce(messages.suggestionsExist);
      }

      setShowDrop(true);

      if (_onFocus) {
        _onFocus(event);
      }
    },
    onBlur: function onBlur(event) {
      setFocus(false); // This will be called when the user clicks on a suggestion,
      // check for that and don't remove the drop in that case.
      // Drop will already have removed itself if the user has focused
      // outside of the Drop.

      if (!dropRef.current) {
        closeDrop();

        if (_onBlur) {
          _onBlur(event);
        }
      }
    },
    onChange: function onChange(event) {
      setEmpty(!event.target.value);

      if (_onChange) {
        _onChange(event);
      }
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
export { TextInputWrapper as TextInput };