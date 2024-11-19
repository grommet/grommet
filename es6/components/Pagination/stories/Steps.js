import React from 'react';
import { Box, Pagination, Text } from 'grommet';
export var Steps = function Steps() {
  return (
    /*#__PURE__*/
    // Uncomment <Grommet> lines when using outside of storybook
    // <Grommet theme={...}>
    React.createElement(Box, {
      align: "start",
      pad: "small",
      gap: "xlarge"
    }, /*#__PURE__*/React.createElement(Box, {
      fill: "horizontal"
    }, /*#__PURE__*/React.createElement(Text, null, "Pagination with stepOptions"), /*#__PURE__*/React.createElement(Pagination, {
      "aria-label": "Pagination with step options to change items per page",
      numberItems: 237,
      stepOptions: true
    })), /*#__PURE__*/React.createElement(Box, {
      fill: "horizontal"
    }, /*#__PURE__*/React.createElement(Text, null, "Pagination with stepOptions and summary"), /*#__PURE__*/React.createElement(Pagination, {
      "aria-label": "Pagination with step options and summary of items per page",
      numberItems: 237,
      stepOptions: true,
      summary: true
    })), /*#__PURE__*/React.createElement(Box, {
      fill: "horizontal"
    }, /*#__PURE__*/React.createElement(Text, null, "Pagination with custom step sizes"), /*#__PURE__*/React.createElement(Pagination, {
      "aria-label": "Pagination with custom step sizes and summary",
      numberItems: 237,
      stepOptions: [10, 20, 30, 1000],
      summary: true
    })))
    // </Grommet>
  );
};
export default {
  title: 'Controls/Pagination/Steps'
};