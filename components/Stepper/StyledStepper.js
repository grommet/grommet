"use strict";

exports.__esModule = true;
exports.StyledSubStepsList = exports.StyledStepSupportingContent = exports.StyledStepLabel = exports.StyledStepItem = exports.StyledStepContent = exports.StyledStepButton = exports.StyledIndicator = exports.StyledConnector = void 0;
var _styledComponents = _interopRequireWildcard(require("styled-components"));
var _isPropValid = _interopRequireDefault(require("@emotion/is-prop-valid"));
var _utils = require("../../utils");
var _Box = require("../Box");
var _Text = require("../Text");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
var cache;
function _interopRequireWildcard(e, t) { if (!t && e && e.__esModule) return e; var r, c, a = Object.defineProperty, n = { __proto__: null, "default": e }; if (Object(e) !== e) return n; if (cache || "function" != typeof WeakMap || (cache = new WeakMap()), cache) { if (cache.has(e)) return cache.get(e); cache.set(e, n); } for (c in e) "default" !== c && {}.hasOwnProperty.call(e, c) && ((r = a && Object.getOwnPropertyDescriptor(e, c)) && (r.get || r.set) ? a(n, c, r) : n[c] = e[c]); return n; }
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); } // SPDX-FileCopyrightText: © Hewlett Packard Enterprise Development LP
// SPDX-License-Identifier: Apache-2.0
var getIconSize = function getIconSize(theme, size) {
  var _theme$global;
  return ((_theme$global = theme.global) == null || (_theme$global = _theme$global.edgeSize) == null ? void 0 : _theme$global[size]) || size;
};
var getMetricSize = function getMetricSize(theme, size) {
  var _theme$global2, _theme$global3;
  return ((_theme$global2 = theme.global) == null || (_theme$global2 = _theme$global2.edgeSize) == null ? void 0 : _theme$global2[size]) || ((_theme$global3 = theme.global) == null || (_theme$global3 = _theme$global3.size) == null ? void 0 : _theme$global3[size]) || size;
};
var getPadSize = function getPadSize(theme, pad, side) {
  var _theme$global4;
  if (pad === void 0) {
    pad = 'xxsmall';
  }
  var value = pad;
  if (typeof pad === 'object' && pad !== null) {
    var _ref, _ref2, _pad$logicalSide;
    var axis = side === 'top' || side === 'bottom' ? 'vertical' : 'horizontal';
    var logicalSide;
    if (side === 'left') logicalSide = theme.dir === 'rtl' ? 'end' : 'start';
    if (side === 'right') logicalSide = theme.dir === 'rtl' ? 'start' : 'end';

    // Match Box's edgeStyle: logical sides override physical sides and axes.
    value = (_ref = (_ref2 = (_pad$logicalSide = pad[logicalSide]) != null ? _pad$logicalSide : pad[side]) != null ? _ref2 : pad[axis]) != null ? _ref : 'none';
  }
  return ((_theme$global4 = theme.global) == null || (_theme$global4 = _theme$global4.edgeSize) == null ? void 0 : _theme$global4[value]) || (value === 'none' ? '0px' : value);
};
var getTextMetric = function getTextMetric(theme, size, metric) {
  var _theme$text, _theme$text2;
  return ((_theme$text = theme.text) == null || (_theme$text = _theme$text[size]) == null ? void 0 : _theme$text[metric]) || ((_theme$text2 = theme.text) == null || (_theme$text2 = _theme$text2.medium) == null ? void 0 : _theme$text2[metric]);
};
var getBorderWidth = function getBorderWidth(theme, size) {
  var _theme$global5, _theme$global6;
  return ((_theme$global5 = theme.global) == null || (_theme$global5 = _theme$global5.borderSize) == null ? void 0 : _theme$global5[size]) || size || ((_theme$global6 = theme.global) == null || (_theme$global6 = _theme$global6.borderSize) == null ? void 0 : _theme$global6.xsmall);
};
var adjustHoverColor = function adjustHoverColor(color, theme) {
  return "color-mix(in srgb, " + (0, _utils.normalizeColor)(color, theme) + " 90%, " + (theme.dark ? 'white' : 'black') + " 10%)";
};
var sizeStyle = function sizeStyle(sizeProp, theme) {
  var size = sizeProp || 'medium';
  var data = theme.text[size];
  if (data) {
    return (0, _styledComponents.css)(["font-size:", ";line-height:", ";"], data.size, data.height);
  }
  return (0, _styledComponents.css)(["font-size:", ";line-height:normal;"], size);
};
var iconSizeStyle = function iconSizeStyle(sizeProp, theme) {
  var size = getIconSize(theme, sizeProp);
  return (0, _styledComponents.css)(["width:", ";max-width:", ";height:", ";max-height:", ";"], size, size, size, size);
};

// In vertical direction the step item is a two-column grid
// (indicator | text); the step button subgrids these columns so the label
// (inside the button) and the supporting content and sub-steps (outside
// the button) share the text column and stay left aligned, while the
// connector fills the indicator column. max-content (not auto) keeps the
// indicator column from absorbing free space, and minmax(0, max-content)
// keeps the button's click target at content width while allowing long
// text to wrap instead of overflowing.
var StyledStepItem = exports.StyledStepItem = _styledComponents["default"].li.withConfig({
  shouldForwardProp: function shouldForwardProp(prop) {
    return (0, _isPropValid["default"])(prop) && prop !== 'direction';
  }
}).withConfig({
  displayName: "StyledStepper__StyledStepItem",
  componentId: "sc-gmpe0p-0"
})(["display:flex;position:relative;min-width:0;", ""], function (props) {
  if (props.direction === 'vertical') {
    var _props$stepTheme;
    var columnGap = getMetricSize(props.theme, ((_props$stepTheme = props.stepTheme) == null || (_props$stepTheme = _props$stepTheme.button) == null ? void 0 : _props$stepTheme.gap) || 'small');
    return (0, _styledComponents.css)(["display:grid;grid-template-columns:max-content minmax(0,max-content);column-gap:", ";"], columnGap);
  }
  if (props.isSubStep) {
    // horizontal and sub-steps isn't supported
    return (0, _styledComponents.css)(["flex-direction:row;align-items:center;flex:none;overflow:hidden;"]);
  }
  return (0, _styledComponents.css)(["flex-direction:column;align-items:center;flex:1;overflow:visible;"]);
});
var StyledStepButton = exports.StyledStepButton = (0, _styledComponents["default"])(_Box.Box).withConfig({
  displayName: "StyledStepper__StyledStepButton",
  componentId: "sc-gmpe0p-1"
})(["&:focus-visible{outline:none;}", ""], function (props) {
  return props.isVertical && (0, _styledComponents.css)(["grid-column:1 / -1;grid-row:1;display:grid;grid-template-columns:subgrid;"]);
});
var StyledStepContent = exports.StyledStepContent = (0, _styledComponents["default"])(_Box.Box).withConfig({
  displayName: "StyledStepper__StyledStepContent",
  componentId: "sc-gmpe0p-2"
})(["", ""], function (props) {
  return props.isVertical ? (0, _styledComponents.css)(["text-align:start;"]) : (0, _styledComponents.css)(["overflow:hidden;"]);
});

// Description, error and disabled reason live outside the step button but
// must left align with the label in vertical direction (text column of the
// step item grid) and center under the button in horizontal direction.
var StyledStepSupportingContent = exports.StyledStepSupportingContent = (0, _styledComponents["default"])(_Box.Box).withConfig({
  displayName: "StyledStepper__StyledStepSupportingContent",
  componentId: "sc-gmpe0p-3"
})(["overflow:hidden;", ""], function (props) {
  return props.isVertical ? (0, _styledComponents.css)(["grid-column:2;grid-row:2;text-align:start;"]) : (0, _styledComponents.css)(["max-width:100%;text-align:center;"]);
});
var StyledStepLabel = exports.StyledStepLabel = (0, _styledComponents["default"])(_Text.Text).withConfig({
  displayName: "StyledStepper__StyledStepLabel",
  componentId: "sc-gmpe0p-4"
})(["", ""], function (props) {
  var _props$stepTheme2, _props$stepTheme3;
  if (!props.isClickable || !((_props$stepTheme2 = props.stepTheme) != null && (_props$stepTheme2 = _props$stepTheme2.hover) != null && _props$stepTheme2.label)) return '';

  // For hover colors we'll use the hover part of the stepper theme
  // that resolved for the step.
  var theme = props.theme;
  var hoverTheme = (_props$stepTheme3 = props.stepTheme) == null || (_props$stepTheme3 = _props$stepTheme3.hover) == null ? void 0 : _props$stepTheme3.label;
  return (0, _styledComponents.css)(["", ":not([aria-disabled]):hover &{", " ", " ", "}"], StyledStepButton, hoverTheme != null && hoverTheme.color ? "color: " + (0, _utils.normalizeColor)(hoverTheme == null ? void 0 : hoverTheme.color, theme) + ";" : '', hoverTheme != null && hoverTheme.weight ? "font-weight: " + (hoverTheme == null ? void 0 : hoverTheme.weight) + ";" : '', hoverTheme != null && hoverTheme.size ? sizeStyle(hoverTheme == null ? void 0 : hoverTheme.size, theme) : '');
});
var StyledIndicator = exports.StyledIndicator = (0, _styledComponents["default"])(_Box.Box).withConfig({
  displayName: "StyledStepper__StyledIndicator",
  componentId: "sc-gmpe0p-5"
})(["box-sizing:content-box;flex-direction:row;&::before{content:'\\200b';", "}", " ", ":focus-visible &{", "}", ""], function (props) {
  var _props$stepTheme4;
  var labelSize = ((_props$stepTheme4 = props.stepTheme) == null || (_props$stepTheme4 = _props$stepTheme4.label) == null ? void 0 : _props$stepTheme4.size) || 'medium';
  return (0, _styledComponents.css)(["font-size:", ";line-height:", ";"], getTextMetric(props.theme, labelSize, 'size'), getTextMetric(props.theme, labelSize, 'height'));
}, function (props) {
  return function (_props$stepTheme5) {
    return (0, _styledComponents.css)(["color:", ";"], (0, _utils.normalizeColor)(((_props$stepTheme5 = props.stepTheme) == null || (_props$stepTheme5 = _props$stepTheme5.indicator) == null ? void 0 : _props$stepTheme5.color) || 'text', props.theme));
  }();
}, StyledStepButton, (0, _utils.focusStyle)(), function (props) {
  var _props$stepTheme6, _props$stepTheme7, _hoverTheme$backgroun, _hoverTheme$border$co, _hoverTheme$border, _ref3, _hoverTheme$color;
  if (!props.isClickable) return '';
  // For hover colors we'll use the hover part of the stepper theme
  // that resolved for the step. If there isn't one we try to
  // just darken the various colors for the step.
  var theme = props.theme;
  var indicatorTheme = ((_props$stepTheme6 = props.stepTheme) == null ? void 0 : _props$stepTheme6.indicator) || {};
  var hoverTheme = ((_props$stepTheme7 = props.stepTheme) == null || (_props$stepTheme7 = _props$stepTheme7.hover) == null ? void 0 : _props$stepTheme7.indicator) || {};
  var hoverBackground = (_hoverTheme$backgroun = hoverTheme.background) != null ? _hoverTheme$backgroun : indicatorTheme.background ? adjustHoverColor(indicatorTheme.background, theme) : undefined;
  var hoverBorder = indicatorTheme.border ? _extends({}, indicatorTheme.border, hoverTheme.border, {
    color: (_hoverTheme$border$co = (_hoverTheme$border = hoverTheme.border) == null ? void 0 : _hoverTheme$border.color) != null ? _hoverTheme$border$co : adjustHoverColor(indicatorTheme.border.color || 'border', theme)
  }) : hoverTheme.border;
  var hoverColor = (0, _utils.normalizeColor)((_ref3 = (_hoverTheme$color = hoverTheme == null ? void 0 : hoverTheme.color) != null ? _hoverTheme$color : indicatorTheme == null ? void 0 : indicatorTheme.color) != null ? _ref3 : 'text', theme);
  var hoverStyles = function (_props$theme, _props$theme2) {
    return (0, _styledComponents.css)(["", ";", ";color:", ";", " ", " ", " ", " ", " ", " ", ""], (0, _utils.backgroundStyle)(hoverBackground, theme), hoverBorder ? (0, _utils.borderStyle)(hoverBorder, false, theme) : '', hoverColor, hoverTheme.size && iconSizeStyle(hoverTheme.size, theme), hoverTheme.height && (0, _utils.heightStyle)(hoverTheme.height, theme), hoverTheme.width && (0, _utils.widthStyle)(hoverTheme.width, theme), hoverTheme.margin && (0, _utils.edgeStyle)('margin', hoverTheme.margin, false, props == null || (_props$theme = props.theme) == null || (_props$theme = _props$theme.box) == null ? void 0 : _props$theme.responsiveBreakpoint, theme), hoverTheme.pad && (0, _utils.edgeStyle)('padding', hoverTheme.pad, false, props == null || (_props$theme2 = props.theme) == null || (_props$theme2 = _props$theme2.box) == null ? void 0 : _props$theme2.responsiveBreakpoint, theme), hoverTheme.round && (0, _utils.roundStyle)(hoverTheme.round, false, theme), hoverTheme.elevation && (0, _utils.elevationStyle)(hoverTheme.elevation, theme));
  }();
  return (0, _styledComponents.css)(["", ":not([aria-disabled]):active &{transform:scale(0.95);}", ":not([aria-disabled]):hover &{", "}"], StyledStepButton, StyledStepButton, hoverStyles);
});
var StyledConnector = exports.StyledConnector = _styledComponents["default"].span.withConfig(_utils.styledComponentsConfig).withConfig({
  displayName: "StyledStepper__StyledConnector",
  componentId: "sc-gmpe0p-6"
})(["", " background:", ";"], function (props) {
  var _stepTheme$button, _stepTheme$connector, _theme$global7, _indicator$height, _indicator$border;
  var theme = props.theme,
    stepTheme = props.stepTheme;
  var indicator = stepTheme == null ? void 0 : stepTheme.indicator;
  var buttonPad = stepTheme == null || (_stepTheme$button = stepTheme.button) == null ? void 0 : _stepTheme$button.pad;
  var padTop = getPadSize(theme, buttonPad, 'top');
  var padLeft = getPadSize(theme, buttonPad, 'left');
  var padRight = getPadSize(theme, buttonPad, 'right');
  var connectorStrokeToken = (stepTheme == null || (_stepTheme$connector = stepTheme.connector) == null ? void 0 : _stepTheme$connector.thickness) || 'small';
  var connectorThickness = getBorderWidth(theme, connectorStrokeToken);
  var connectorRadius = ((_theme$global7 = theme.global) == null || (_theme$global7 = _theme$global7.edgeSize) == null ? void 0 : _theme$global7.xsmall) || '4px';
  var connectorGap = '4px';

  // height could be specified as a box prop in which case the t-shirt
  // values will be from theme.global.size. But use the size from the
  // theme if available. In that case the t-shirt values are icon sizes.
  var indicatorHeight = (indicator == null || (_indicator$height = indicator.height) == null ? void 0 : _indicator$height.height) || (indicator == null ? void 0 : indicator.height);
  var height = indicatorHeight ? theme.global.size[indicatorHeight] || indicatorHeight : getIconSize(theme, (indicator == null ? void 0 : indicator.size) || 'medium');
  if (props.direction === 'horizontal') {
    var _indicator$width;
    var indicatorWidth = (indicator == null || (_indicator$width = indicator.width) == null ? void 0 : _indicator$width.width) || (indicator == null ? void 0 : indicator.width);
    var width = indicatorWidth ? theme.global.size[indicatorWidth] || indicatorWidth : getIconSize(theme, (indicator == null ? void 0 : indicator.size) || 'medium');
    var centerTop = "calc(" + height + " / 2 + " + padTop + ")";
    var centerLeft = "calc(" + width + " / 2 + " + padLeft + ")";
    var centerRight = "calc(" + width + " / 2 + " + padRight + ")";
    // the container's column gap separates the steps; extend across it
    // to reach the adjacent step
    var _ref4 = (stepTheme == null ? void 0 : stepTheme.container) || {},
      _gap = _ref4.gap;
    var _gapValue = (typeof _gap === 'object' ? _gap == null ? void 0 : _gap.column : _gap) || '0px';
    var columnGap = getMetricSize(theme, _gapValue);
    // positioned relative to the step item so it can span across to
    // the adjacent step
    return (0, _styledComponents.css)(["position:absolute;border-radius:", ";top:", ";left:calc(50% + ", ");right:calc(-50% - ", " + ", ");height:", ";margin-inline-start:", ";margin-inline-end:", ";"], connectorRadius, centerTop, centerLeft, columnGap, centerRight, connectorThickness, padLeft, padRight);
  }

  // Vertical: an in-flow grid item in the indicator column of the step
  // item grid. It is anchored to the first row (the button row) and
  // cleared past the indicator with margin-top so that a label wrapping
  // to multiple lines cannot push the connector away from the indicator,
  // then stretches through the supporting content and sub-steps rows.
  var indicatorBorderWidth = getBorderWidth(theme, (indicator == null || (_indicator$border = indicator.border) == null ? void 0 : _indicator$border.size) || '2px');
  // indicator is box-sizing: content-box, so its borders add to height
  var indicatorBox = height + " + " + indicatorBorderWidth + " * 2";
  var _ref5 = (stepTheme == null ? void 0 : stepTheme.container) || {},
    gap = _ref5.gap;
  var gapValue = (gap == null ? void 0 : gap.row) || gap || '0px';
  // when there is a following step, extend through the step item's
  // bottom padding so the line approaches the next step's indicator
  var stepGap = props.spansStepGap ? getMetricSize(theme, gapValue) : '0px';
  return (0, _styledComponents.css)(["grid-column:1;grid-row:1 / span 3;align-self:stretch;width:", ";border-radius:", ";pointer-events:none;justify-self:center;margin-inline-start:", ";margin-top:calc(", " + ", " + ", ");margin-bottom:calc(", " - ", " - ", ");"], connectorThickness, connectorRadius, theme.dir === 'rtl' ? padRight : padLeft, padTop, indicatorBox, connectorGap, connectorGap, padTop, stepGap);
}, function (props) {
  var _props$stepTheme8;
  return (0, _utils.normalizeColor)(((_props$stepTheme8 = props.stepTheme) == null || (_props$stepTheme8 = _props$stepTheme8.connector) == null ? void 0 : _props$stepTheme8.color) || 'border', props.theme);
});
var StyledSubStepsList = exports.StyledSubStepsList = (0, _styledComponents["default"])(_Box.Box).withConfig({
  shouldForwardProp: function shouldForwardProp(prop) {
    return prop !== 'isVertical' && prop !== 'stepTheme';
  }
}).withConfig({
  displayName: "StyledStepper__StyledSubStepsList",
  componentId: "sc-gmpe0p-7"
})(["list-style:none;", ""], function (props) {
  return props.isVertical ? (0, _styledComponents.css)(["grid-column:2;grid-row:3;"]) : '';
});