import React from 'react';
import { storiesOf } from '@storybook/react';
import { Grommet, Box, Grid } from 'grommet';
import { grommet } from 'grommet/themes';

var GridAreasAlternative = function GridAreasAlternative() {
  return React.createElement(Grommet, {
    full: true,
    theme: grommet
  }, React.createElement(Grid, {
    rows: ['xxsmall', 'medium', 'xsmall'],
    columns: ['1/4', '3/4'],
    areas: [['header', 'header'], ['sidebar', 'main'], ['footer', 'footer']],
    gap: "small"
  }, React.createElement(Box, {
    background: "brand",
    gridArea: "header"
  }, "Header"), React.createElement(Box, {
    background: "light-5",
    gridArea: "sidebar"
  }, "Sidebar"), React.createElement(Box, {
    background: "light-2",
    gridArea: "main"
  }, "Main"), React.createElement(Box, {
    background: "dark-2",
    gridArea: "footer"
  }, "Footer")));
};

storiesOf('Grid', module).add('Areas prop alternative', function () {
  return React.createElement(GridAreasAlternative, null);
});