import React from 'react';
import styled, { css, keyframes } from 'styled-components';
import { Checkmark } from 'grommet-icons/icons/Checkmark';
import { Box } from '../Box';
import { styledComponentsConfig } from '../../utils/styles';
var bounceDelay = keyframes(["0%,80%,100%{transform:scale(0.4);}40%{transform:scale(0.8);}"]);
var bounceDelayRule = css(["animation:", " 1.4s infinite ease-in-out both;"], bounceDelay);
var Dot = styled(Box).withConfig({
  displayName: "BusyAnimation__Dot",
  componentId: "sc-feuivs-0"
})(["background-color:currentColor;width:8px;height:8px;border-radius:100%;display:inline-block;", " ", ""], bounceDelayRule, function (props) {
  return props.delay && "animation-delay: " + props.delay + ";";
});
export var EllipsisAnimation = function EllipsisAnimation() {
  return /*#__PURE__*/React.createElement(Box, {
    style: {
      position: 'absolute'
    },
    fill: true,
    alignContent: "center",
    justify: "center"
  }, /*#__PURE__*/React.createElement(Box, {
    alignSelf: "center",
    direction: "row",
    gap: "small"
  }, /*#__PURE__*/React.createElement(Dot, {
    delay: "-0.32s"
  }), /*#__PURE__*/React.createElement(Dot, {
    delay: "-0.16s"
  }), /*#__PURE__*/React.createElement(Dot, null)));
};
var grow = keyframes(["0%{opacity:0;transform:scale(.3);}20%{opacity:1;transform:scale(1.15);}30%{transform:scale(.9);}45%{transform:scale(1.05);}55%{transform:scale(1);}100%{transform:scale(1);}"]);
export var GrowCheckmark = styled(Checkmark).withConfig({
  displayName: "BusyAnimation__GrowCheckmark",
  componentId: "sc-feuivs-1"
})(["position:absolute;align-self:center;animation:", " 0.9s ease-in-out;"], grow);
export var StyledBusyContents = styled.div.withConfig(styledComponentsConfig).withConfig({
  displayName: "BusyAnimation__StyledBusyContents",
  componentId: "sc-feuivs-2"
})(["opacity:", ";}"], function (props) {
  return props.animating ? 0 : 1;
});