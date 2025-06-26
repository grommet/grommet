import React, { useContext, useEffect, useRef, useState } from 'react';
import { FormSearch } from 'grommet-icons/icons/FormSearch';
import { Box } from '../Box';
import { Button } from '../Button';
import { Keyboard } from '../Keyboard';
import { Text } from '../Text';
import { TextInput } from '../TextInput';
import { MessageContext } from '../../contexts/MessageContext';
import { normalizeColor } from '../../utils';
import { useThemeValue } from '../../utils/useThemeValue';
var Searcher = function Searcher(_ref) {
  var filtering = _ref.filtering,
    filters = _ref.filters,
    messages = _ref.messages,
    onFilter = _ref.onFilter,
    onFiltering = _ref.onFiltering,
    property = _ref.property;
  var _useThemeValue = useThemeValue(),
    theme = _useThemeValue.theme;
  var inputRef = useRef();
  var buttonRef = useRef();
  var needsFocus = filtering === property;
  var _useState = useState(false),
    buttonNeedsFocus = _useState[0],
    setButtonNeedsFocus = _useState[1];
  var _useContext = useContext(MessageContext),
    format = _useContext.format;
  useEffect(function () {
    if (inputRef && needsFocus) {
      inputRef.current.focus();
    }
  }, [needsFocus, inputRef]);

  // Focus the button after closing the search
  useEffect(function () {
    if (buttonNeedsFocus && buttonRef.current) {
      buttonRef.current.focus();
      setButtonNeedsFocus(false);
    }
  }, [buttonNeedsFocus]);
  var a11yTitle = format({
    id: 'dataTable.searchBy',
    messages: messages,
    values: {
      property: property
    }
  });
  return filtering === property ? /*#__PURE__*/React.createElement(Keyboard, {
    onEsc: function onEsc() {
      onFiltering(undefined);
      setButtonNeedsFocus(true);
    }
  }, /*#__PURE__*/React.createElement(Box, {
    width: {
      min: 'xsmall'
    },
    flex: true,
    pad: {
      horizontal: 'small'
    }
  }, /*#__PURE__*/React.createElement(TextInput, {
    name: "search-" + property,
    a11yTitle: a11yTitle,
    ref: inputRef,
    value: filters[property],
    onChange: function onChange(event) {
      return onFilter(property, event.target.value);
    },
    onBlur: function onBlur() {
      return onFiltering(undefined);
    }
  }))) : /*#__PURE__*/React.createElement(React.Fragment, null, filters[property] ? /*#__PURE__*/React.createElement(Box, {
    flex: false,
    pad: {
      horizontal: 'small'
    },
    direction: "row",
    align: "center"
  }, /*#__PURE__*/React.createElement(Text, null, filters[property])) : null, /*#__PURE__*/React.createElement(Button, {
    ref: buttonRef,
    a11yTitle: a11yTitle,
    icon: /*#__PURE__*/React.createElement(FormSearch, {
      color: normalizeColor(filtering === property ? 'brand' : 'border', theme)
    }),
    hoverIndicator: true,
    onClick: function onClick() {
      return onFiltering(filtering === property ? undefined : property);
    }
  }));
};
Searcher.displayName = 'Searcher';
export { Searcher };