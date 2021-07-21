import React from 'react';
import { grommet, Box, Text, Grommet } from 'grommet';
var alphabet = 'a b c d e f g h i j k l m n o p q r s t u v w x y z';
export var Tip = function Tip() {
  return /*#__PURE__*/React.createElement(Grommet, {
    theme: grommet
  }, /*#__PURE__*/React.createElement(Box, {
    align: "center",
    pad: "medium",
    gap: "xlarge"
  }, /*#__PURE__*/React.createElement(Box, {
    width: "small"
  }, /*#__PURE__*/React.createElement(Text, {
    truncate: "tip"
  }, alphabet)), /*#__PURE__*/React.createElement(Text, {
    tip: {
      dropProps: {
        align: {
          left: 'right'
        }
      },
      content: 'tooltip'
    }
  }, "Tip with dropProps"), /*#__PURE__*/React.createElement(Text, {
    tip: {
      plain: true,
      dropProps: {
        align: {
          bottom: 'top'
        }
      },
      content: /*#__PURE__*/React.createElement(Box, {
        pad: "xxsmall",
        elevation: "small",
        background: "#EDEDED" // no opacity
        ,
        round: "xsmall",
        margin: "xsmall",
        overflow: "hidden",
        align: "center"
      }, "tooltip")
    }
  }, "Tip with content prop")));
};
Tip.parameters = {
  chromatic: {
    disable: true
  }
};
export default {
  title: "Type/Text/Tip"
};