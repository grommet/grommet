import React from 'react';
import { Box, Grommet, Pagination, Text } from 'grommet';
import { grommet } from 'grommet/themes';
export var NumberMiddlePages = function NumberMiddlePages() {
  return /*#__PURE__*/React.createElement(Grommet, {
    theme: grommet
  }, /*#__PURE__*/React.createElement(Box, {
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
  }))));
};
NumberMiddlePages.storyName = 'Number middle pages';
export default {
  title: 'Controls/Pagination/Number middle pages'
};