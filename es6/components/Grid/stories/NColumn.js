import React from 'react';
import { Grommet, Box, Grid } from 'grommet';
import { grommet } from 'grommet/themes';
export var NColumnGrid = function NColumnGrid() {
  return /*#__PURE__*/React.createElement(Grommet, {
    theme: grommet,
    full: true
  }, /*#__PURE__*/React.createElement(Grid, {
    columns: {
      count: 6,
      size: 'auto'
    },
    gap: "small"
  }, /*#__PURE__*/React.createElement(Box, {
    background: "brand"
  }, "Item 1"), /*#__PURE__*/React.createElement(Box, {
    background: "brand"
  }, "Item 2"), /*#__PURE__*/React.createElement(Box, {
    background: "brand"
  }, "Item 3"), /*#__PURE__*/React.createElement(Box, {
    background: "brand"
  }, "Item 4"), /*#__PURE__*/React.createElement(Box, {
    background: "brand"
  }, "Item 5"), /*#__PURE__*/React.createElement(Box, {
    background: "brand"
  }, "Item 6")));
};
NColumnGrid.storyName = 'N-column layout';
export default {
  title: 'Layout/Grid/N-column layout'
};