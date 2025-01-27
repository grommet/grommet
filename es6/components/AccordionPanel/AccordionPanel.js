var _excluded = ["children", "header", "id", "label", "onClick", "onMouseOut", "onMouseOver", "onFocus", "onBlur"];
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function _objectWithoutPropertiesLoose(r, e) { if (null == r) return {}; var t = {}; for (var n in r) if ({}.hasOwnProperty.call(r, n)) { if (-1 !== e.indexOf(n)) continue; t[n] = r[n]; } return t; }
import React, { forwardRef, useContext, useMemo, useState } from 'react';
import { normalizeColor, parseMetricToNum, useId } from '../../utils';
import { Box } from '../Box';
import { Button } from '../Button';
import { Collapsible } from '../Collapsible';
import { Heading } from '../Heading';
import { AccordionContext } from '../Accordion/AccordionContext';
import { AccordionPanelPropTypes } from './propTypes';
import { useThemeValue } from '../../utils/useThemeValue';
var AccordionPanel = /*#__PURE__*/forwardRef(function (_ref, ref) {
  var children = _ref.children,
    header = _ref.header,
    id = _ref.id,
    label = _ref.label,
    onClick = _ref.onClick,
    _onMouseOut = _ref.onMouseOut,
    _onMouseOver = _ref.onMouseOver,
    _onFocus = _ref.onFocus,
    _onBlur = _ref.onBlur,
    rest = _objectWithoutPropertiesLoose(_ref, _excluded);
  var panelButtonId = useId();
  var _useThemeValue = useThemeValue(),
    theme = _useThemeValue.theme;
  var _useContext = useContext(AccordionContext),
    active = _useContext.active,
    animate = _useContext.animate,
    level = _useContext.level,
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
  });

  // accordion.hover.color will be deprecated in v3.
  if (JSON.stringify(theme.accordion.hover.color) !== defaultHoverColor) console.warn("The theme style for accordion.hover.color is deprecated,\n        use accordion.hover.heading.color instead.");

  // accordion.hover.heading.color will trump accordion.hover.color in case
  // the user sets its value to be any other value than the
  // default value (defaultHoverColor).
  // accordion.hover.color will be deprecated in v3.
  var headingColor = theme.accordion.hover && JSON.stringify(theme.accordion.hover.heading.color) !== defaultHoverColor ? theme.accordion.hover.heading.color : theme.accordion.hover.color;
  var contentBorder = theme.accordion.border;
  var panelBorder = theme.accordion.panel.border;
  var abutMargin;
  if (panelBorder)
    // abutMargin 'bottom' is set to overlap adjacent border panels
    abutMargin = {
      bottom: "-" + parseMetricToNum(
      // in case border.size defined as a t-shirt size
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
    id: panelButtonId,
    "aria-expanded": active,
    plain: theme.button["default"] ? true : undefined,
    onClick: onPanelChange,
    hoverIndicator: theme.accordion.hover.background,
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
    justify: "between",
    id: id
  }, rest), typeof label === 'string' ? /*#__PURE__*/React.createElement(Box, {
    pad: {
      horizontal: 'xsmall'
    }
  }, /*#__PURE__*/React.createElement(Heading, {
    level: level || theme.accordion.heading && theme.accordion.heading.level || 4,
    margin: theme.accordion.heading && theme.accordion.heading.margin || undefined,
    color: hover
  }, label)) : label, AccordionIcon && /*#__PURE__*/React.createElement(Box, {
    pad: {
      horizontal: 'small'
    },
    width: {
      min: 'fit-content'
    }
  }, /*#__PURE__*/React.createElement(AccordionIcon, {
    color: iconColor
  })))), /*#__PURE__*/React.createElement(Box, {
    role: "region",
    border: contentBorder,
    "aria-labelledby": panelButtonId
  }, animate ? /*#__PURE__*/React.createElement(Collapsible, {
    open: active
  }, children) : active && children));
});
AccordionPanel.displayName = 'AccordionPanel';
AccordionPanel.propTypes = AccordionPanelPropTypes;
export { AccordionPanel };