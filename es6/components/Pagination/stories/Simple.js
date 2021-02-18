import React from 'react';
import { Box, Grommet, Pagination, Text } from 'grommet';
import { grommet } from 'grommet/themes';
export var Simple = function Simple() {
  return /*#__PURE__*/React.createElement(Grommet, {
    theme: grommet
  }, /*#__PURE__*/React.createElement(Box, {
    align: "start",
    pad: "small",
    gap: "medium"
  }, /*#__PURE__*/React.createElement(Box, null, /*#__PURE__*/React.createElement(Text, null, "Default"), /*#__PURE__*/React.createElement(Pagination, {
    numberItems: 237
  })), /*#__PURE__*/React.createElement(Box, null, /*#__PURE__*/React.createElement(Text, null, "Box Props"), /*#__PURE__*/React.createElement(Pagination, {
    numberItems: 1237,
    page: 24,
    background: "brand",
    pad: "medium",
    margin: "small"
  }))));
};
export default {
  title: 'Controls/Pagination/Simple'
};