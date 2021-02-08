import React from 'react';
import { Grommet, Box, Grid } from 'grommet';
import { grommet } from 'grommet/themes';
export var Percentages = function Percentages() {
  return /*#__PURE__*/React.createElement(Grommet, {
    theme: grommet,
    full: true
  }, /*#__PURE__*/React.createElement(Grid, {
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
  })));
};
export default {
  title: 'Layout/Grid/Percentages'
};