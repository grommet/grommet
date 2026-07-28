function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
import React from 'react';
import { useThemeValue } from '../../utils/useThemeValue';
import { StyledConnector } from './StyledStepper';
export var StepConnector = function StepConnector(_ref) {
  var _theme$stepper, _theme$global, _theme$global2, _theme$global3, _theme$global4, _theme$global5;
  var step = _ref.step,
    direction = _ref.direction,
    children = _ref.children;
  var _useThemeValue = useThemeValue(),
    theme = _useThemeValue.theme,
    passThemeFlag = _useThemeValue.passThemeFlag;
  var indicatorSize = (_theme$stepper = theme.stepper) != null && (_theme$stepper = _theme$stepper.indicator) != null && _theme$stepper.size && (_theme$global = theme.global) != null && (_theme$global = _theme$global.edgeSize) != null && _theme$global[theme.stepper.indicator.size] ? theme.global.edgeSize[theme.stepper.indicator.size] : ((_theme$global2 = theme.global) == null || (_theme$global2 = _theme$global2.edgeSize) == null ? void 0 : _theme$global2.medium) || '24px';
  var childGap = ((_theme$global3 = theme.global) == null || (_theme$global3 = _theme$global3.edgeSize) == null ? void 0 : _theme$global3.xsmall) || '8px';
  var childPadTop = ((_theme$global4 = theme.global) == null || (_theme$global4 = _theme$global4.edgeSize) == null ? void 0 : _theme$global4.medium) || '24px';
  var minConnectorInlineSize = ((_theme$global5 = theme.global) == null || (_theme$global5 = _theme$global5.edgeSize) == null ? void 0 : _theme$global5.small) || '12px';
  var directionStyle = direction === 'horizontal' ? {
    alignItems: 'center',
    minWidth: minConnectorInlineSize
  } : {
    justifyContent: 'flex-start',
    minHeight: minConnectorInlineSize
  };
  var renderChildren = function renderChildren() {
    var _theme$global6;
    if (!children) return null;
    var childIndent = "calc(" + indicatorSize + " + " + (((_theme$global6 = theme.global) == null || (_theme$global6 = _theme$global6.edgeSize) == null ? void 0 : _theme$global6.small) || '12px') + ")";
    return direction === 'horizontal' ? /*#__PURE__*/React.createElement("span", {
      style: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        gap: childGap,
        paddingTop: childPadTop,
        maxWidth: '100%',
        flexWrap: 'wrap',
        justifyContent: 'center'
      }
    }, children) : /*#__PURE__*/React.createElement("ol", {
      style: {
        listStyle: 'none',
        padding: "0 0 0 " + childIndent,
        margin: 0
      }
    }, children);
  };
  return /*#__PURE__*/React.createElement("li", {
    role: "presentation",
    "aria-hidden": children ? undefined : 'true',
    style: _extends({
      display: 'flex',
      flexDirection: 'column',
      position: 'relative',
      flex: 1,
      overflow: 'visible'
    }, directionStyle)
  }, /*#__PURE__*/React.createElement(StyledConnector, _extends({
    direction: direction,
    status: step.status,
    "aria-hidden": "true",
    isBetween: true
  }, passThemeFlag)), renderChildren());
};