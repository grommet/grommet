import React from 'react';
import { Box, Tag, Text } from 'grommet';
export var Size = function Size() {
  return /*#__PURE__*/React.createElement(Box, {
    pad: "large",
    direction: "row",
    gap: "medium",
    wrap: true
  }, ['xsmall', 'small', 'medium', 'large', 'xlarge'].map(function (size) {
    return /*#__PURE__*/React.createElement(Box, {
      gap: "medium",
      align: "start",
      key: size
    }, /*#__PURE__*/React.createElement(Text, {
      size: size,
      weight: "bold"
    }, size), /*#__PURE__*/React.createElement(Tag, {
      name: "Name",
      value: "Value",
      size: size
    }), /*#__PURE__*/React.createElement(Tag, {
      value: "Value",
      size: size
    }), /*#__PURE__*/React.createElement(Tag, {
      value: "Value",
      size: size,
      onRemove: function onRemove() {}
    }));
  }));
};
export default {
  title: 'Type/Tag/Size'
};