import React from 'react';
import { Box, Pagination, Text } from 'grommet';
export var Simple = function Simple() {
  return (
    /*#__PURE__*/
    // Uncomment <Grommet> lines when using outside of storybook
    // <Grommet theme={...}>
    React.createElement(Box, {
      align: "start",
      pad: "small",
      gap: "medium"
    }, /*#__PURE__*/React.createElement(Box, null, /*#__PURE__*/React.createElement(Text, null, "Default"), /*#__PURE__*/React.createElement(Pagination, {
      "aria-label": "Pagination with default settings",
      numberItems: 237
    })), /*#__PURE__*/React.createElement(Box, null, /*#__PURE__*/React.createElement(Text, null, "Box Props"), /*#__PURE__*/React.createElement(Pagination, {
      numberItems: 1237,
      page: 24,
      background: "dark-1",
      pad: "medium",
      margin: "small",
      "aria-label": "Pagination with custom background and spacing"
    })))
    // </Grommet>
  );
};
export default {
  title: 'Controls/Pagination/Simple'
};