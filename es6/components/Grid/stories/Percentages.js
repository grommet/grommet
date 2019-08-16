import React from 'react';
import { storiesOf } from '@storybook/react';
import { Grommet, Box, Grid } from 'grommet';
import { grommet } from 'grommet/themes';

var Percentages = function Percentages() {
  return React.createElement(Grommet, {
    theme: grommet,
    full: true
  }, React.createElement(Grid, {
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
  }, React.createElement(Box, {
    gridArea: "nav",
    background: "brand"
  }), React.createElement(Box, {
    gridArea: "main",
    background: "brand"
  })));
};

storiesOf('Grid', module).add('Percentages', function () {
  return React.createElement(Percentages, null);
});