import React from 'react';
import { Box, Grid } from 'grommet';
export var Percentages = function Percentages() {
  return (
    /*#__PURE__*/
    // Uncomment <Grommet> lines when using outside of storybook
    // <Grommet theme={...}>
    React.createElement(Grid, {
      fill: true,
      areas: [{
        name: 'nav',
        start: [0, 0],
        end: [0, 0]
      }, {
        name: 'main',
        start: [1, 0],
        end: [1, 0]
      }],
      columns: ['small', 'flex'],
      rows: ['flex'],
      gap: "small"
    }, /*#__PURE__*/React.createElement(Box, {
      gridArea: "nav",
      background: "brand"
    }), /*#__PURE__*/React.createElement(Box, {
      gridArea: "main",
      background: "brand"
    }))
    // </Grommet>
  );
};

Percentages.args = {
  full: true
};
export default {
  title: 'Layout/Grid/Percentages'
};