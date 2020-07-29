function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

import React, { forwardRef, useContext, useMemo, useState } from 'react';
import { ThemeContext } from 'styled-components';
import { defaultProps } from '../../default-props';
import { normalizeColor, parseMetricToNum } from '../../utils';
import { Box } from '../Box';
import { Button } from '../Button';
import { Collapsible } from '../Collapsible';
import { Heading } from '../Heading';
import { AccordionContext } from '../Accordion/AccordionContext';
var AccordionPanel = /*#__PURE__*/forwardRef(function (_ref, ref) {
  var children = _ref.children,
      header = _ref.header,
      label = _ref.label,
      onClick = _ref.onClick,
      _onMouseOut = _ref.onMouseOut,
      _onMouseOver = _ref.onMouseOver,
      _onFocus = _ref.onFocus,
      _onBlur = _ref.onBlur,
      rest = _objectWithoutPropertiesLoose(_ref, ["children", "header", "label", "onClick", "onMouseOut", "onMouseOver", "onFocus", "onBlur"]);

  var theme = useContext(ThemeContext) || defaultProps.theme;

  var _useContext = useContext(AccordionContext),
      active = _useContext.active,
      animate = _useContext.animate,
      onPanelChange = _useContext.onPanelChange;

  var _useState = useState(undefined),
      hover = _useState[0],
      setHover = _useState[1];

  var _useState2 = useState(),
      focus = _useState2[0],
      setFocus = _useState2[1];

  var iconColor = useMemo(function () {
    return normalizeColor(theme.accordion.icons.color || 'control', theme);
  }, [theme]);
  var AccordionIcon = useMemo(function () {
    return active ? theme.accordion.icons.collapse : theme.accordion.icons.expand;
  }, [active, theme.accordion.icons]);
  var defaultHoverColor = JSON.stringify({
    dark: 'light-4',
    light: 'dark-3'
  }); // accordion.hover.color will be deprecated in v3.

  if (JSON.stringify(theme.accordion.hover.color) !== defaultHoverColor) console.warn("The theme style for accordion.hover.color is deprecated, \n        use accordion.hover.heading.color instead."); // accordion.hover.heading.color will trump accordion.hover.color in case
  // the user sets its value to be any other value than the
  // default value (defaultHoverColor).
  // accordion.hover.color will be deprecated in v3.

  var headingColor = theme.accordion.hover && JSON.stringify(theme.accordion.hover.heading.color) !== defaultHoverColor ? theme.accordion.hover.heading.color : theme.accordion.hover.color;
  var contentBorder = theme.accordion.border;
  var panelBorder = theme.accordion.panel.border;
  var abutMargin;
  if (panelBorder) // abutMargin 'bottom' is set to overlap adjacent border panels
    abutMargin = {
      bottom: "-" + parseMetricToNum( // in case border.size defined as a t-shirt size
      // or in case border size is a custom size i.e. '5px'
      theme.global.borderSize[panelBorder.size] || panelBorder.size || theme.global.borderSize.xsmall // '-1px'
      ) + "px"
    };
  return /*#__PURE__*/React.createElement(Box, {
    ref: ref,
    flex: false,
    onClick: onClick,
    border: panelBorder,
    margin: abutMargin
  }, /*#__PURE__*/React.createElement(Button, {
    role: "tab",
    "aria-selected": active,
    "aria-expanded": active,
    plain: theme.button["default"] ? true : undefined,
    onClick: onPanelChange,
    onMouseOver: function onMouseOver(event) {
      setHover(headingColor);
      if (_onMouseOver) _onMouseOver(event);
    },
    onMouseOut: function onMouseOut(event) {
      setHover(undefined);
      if (_onMouseOut) _onMouseOut(event);
    },
    onFocus: function onFocus(event) {
      setHover(headingColor);
      setFocus(true);
      if (_onFocus) _onFocus(event);
    },
    onBlur: function onBlur(event) {
      setHover(undefined);
      setFocus(false);
      if (_onBlur) _onBlur(event);
    },
    style: focus ? {
      zIndex: 1
    } : undefined
  }, header || /*#__PURE__*/React.createElement(Box, _extends({
    align: "center",
    direction: "row",
    justify: "between"
  }, rest), typeof label === 'string' ? /*#__PURE__*/React.createElement(Box, {
    pad: {
      horizontal: 'xsmall'
    }
  }, /*#__PURE__*/React.createElement(Heading, {
    level: theme.accordion.heading && theme.accordion.heading.level || 4,
    margin: theme.accordion.heading && theme.accordion.heading.margin || undefined,
    color: hover
  }, label)) : label, AccordionIcon && /*#__PURE__*/React.createElement(Box, {
    pad: {
      horizontal: 'small'
    }
  }, /*#__PURE__*/React.createElement(AccordionIcon, {
    color: iconColor
  })))), /*#__PURE__*/React.createElement(Box, {
    border: contentBorder
  }, animate ? /*#__PURE__*/React.createElement(Collapsible, {
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