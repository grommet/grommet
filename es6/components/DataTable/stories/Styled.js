import React from 'react';
import { storiesOf } from '@storybook/react';
import { Grommet, Box, DataTable } from 'grommet';
import { grommet } from 'grommet/themes';
import { columns, DATA } from './data';

var StyledDataTable = function StyledDataTable() {
  return React.createElement(Grommet, {
    theme: grommet
  }, React.createElement(Box, {
    align: "center",
    pad: "large"
  }, React.createElement(DataTable, {
    columns: columns,
    data: DATA,
    step: 10,
    pad: {
      horizontal: 'large',
      vertical: 'medium'
    },
    background: {
      header: 'dark-3',
      body: ['light-1', 'light-3'],
      footer: 'dark-3'
    },
    border: {
      body: 'bottom'
    },
    rowProps: {
      Eric: {
        background: 'accent-2',
        pad: 'large'
      }
    }
  })));
};

storiesOf('DataTable', module).add('Styled', function () {
  return React.createElement(StyledDataTable, null);
});