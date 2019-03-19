import React from 'react';
import { storiesOf } from '@storybook/react';
import { Box, Grommet, Table, TableBody, TableCell, TableFooter, TableHeader, TableRow, Text } from 'grommet';
import { grommet } from 'grommet/themes';
import { data, columns } from './data';

var DefaultTable = function DefaultTable() {
  return React.createElement(Grommet, {
    theme: grommet
  }, React.createElement(Box, {
    align: "center",
    pad: "large"
  }, React.createElement(Table, {
    caption: "Default Table"
  }, React.createElement(TableHeader, null, React.createElement(TableRow, null, columns.map(function (c) {
    return React.createElement(TableCell, {
      key: c.property,
      scope: "col",
      align: c.align
    }, React.createElement(Text, null, c.label));
  }))), React.createElement(TableBody, null, data.map(function (datum) {
    return React.createElement(TableRow, {
      key: datum.id
    }, columns.map(function (c) {
      return React.createElement(TableCell, {
        key: c.property,
        scope: c.dataScope,
        align: c.align
      }, React.createElement(Text, null, c.format ? c.format(datum) : datum[c.property]));
    }));
  })), React.createElement(TableFooter, null, React.createElement(TableRow, null, columns.map(function (c) {
    return React.createElement(TableCell, {
      key: c.property,
      align: c.align
    }, React.createElement(Text, null, c.footer));
  }))))));
};

storiesOf('Table', module).add('Default', function () {
  return React.createElement(DefaultTable, null);
});