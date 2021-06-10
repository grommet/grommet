var _excluded = ["control", "separator", "size"];

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

import React, { useContext } from 'react';
import { ThemeContext } from 'styled-components';
import { StyledContainer, StyledPaginationButton, StyledSeparator } from './StyledPageControl';
export var PageControl = function PageControl(_ref) {
  var control = _ref.control,
      separator = _ref.separator,
      sizeProp = _ref.size,
      rest = _objectWithoutPropertiesLoose(_ref, _excluded);

  var theme = useContext(ThemeContext);
  var size = sizeProp || 'medium';
  return /*#__PURE__*/React.createElement(StyledContainer, {
    as: "li",
    size: size
  }, separator ? /*#__PURE__*/React.createElement(StyledSeparator, {
    size: size
  }, "\u2026") : /*#__PURE__*/React.createElement(StyledPaginationButton, _extends({
    a11yTitle: "Go to page " + control,
    fill: true,
    kind: theme.pagination.button,
    label: control,
    size: size
  }, rest)));
};