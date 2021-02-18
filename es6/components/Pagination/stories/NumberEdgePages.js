import React from 'react';
import { Box, Grommet, Pagination, Text } from 'grommet';
import { grommet } from 'grommet/themes';
export var NumberEdgePages = function NumberEdgePages() {
  return /*#__PURE__*/React.createElement(Grommet, {
    theme: grommet
  }, /*#__PURE__*/React.createElement(Box, {
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
  }))));
};
NumberEdgePages.storyName = 'Number edge pages';
export default {
  title: 'Controls/Pagination/Number edge pages'
};