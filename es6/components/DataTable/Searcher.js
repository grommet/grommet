import React, { useContext, useEffect, useRef } from 'react';
import { ThemeContext } from 'styled-components';
import { FormSearch } from 'grommet-icons/icons/FormSearch';
import { defaultProps } from '../../default-props';
import { Box } from '../Box';
import { Button } from '../Button';
import { Keyboard } from '../Keyboard';
import { Text } from '../Text';
import { TextInput } from '../TextInput';
import { normalizeColor } from '../../utils';

var Searcher = function Searcher(_ref) {
  var filtering = _ref.filtering,
      filters = _ref.filters,
      onFilter = _ref.onFilter,
      onFiltering = _ref.onFiltering,
      property = _ref.property;
  var theme = useContext(ThemeContext) || defaultProps.theme;
  var inputRef = useRef();
  var needsFocus = filtering === property;
  useEffect(function () {
    if (inputRef && needsFocus) {
      inputRef.current.focus();
    }
  }, [needsFocus, inputRef]);
  return filtering === property ? /*#__PURE__*/React.createElement(Keyboard, {
    onEsc: function onEsc() {
      return onFiltering(undefined);
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
    a11yTitle: "Search by " + property,
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
    a11yTitle: "Open search by " + property,
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
Searcher.defaultProps = {};
Object.setPrototypeOf(Searcher.defaultProps, defaultProps);
export { Searcher };