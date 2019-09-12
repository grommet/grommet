import React from 'react';
import { storiesOf } from '@storybook/react';
import { Grommet, Box, DataTable } from 'grommet';
import { grommet } from 'grommet/themes';
import { columns, DATA } from './data';

var ClickableDataTable = function ClickableDataTable() {
  return React.createElement(Grommet, {
    theme: grommet
  }, React.createElement(Box, {
    align: "center",
    pad: "large"
  }, React.createElement(DataTable, {
    columns: columns,
    data: DATA,
    step: 10,
    onClickRow: function onClickRow(event) {
      return alert(JSON.stringify(event.datum, null, 2));
    }
  })));
};

storiesOf('DataTable', module).add('Clickable', function () {
  return React.createElement(ClickableDataTable, null);
});