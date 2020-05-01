import React from 'react';
import { storiesOf } from '@storybook/react';
import { Grommet, Box, Grid } from 'grommet';
import { grommet } from 'grommet/themes';

var NColumnGrid = function NColumnGrid() {
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

storiesOf('Grid', module).add('N-column layout', function () {
  return /*#__PURE__*/React.createElement(NColumnGrid, null);
});