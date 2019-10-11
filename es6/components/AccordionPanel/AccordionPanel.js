function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

import React, { useState } from 'react';
import { compose } from 'recompose';
import { withTheme } from 'styled-components';
import { normalizeColor } from '../../utils';
import { defaultProps } from '../../default-props';
import { Box } from '../Box';
import { Button } from '../Button';
import { Collapsible } from '../Collapsible';
import { Heading } from '../Heading';
import { withForwardRef } from '../hocs';
import { AccordionContext } from '../Accordion/AccordionContext';

var AccordionPanel = function AccordionPanel(_ref) {
  var children = _ref.children,
      header = _ref.header,
      label = _ref.label,
      theme = _ref.theme,
      onMouseOut = _ref.onMouseOut,
      onMouseOver = _ref.onMouseOver,
      onFocus = _ref.onFocus,
      onBlur = _ref.onBlur,
      rest = _objectWithoutPropertiesLoose(_ref, ["children", "header", "label", "theme", "onMouseOut", "onMouseOver", "onFocus", "onBlur"]);

  var _useState = useState(undefined),
      hover = _useState[0],
      setHover = _useState[1];

  var iconColor = normalizeColor(theme.accordion.icons.color || 'control', theme);

  var onHandleMouseOver = function onHandleMouseOver() {
    var dark = theme.dark;
    setHover(dark ? 'light-4' : 'dark-3');

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    if (onMouseOver) onMouseOver(args);
  };

  var onHandleMouseOut = function onHandleMouseOut() {
    setHover(undefined);

    for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
      args[_key2] = arguments[_key2];
    }

    if (onMouseOut) onMouseOut(args);
  };

  var onHandleFocus = function onHandleFocus() {
    var dark = theme.dark;
    setHover(dark ? 'light-4' : 'dark-3');

    for (var _len3 = arguments.length, args = new Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
      args[_key3] = arguments[_key3];
    }

    if (onFocus) onFocus(args);
  };

  var onHandleBlur = function onHandleBlur() {
    setHover(undefined);

    for (var _len4 = arguments.length, args = new Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
      args[_key4] = arguments[_key4];
    }

    if (onBlur) onBlur(args);
  };

  return React.createElement(AccordionContext.Consumer, null, function (panelContext) {
    var active = panelContext.active,
        animate = panelContext.animate,
        onPanelChange = panelContext.onPanelChange;
    var AccordionIcon = active ? theme.accordion.icons.collapse : theme.accordion.icons.expand;
    return React.createElement(Box, {
      flex: false
    }, React.createElement(Button, {
      role: "tab",
      "aria-selected": active,
      "aria-expanded": active,
      onClick: onPanelChange,
      onMouseOver: onHandleMouseOver,
      onMouseOut: onHandleMouseOut,
      onFocus: onHandleFocus,
      onBlur: onHandleBlur
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
};

AccordionPanel.defaultProps = {};
Object.setPrototypeOf(AccordionPanel.defaultProps, defaultProps);
var AccordionPanelDoc;

if (process.env.NODE_ENV !== 'production') {
  // eslint-disable-next-line global-require
  AccordionPanelDoc = require('./doc').doc(AccordionPanel);
}

var AccordionPanelWrapper = compose(withTheme, withForwardRef)(AccordionPanelDoc || AccordionPanel);
export { AccordionPanelWrapper as AccordionPanel };