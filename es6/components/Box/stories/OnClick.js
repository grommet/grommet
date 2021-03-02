import React from 'react';
import { Attraction } from "grommet-icons/es6/icons/Attraction";
import { Grommet, Box, Text } from 'grommet';
import { grommet } from '../../../themes';
export var OnClickBox = function OnClickBox() {
  return /*#__PURE__*/React.createElement(Grommet, {
    theme: grommet
  }, /*#__PURE__*/React.createElement(Box, {
    justify: "center",
    align: "center",
    pad: "large"
  }, /*#__PURE__*/React.createElement(Box, {
    border: true,
    pad: "large",
    align: "center",
    round: true,
    gap: "small",
    hoverIndicator: {
      background: {
        color: 'background-contrast'
      },
      elevation: 'medium'
    },
    onClick: function onClick() {
      alert('clicked');
    }
  }, /*#__PURE__*/React.createElement(Attraction, {
    size: "large"
  }), /*#__PURE__*/React.createElement(Text, null, "Party"))));
};
OnClickBox.storyName = 'onClick';
export default {
  title: 'Layout/Box/onClick'
};