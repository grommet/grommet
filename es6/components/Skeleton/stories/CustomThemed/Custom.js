import React, { useState } from 'react';
import { Box, Button, Heading, Grommet, Text } from 'grommet';
export var Custom = function Custom() {
  var customTheme = {
    skeleton: {
      colors: {
        light: ['#a2a8a8', '#adb9ba']
      },
      round: 'xsmall'
    },
    button: {
      skeleton: {
        round: 'xsmall'
      }
    },
    heading: {
      skeleton: {
        width: 'medium'
      }
    },
    text: {
      skeleton: {
        colors: {
          light: ['#c5d9d9', '#b2d6d6']
        }
      }
    }
  };
  var _useState = useState(true),
    skeleton = _useState[0],
    setSkeleton = _useState[1];
  return /*#__PURE__*/React.createElement(Grommet, {
    theme: customTheme
  }, /*#__PURE__*/React.createElement(Box, {
    pad: "large",
    gap: "medium"
  }, /*#__PURE__*/React.createElement(Button, {
    alignSelf: "start",
    label: "Toggle skeleton",
    onClick: function onClick() {
      return setSkeleton(!skeleton);
    }
  }), /*#__PURE__*/React.createElement(Box, {
    gap: "small",
    pad: "small",
    align: "start",
    skeleton: skeleton
  }, /*#__PURE__*/React.createElement(Heading, {
    level: 1
  }, "Heading 1"), /*#__PURE__*/React.createElement(Text, null, "text"), /*#__PURE__*/React.createElement(Heading, {
    level: 2
  }, "Heading 2"), /*#__PURE__*/React.createElement(Button, {
    alignSelf: "end",
    label: "button"
  }), /*#__PURE__*/React.createElement(Text, null, "text"))));
};
export default {
  title: 'Visualizations/Skeleton/Custom Themed/Custom'
};