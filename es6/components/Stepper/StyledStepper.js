// SPDX-FileCopyrightText: © Hewlett Packard Enterprise Development LP
// SPDX-License-Identifier: Apache-2.0
import styled, { css } from 'styled-components';
import isPropValid from '@emotion/is-prop-valid';
import { focusStyle, normalizeColor, styledComponentsConfig } from '../../utils';
import { Button } from '../Button';
var getMetricSize = function getMetricSize(theme, size) {
  var _theme$global, _theme$global2;
  return ((_theme$global = theme.global) == null || (_theme$global = _theme$global.edgeSize) == null ? void 0 : _theme$global[size]) || ((_theme$global2 = theme.global) == null || (_theme$global2 = _theme$global2.size) == null ? void 0 : _theme$global2[size]) || size;
};
var getTextMetric = function getTextMetric(theme, size, metric) {
  var _theme$text, _theme$text2;
  return ((_theme$text = theme.text) == null || (_theme$text = _theme$text[size]) == null ? void 0 : _theme$text[metric]) || ((_theme$text2 = theme.text) == null || (_theme$text2 = _theme$text2.medium) == null ? void 0 : _theme$text2[metric]);
};
var getBorderWidth = function getBorderWidth(theme, size) {
  var _theme$global3, _theme$global4;
  return ((_theme$global3 = theme.global) == null || (_theme$global3 = _theme$global3.borderSize) == null ? void 0 : _theme$global3[size]) || size || ((_theme$global4 = theme.global) == null || (_theme$global4 = _theme$global4.borderSize) == null ? void 0 : _theme$global4.xsmall);
};
var getSubStepSizeToken = function getSubStepSizeToken(indicatorSize) {
  switch (indicatorSize) {
    case 'large':
      return 'small';
    case 'small':
      return 'xsmall';
    default:
      return 'small';
  }
};
var getConnectorColor = function getConnectorColor(stepStatus, theme) {
  var _theme$stepper;
  return normalizeColor(((_theme$stepper = theme.stepper) == null || (_theme$stepper = _theme$stepper[stepStatus]) == null || (_theme$stepper = _theme$stepper.connector) == null ? void 0 : _theme$stepper.color) || 'border', theme);
};
var StyledStepItem = styled.li.withConfig({
  shouldForwardProp: function shouldForwardProp(prop) {
    return isPropValid(prop) && prop !== 'direction';
  }
}).withConfig({
  displayName: "StyledStepper__StyledStepItem",
  componentId: "sc-gmpe0p-0"
})(["display:flex;position:relative;", ""], function (props) {
  if (props.direction === 'vertical') {
    var paddingBottom = '0px';
    if (!props.isSubStep && !props.isLast && !props.hasSubSteps) {
      paddingBottom = "" + props.theme.global.edgeSize.medium;
    }
    return css(["flex-direction:column;align-items:flex-start;padding-bottom:", ";"], paddingBottom);
  }
  if (props.isSubStep) {
    // horizontal and sub-steps isn't supported
    return css(["flex-direction:row;align-items:center;flex:none;min-width:0;overflow:hidden;"]);
  }
  return css(["flex-direction:column;align-items:center;flex:1;min-width:0;overflow:visible;"]);
});

// Button is rendered `plain`, which already clears border, outline and padding.
// `direction` is stripped because isPropValid lets it reach the DOM.
var StyledStepButton = styled(Button).withConfig({
  shouldForwardProp: function shouldForwardProp(prop) {
    return prop !== 'direction';
  }
}).withConfig({
  displayName: "StyledStepper__StyledStepButton",
  componentId: "sc-gmpe0p-1"
})(["display:flex;padding:", ";cursor:", ";", ""], function (props) {
  var _props$theme$global, _props$theme$stepper;
  return (_props$theme$global = props.theme.global) == null || (_props$theme$global = _props$theme$global.edgeSize) == null ? void 0 : _props$theme$global[((_props$theme$stepper = props.theme.stepper) == null || (_props$theme$stepper = _props$theme$stepper.button) == null ? void 0 : _props$theme$stepper.pad) || 'xxsmall'];
}, function (props) {
  return props.isClickable ? 'pointer' : 'default';
}, function (props) {
  var _props$theme$global2, _props$theme$stepper2, _props$theme$global3, _props$theme$stepper3;
  return props.direction === 'vertical' ? css(["flex-direction:row;align-items:flex-start;gap:", ";text-align:left;"], (_props$theme$global2 = props.theme.global) == null || (_props$theme$global2 = _props$theme$global2.edgeSize) == null ? void 0 : _props$theme$global2[((_props$theme$stepper2 = props.theme.stepper) == null || (_props$theme$stepper2 = _props$theme$stepper2.vertical) == null || (_props$theme$stepper2 = _props$theme$stepper2.button) == null ? void 0 : _props$theme$stepper2.gap) || 'small']) : css(["flex-direction:column;align-items:center;gap:", ";text-align:center;width:100%;"], (_props$theme$global3 = props.theme.global) == null || (_props$theme$global3 = _props$theme$global3.edgeSize) == null ? void 0 : _props$theme$global3[((_props$theme$stepper3 = props.theme.stepper) == null || (_props$theme$stepper3 = _props$theme$stepper3.horizontal) == null || (_props$theme$stepper3 = _props$theme$stepper3.button) == null ? void 0 : _props$theme$stepper3.gap) || 'xxsmall']);
});
var StyledStepContent = styled.span.withConfig({
  shouldForwardProp: function shouldForwardProp(prop) {
    return isPropValid(prop) && prop !== 'direction';
  }
}).withConfig({
  displayName: "StyledStepper__StyledStepContent",
  componentId: "sc-gmpe0p-2"
})(["display:flex;flex-direction:column;", ""], function (props) {
  if (props.direction === 'vertical' && !props.isSubStep && !props.hasDescription) {
    var _props$theme$stepper4;
    var indicatorSizeToken = ((_props$theme$stepper4 = props.theme.stepper) == null || (_props$theme$stepper4 = _props$theme$stepper4.indicator) == null ? void 0 : _props$theme$stepper4.size) || 'medium';
    var indicatorSize = getMetricSize(props.theme, indicatorSizeToken);
    var lineHeight = getTextMetric(props.theme, 'small', 'height');
    return css(["padding-top:calc((", " - ", ") / 2);"], indicatorSize, lineHeight);
  }
  return '';
});
var StyledIndicator = styled.span.withConfig(styledComponentsConfig).withConfig({
  displayName: "StyledStepper__StyledIndicator",
  componentId: "sc-gmpe0p-3"
})(["display:flex;align-items:center;justify-content:center;border-radius:50%;transition:transform 0.1s ease,background-color 0.15s ease,border-color 0.15s ease,color 0.15s ease;", " ", " ", ":focus-visible &{", "}", ""], function (props) {
  return function (_props$theme$stepper5, _props$theme$stepper6, _props$theme$global4) {
    var indicatorSizeToken = ((_props$theme$stepper5 = props.theme.stepper) == null || (_props$theme$stepper5 = _props$theme$stepper5.indicator) == null ? void 0 : _props$theme$stepper5.size) || 'medium';
    var parentSize = getMetricSize(props.theme, indicatorSizeToken);
    var subStepSize = getMetricSize(props.theme, getSubStepSizeToken(indicatorSizeToken));
    var size = props.isSubStep ? subStepSize : parentSize;
    var borderWidth = ((_props$theme$stepper6 = props.theme.stepper) == null || (_props$theme$stepper6 = _props$theme$stepper6.indicator) == null || (_props$theme$stepper6 = _props$theme$stepper6.border) == null ? void 0 : _props$theme$stepper6.width) || ((_props$theme$global4 = props.theme.global) == null || (_props$theme$global4 = _props$theme$global4.borderSize) == null ? void 0 : _props$theme$global4.small) || '2px';
    return css(["width:", ";height:", ";min-width:", ";min-height:", ";border:", " solid;"], size, size, size, size, borderWidth);
  }();
}, function (props) {
  var _theme$stepper2;
  var theme = props.theme;
  var stateTheme = ((_theme$stepper2 = theme.stepper) == null || (_theme$stepper2 = _theme$stepper2[props.effectiveState]) == null ? void 0 : _theme$stepper2.indicator) || {};
  return css(["background:", ";color:", ";border-color:", ";"], normalizeColor((stateTheme == null ? void 0 : stateTheme.background) || 'transparent', theme), normalizeColor((stateTheme == null ? void 0 : stateTheme.color) || 'text-weak', theme), normalizeColor((stateTheme == null ? void 0 : stateTheme.border) || 'border', theme));
}, StyledStepButton, focusStyle(), function (props) {
  var _theme$stepper3, _stateTheme$hover, _stateTheme$hover2, _stateTheme$hover3, _theme$stepper4, _theme$stepper5;
  if (!props.isClickable) return '';
  var theme = props.theme;
  var stateTheme = ((_theme$stepper3 = theme.stepper) == null || (_theme$stepper3 = _theme$stepper3[props.effectiveState]) == null ? void 0 : _theme$stepper3.indicator) || {};
  var backgroundColor = stateTheme != null && stateTheme.background ? normalizeColor(stateTheme.background, theme) : undefined;
  var borderColor = stateTheme != null && stateTheme.border ? normalizeColor(stateTheme.border, theme) : undefined;
  var color = stateTheme != null && stateTheme.color ? normalizeColor(stateTheme.color, theme) : undefined;
  var stateBackgroundHoverColor = stateTheme != null && (_stateTheme$hover = stateTheme.hover) != null && _stateTheme$hover.background ? normalizeColor(stateTheme.hover.background, theme) : undefined;
  var stateBorderHoverColor = stateTheme != null && (_stateTheme$hover2 = stateTheme.hover) != null && _stateTheme$hover2.border ? normalizeColor(stateTheme.hover.border, theme) : undefined;
  var stateColorHoverColor = stateTheme != null && (_stateTheme$hover3 = stateTheme.hover) != null && _stateTheme$hover3.color ? normalizeColor(stateTheme.hover.color, theme) : undefined;
  var defaultBackgroundHoverColor = backgroundColor ? "color-mix(in srgb, " + backgroundColor + " 80%, black)" : normalizeColor(((_theme$stepper4 = theme.stepper) == null || (_theme$stepper4 = _theme$stepper4.hover) == null ? void 0 : _theme$stepper4.background) || 'background-contrast', theme);
  var defaultBorderHoverColor = borderColor ? "color-mix(in srgb, " + borderColor + " 80%, black)" : normalizeColor(((_theme$stepper5 = theme.stepper) == null || (_theme$stepper5 = _theme$stepper5.hover) == null ? void 0 : _theme$stepper5.border) || 'text', theme);
  var defaultColorHoverColor = color ? "color-mix(in srgb, " + color + " 80%, black)" : normalizeColor('text-strong', theme);
  var hoverBackgroundColor = stateBackgroundHoverColor || defaultBackgroundHoverColor;
  var hoverBorderColor = stateBorderHoverColor || defaultBorderHoverColor;
  var hoverColor = stateColorHoverColor || defaultColorHoverColor;
  var hoverStyles = function () {
    return css(["background:", ";border-color:", ";color:", ";"], hoverBackgroundColor, hoverBorderColor, hoverColor);
  }();
  return css(["", ":not([aria-disabled]):active &{transform:scale(0.95);}", ":not([aria-disabled]):hover &{", "}"], StyledStepButton, StyledStepButton, hoverStyles);
});
var StyledConnector = styled.span.withConfig(styledComponentsConfig).withConfig({
  displayName: "StyledStepper__StyledConnector",
  componentId: "sc-gmpe0p-4"
})(["", " position:absolute;background:", ";"], function (props) {
  var _theme$stepper6, _theme$stepper7, _props$theme$global5, _props$theme$stepper7, _theme$stepper8, _theme$global5, _props$theme$stepper8;
  var theme = props.theme;
  var indicatorSizeToken = ((_theme$stepper6 = theme.stepper) == null || (_theme$stepper6 = _theme$stepper6.indicator) == null ? void 0 : _theme$stepper6.size) || 'medium';
  var parentSize = getMetricSize(theme, indicatorSizeToken);
  var indicatorBorderWidth = getMetricSize(theme, ((_theme$stepper7 = theme.stepper) == null || (_theme$stepper7 = _theme$stepper7.indicator) == null || (_theme$stepper7 = _theme$stepper7.border) == null ? void 0 : _theme$stepper7.width) || '2px');
  var buttonPad = (_props$theme$global5 = props.theme.global) == null || (_props$theme$global5 = _props$theme$global5.edgeSize) == null ? void 0 : _props$theme$global5[((_props$theme$stepper7 = props.theme.stepper) == null || (_props$theme$stepper7 = _props$theme$stepper7.button) == null ? void 0 : _props$theme$stepper7.pad) || 'xxsmall'];
  var connectorStrokeToken = ((_theme$stepper8 = theme.stepper) == null || (_theme$stepper8 = _theme$stepper8.connector) == null || (_theme$stepper8 = _theme$stepper8.stroke) == null ? void 0 : _theme$stepper8.width) || 'small';
  var connectorThickness = getBorderWidth(theme, connectorStrokeToken);
  var connectorRadius = ((_theme$global5 = theme.global) == null || (_theme$global5 = _theme$global5.edgeSize) == null ? void 0 : _theme$global5.xsmall) || '4px';
  var connectorOffset = "calc(" + parentSize + " / 2 + " + buttonPad + ")";
  var connectorGap = '4px';
  var nonBetweenTop = "calc(" + parentSize + " + " + buttonPad + " +\n      (" + indicatorBorderWidth + " * 2) + " + connectorGap + ")";
  return css(["border-radius:", ";", ""], connectorRadius, props.direction === 'horizontal' ? css(["top:", ";left:calc(", "50% + ", ");right:calc(-50% + ", ");height:", ";margin-inline:", ";"], connectorOffset, props.isBetween ? '-' : '', connectorOffset, connectorOffset, connectorThickness, props.theme.global.edgeSize[((_props$theme$stepper8 = props.theme.stepper) == null || (_props$theme$stepper8 = _props$theme$stepper8.horizontal) == null || (_props$theme$stepper8 = _props$theme$stepper8.connector) == null ? void 0 : _props$theme$stepper8.margin) || 'xxsmall']) : css(["left:calc( ", " + ", " - ", " / 2 );top:", ";bottom:0;", " width:", ";margin-block:0;"], connectorOffset, indicatorBorderWidth, connectorThickness, props.isBetween ? 0 : nonBetweenTop, !props.isBetween && css(["min-height:12px;"]), connectorThickness));
}, function (props) {
  return getConnectorColor(props.status, props.theme);
});
var StyledSubStepsList = styled.ol.withConfig({
  shouldForwardProp: function shouldForwardProp(prop) {
    return isPropValid(prop) && prop !== 'direction';
  }
}).withConfig({
  displayName: "StyledStepper__StyledSubStepsList",
  componentId: "sc-gmpe0p-5"
})(["list-style:none;margin:0;padding:0;", ""], function (props) {
  var _props$theme$stepper9, _props$theme$global6, _props$theme$stepper0, _props$theme$global7, _props$theme$stepper1;
  if (props.direction !== 'vertical') return '';
  var indicatorSizeToken = ((_props$theme$stepper9 = props.theme.stepper) == null || (_props$theme$stepper9 = _props$theme$stepper9.indicator) == null ? void 0 : _props$theme$stepper9.size) || 'medium';
  var indicatorSize = getMetricSize(props.theme, indicatorSizeToken);
  var textGap = (_props$theme$global6 = props.theme.global) == null || (_props$theme$global6 = _props$theme$global6.edgeSize) == null ? void 0 : _props$theme$global6[((_props$theme$stepper0 = props.theme.stepper) == null || (_props$theme$stepper0 = _props$theme$stepper0.vertical) == null || (_props$theme$stepper0 = _props$theme$stepper0.button) == null ? void 0 : _props$theme$stepper0.gap) || 'small'];
  var buttonPad = (_props$theme$global7 = props.theme.global) == null || (_props$theme$global7 = _props$theme$global7.edgeSize) == null ? void 0 : _props$theme$global7[((_props$theme$stepper1 = props.theme.stepper) == null || (_props$theme$stepper1 = _props$theme$stepper1.button) == null ? void 0 : _props$theme$stepper1.pad) || 'xxsmall'];
  return css(["padding-inline-start:calc(", " + ", " + ", ");"], indicatorSize, textGap, buttonPad);
});
export { StyledStepItem, StyledStepButton, StyledStepContent, StyledIndicator, StyledConnector, StyledSubStepsList };