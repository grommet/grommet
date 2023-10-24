import React from 'react';
import { Box, Pagination, Text } from 'grommet';
export var NumberMiddlePages = function NumberMiddlePages() {
  return (
    /*#__PURE__*/
    // Uncomment <Grommet> lines when using outside of storybook
    // <Grommet theme={...}>
    React.createElement(Box, {
      pad: "small",
      gap: "medium"
    }, /*#__PURE__*/React.createElement(Box, null, /*#__PURE__*/React.createElement(Text, null, "numberMiddlePages = 4 (number of pages in the middle)"), /*#__PURE__*/React.createElement(Pagination, {
      numberItems: 237,
      page: 10,
      numberMiddlePages: 4
    })), /*#__PURE__*/React.createElement(Box, null, /*#__PURE__*/React.createElement(Text, null, "numberMiddlePages = 5 (number of pages in the middle)"), /*#__PURE__*/React.createElement(Pagination, {
      numberItems: 237,
      page: 10,
      numberMiddlePages: 5
    })))
    // </Grommet>
  );
};

NumberMiddlePages.storyName = 'Number middle pages';
export default {
  title: 'Controls/Pagination/Number middle pages'
};