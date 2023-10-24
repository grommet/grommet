import React from 'react';
import { Box, Pagination, Text } from 'grommet';
export var NumberEdgePages = function NumberEdgePages() {
  return (
    /*#__PURE__*/
    // Uncomment <Grommet> lines when using outside of storybook
    // <Grommet theme={...}>
    React.createElement(Box, {
      pad: "small",
      gap: "medium"
    }, /*#__PURE__*/React.createElement(Box, null, /*#__PURE__*/React.createElement(Text, null, "numberEdgePages = 2 (number of pages on start/end)"), /*#__PURE__*/React.createElement(Pagination, {
      numberItems: 237,
      page: 10,
      numberEdgePages: 2
    })), /*#__PURE__*/React.createElement(Box, null, /*#__PURE__*/React.createElement(Text, null, "numberEdgePages = 0"), /*#__PURE__*/React.createElement(Pagination, {
      numberItems: 237,
      page: 10,
      numberEdgePages: 0
    })))
    // </Grommet>
  );
};

NumberEdgePages.storyName = 'Number edge pages';
export default {
  title: 'Controls/Pagination/Number edge pages'
};