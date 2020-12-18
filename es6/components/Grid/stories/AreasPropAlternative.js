import React from 'react';
import { Grommet, Box, Grid } from 'grommet';
import { grommet } from 'grommet/themes';
export var GridAreasAlternative = function GridAreasAlternative() {
  return /*#__PURE__*/React.createElement(Grommet, {
    full: true,
    theme: grommet
  }, /*#__PURE__*/React.createElement(Grid, {
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
  }, "Footer")));
};
GridAreasAlternative.story = {
  name: 'Areas prop alternative'
};