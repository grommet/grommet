function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
// SPDX-FileCopyrightText: © Hewlett Packard Enterprise Development LP
// SPDX-License-Identifier: Apache-2.0
import React from 'react';
import styled, { css } from 'styled-components';
import isPropValid from '@emotion/is-prop-valid';
import { useThemeValue } from '../../utils/useThemeValue';
import { StyledConnector } from './StyledStepper';
var StyledStepConnectorGroup = styled.div.withConfig({
  shouldForwardProp: function shouldForwardProp(prop) {
    return isPropValid(prop) && prop !== 'direction';
  }
}).withConfig({
  displayName: "StepConnector__StyledStepConnectorGroup",
  componentId: "sc-1k7y9sb-0"
})(["display:flex;flex-direction:column;position:relative;flex:1;overflow:visible;", ""], function (props) {
  return props.direction === 'horizontal' && css(["align-items:center;"]);
});
export var StepConnector = function StepConnector(_ref) {
  var step = _ref.step,
    direction = _ref.direction,
    children = _ref.children;
  var _useThemeValue = useThemeValue(),
    passThemeFlag = _useThemeValue.passThemeFlag;
  return /*#__PURE__*/React.createElement(StyledStepConnectorGroup, _extends({
    direction: direction
  }, passThemeFlag), /*#__PURE__*/React.createElement(StyledConnector, _extends({
    direction: direction,
    status: step.status,
    "aria-hidden": "true",
    isBetween: true
  }, passThemeFlag)), children);
};