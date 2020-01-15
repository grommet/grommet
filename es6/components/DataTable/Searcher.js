import React, { useEffect, useRef } from 'react';
import { compose } from 'recompose';
import { withTheme } from 'styled-components';
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
      property = _ref.property,
      theme = _ref.theme;
  var inputRef = useRef();
  var needsFocus = filtering === property;
  useEffect(function () {
    if (inputRef && needsFocus) {
      inputRef.current.focus();
    }
  }, [needsFocus, inputRef]);
  return filtering === property ? React.createElement(Keyboard, {
    onEsc: function onEsc() {
      return onFiltering(undefined);
    }
  }, React.createElement(Box, {
    flex: true,
    pad: {
      horizontal: 'small'
    }
  }, React.createElement(TextInput, {
    name: "search-" + property,
    ref: inputRef,
    value: filters[property],
    onChange: function onChange(event) {
      return onFilter(property, event.target.value);
    },
    onBlur: function onBlur() {
      return onFiltering(undefined);
    }
  }))) : React.createElement(React.Fragment, null, filters[property] ? React.createElement(Box, {
    flex: false,
    pad: {
      horizontal: 'small'
    },
    direction: "row",
    align: "center"
  }, React.createElement(Text, null, filters[property])) : null, React.createElement(Button, {
    a11yTitle: "focus-search-" + property,
    icon: React.createElement(FormSearch, {
      color: normalizeColor(filtering === property ? 'brand' : 'border', theme)
    }),
    hoverIndicator: true,
    onClick: function onClick() {
      return onFiltering(filtering === property ? undefined : property);
    }
  }));
};

Searcher.defaultProps = {};
Object.setPrototypeOf(Searcher.defaultProps, defaultProps);
var SearcherWrapper = compose(withTheme)(Searcher);
export { SearcherWrapper as Searcher };