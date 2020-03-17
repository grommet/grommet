function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

import React, { forwardRef, useContext, useMemo, useState } from 'react';
import { ThemeContext } from 'styled-components';
import { normalizeColor } from '../../utils';
import { Box } from '../Box';
import { Button } from '../Button';
import { Collapsible } from '../Collapsible';
import { Heading } from '../Heading';
var AccordionPanel = forwardRef(function (_ref, ref) {
  var active = _ref.active,
      animate = _ref.animate,
      children = _ref.children,
      header = _ref.header,
      label = _ref.label,
      onClick = _ref.onClick,
      _onMouseOut = _ref.onMouseOut,
      _onMouseOver = _ref.onMouseOver,
      onPanelChange = _ref.onPanelChange,
      _onFocus = _ref.onFocus,
      _onBlur = _ref.onBlur,
      rest = _objectWithoutPropertiesLoose(_ref, ["active", "animate", "children", "header", "label", "onClick", "onMouseOut", "onMouseOver", "onPanelChange", "onFocus", "onBlur"]);

  var theme = useContext(ThemeContext);

  var _useState = useState(undefined),
      hover = _useState[0],
      setHover = _useState[1];

  var iconColor = useMemo(function () {
    return normalizeColor(theme.accordion.icons.color || 'control', theme);
  }, [theme]);
  var AccordionIcon = useMemo(function () {
    return active ? theme.accordion.icons.collapse : theme.accordion.icons.expand;
  }, [active, theme.accordion.icons]);
  return React.createElement(Box, {
    ref: ref,
    flex: false,
    onClick: onClick
  }, React.createElement(Button, {
    role: "tab",
    "aria-selected": active,
    "aria-expanded": active,
    onClick: onPanelChange,
    onMouseOver: function onMouseOver(event) {
      setHover(theme.dark ? 'light-4' : 'dark-3');
      if (_onMouseOver) _onMouseOver(event);
    },
    onMouseOut: function onMouseOut(event) {
      setHover(undefined);
      if (_onMouseOut) _onMouseOut(event);
    },
    onFocus: function onFocus(event) {
      setHover(theme.dark ? 'light-4' : 'dark-3');
      if (_onFocus) _onFocus(event);
    },
    onBlur: function onBlur(event) {
      setHover(undefined);
      if (_onBlur) _onBlur(event);
    }
  }, header || React.createElement(Box, _extends({
    align: "center",
    direction: "row",
    justify: "between"
  }, rest), typeof label === 'string' ? React.createElement(Box, {
    pad: {
      horizontal: 'xsmall'
    }
  }, React.createElement(Heading, {
    level: theme.accordion.heading && theme.accordion.heading.level || 4,
    color: hover
  }, label)) : label, AccordionIcon && React.createElement(Box, {
    pad: {
      horizontal: 'small'
    }
  }, React.createElement(AccordionIcon, {
    color: iconColor
  })))), React.createElement(Box, {
    border: theme.accordion.border
  }, animate ? React.createElement(Collapsible, {
    open: active
  }, children) : active && children));
});
AccordionPanel.displayName = 'AccordionPanel';
var AccordionPanelDoc;

if (process.env.NODE_ENV !== 'production') {
  // eslint-disable-next-line global-require
  AccordionPanelDoc = require('./doc').doc(AccordionPanel);
}

var AccordionPanelWrapper = AccordionPanelDoc || AccordionPanel;
export { AccordionPanelWrapper as AccordionPanel };