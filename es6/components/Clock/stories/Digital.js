import React from 'react';
import { Box, Grommet, Clock, Text } from 'grommet';
import { grommet } from 'grommet/themes';
import { deepMerge } from 'grommet/utils';
var override = {
  clock: {
    digital: {
      text: {
        customSize: {
          size: '30px',
          height: 1.234
        }
      }
    }
  }
};
var theme = deepMerge(grommet, override);
var clockSizes = ['xsmall', 'small', 'medium', 'large', 'xlarge', 'xxlarge'];
export var Digital = function Digital() {
  return /*#__PURE__*/React.createElement(Grommet, {
    theme: theme
  }, /*#__PURE__*/React.createElement(Box, {
    direction: "row",
    gap: "medium",
    pad: "medium"
  }, clockSizes.map(function (size) {
    return /*#__PURE__*/React.createElement(Box, {
      key: size,
      align: "center"
    }, /*#__PURE__*/React.createElement(Text, null, size), /*#__PURE__*/React.createElement(Clock, {
      type: "digital",
      size: size
    }));
  })), /*#__PURE__*/React.createElement(Box, {
    direction: "row",
    gap: "medium",
    pad: "medium"
  }, /*#__PURE__*/React.createElement(Box, {
    align: "center"
  }, /*#__PURE__*/React.createElement(Text, null, "Default size (medium)"), /*#__PURE__*/React.createElement(Clock, {
    type: "digital"
  })), /*#__PURE__*/React.createElement(Box, {
    align: "center"
  }, /*#__PURE__*/React.createElement(Text, null, "Custom size"), /*#__PURE__*/React.createElement(Clock, {
    type: "digital",
    size: "customSize"
  }))));
};
Digital.story = {
  parameters: {
    chromatic: {
      disable: true
    }
  }
};