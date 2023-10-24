import React from 'react';
import { Box, Grid } from 'grommet';
export var GridAreasAlternative = function GridAreasAlternative() {
  return (
    /*#__PURE__*/
    // Uncomment <Grommet> lines when using outside of storybook
    // <Grommet theme={...}>
    React.createElement(Grid, {
      rows: ['xxsmall', 'medium', 'xsmall'],
      columns: ['1/4', '3/4'],
      areas: [['header', 'header'], ['sidebar', 'main'], ['footer', 'footer']],
      gap: "small"
    }, /*#__PURE__*/React.createElement(Box, {
      background: "brand",
      gridArea: "header"
    }, "Header"), /*#__PURE__*/React.createElement(Box, {
      background: "light-5",
      gridArea: "sidebar"
    }, "Sidebar"), /*#__PURE__*/React.createElement(Box, {
      background: "light-2",
      gridArea: "main"
    }, "Main"), /*#__PURE__*/React.createElement(Box, {
      background: "dark-2",
      gridArea: "footer"
    }, "Footer"))
    // </Grommet>
  );
};

GridAreasAlternative.args = {
  full: true
};
GridAreasAlternative.storyName = 'Areas prop alternatives';
export default {
  title: 'Layout/Grid/Areas prop alternatives'
};