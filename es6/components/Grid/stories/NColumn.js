import React from 'react';
import { Box, Grid } from 'grommet';
export var NColumnGrid = function NColumnGrid() {
  return (
    /*#__PURE__*/
    // Uncomment <Grommet> lines when using outside of storybook
    // <Grommet theme={...}>
    React.createElement(Grid, {
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
    }, "Item 6"))
    // </Grommet>
  );
};

NColumnGrid.storyName = 'N-column layout';
NColumnGrid.args = {
  full: true
};
export default {
  title: 'Layout/Grid/N-column layout'
};