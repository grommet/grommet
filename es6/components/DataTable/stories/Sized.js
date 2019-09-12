import React from 'react';
import { storiesOf } from '@storybook/react';
import { Grommet, Box, DataTable } from 'grommet';
import { grommet } from 'grommet/themes';
import { columns, data } from './data';

var SizedDataTable = function SizedDataTable() {
  return React.createElement(Grommet, {
    theme: grommet
  }, React.createElement(Box, {
    align: "center",
    pad: "large"
  }, React.createElement(DataTable, {
    columns: columns,
    data: data,
    size: "medium"
  })));
};

storiesOf('DataTable', module).add('Sized', function () {
  return React.createElement(SizedDataTable, null);
});