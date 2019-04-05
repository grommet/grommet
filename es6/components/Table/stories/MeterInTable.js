import React from 'react';
import { storiesOf } from '@storybook/react';
import { Box, Grommet, Meter, Table, TableBody, TableCell, TableRow, Text } from 'grommet';
import { grommet } from 'grommet/themes';
var values = [20, 40, 60, 80, 100];

var MeterInTable = function MeterInTable() {
  return React.createElement(Grommet, {
    theme: grommet
  }, React.createElement(Box, {
    align: "center",
    pad: "large"
  }, React.createElement(Box, {
    border: true
  }, React.createElement(Table, {
    caption: "Meter Inside Table"
  }, React.createElement(TableBody, null, values.map(function (val) {
    return React.createElement(TableRow, null, React.createElement(TableCell, null, React.createElement(Meter, {
      type: "bar",
      values: [{
        value: val
      }]
    })), React.createElement(TableCell, null, React.createElement(Text, null, val, "% complete")));
  }))))));
};

storiesOf('Table', module).add('Meter Inside Table', function () {
  return React.createElement(MeterInTable, null);
});