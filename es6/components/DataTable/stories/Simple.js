import React from 'react';
import { storiesOf } from '@storybook/react';
import { Grommet, Box, DataTable } from 'grommet';
import { grommet } from 'grommet/themes';
import { columns, DATA } from './data';

var SimpleDataTable = function SimpleDataTable() {
  return React.createElement(Grommet, {
    theme: grommet
  }, React.createElement(Box, {
    align: "center",
    pad: "large"
  }, React.createElement(DataTable, {
    columns: columns,
    data: DATA,
    step: 10
  })));
};

storiesOf('DataTable', module).add('Simple', function () {
  return React.createElement(SimpleDataTable, null);
});