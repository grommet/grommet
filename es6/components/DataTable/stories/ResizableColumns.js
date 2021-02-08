import React from 'react';
import { Grommet, Box, DataTable, Heading } from 'grommet';
import { grommet } from 'grommet/themes';
var DATA = [{
  location: 'Winston Salem',
  date: '2018-01-09',
  percent: 24,
  paid: 3425
}, {
  location: 'Fort Collins',
  date: '2018-06-10',
  percent: 30,
  paid: 1234
}, {
  location: 'Palo Alto',
  date: '2018-06-09',
  percent: 40,
  paid: 2345
}, {
  location: 'Palo Alto',
  date: '2018-06-11',
  percent: 80,
  paid: 3456
}, {
  location: 'Fort Collins',
  date: '2018-06-10',
  percent: 60,
  paid: 1234
}, {
  location: 'Palo Alto',
  date: '2018-06-09',
  percent: 40,
  paid: 3456
}, {
  location: 'Boise',
  date: '2018-06-11',
  percent: 50,
  paid: 1234
}, {
  location: 'San Francisco',
  date: '2018-06-10',
  percent: 10,
  paid: 2345
}];
var columnsResize = [{
  property: 'location',
  header: 'Location',
  size: 'small'
}, {
  property: 'date',
  header: 'Date',
  size: 'small',
  align: 'end'
}, {
  property: 'percent',
  header: 'Percent',
  size: 'xsmall',
  align: 'end'
}, {
  property: 'paid',
  header: 'Paid',
  size: 'xsmall',
  align: 'end'
}];
export var ResizableDataTable = function ResizableDataTable() {
  return /*#__PURE__*/React.createElement(Grommet, {
    theme: grommet
  }, /*#__PURE__*/React.createElement(Box, {
    align: "center",
    pad: "large"
  }, /*#__PURE__*/React.createElement(Heading, {
    level: "3"
  }, "Table with resizable & column sizes"), /*#__PURE__*/React.createElement(DataTable, {
    columns: columnsResize,
    data: DATA,
    primaryKey: false,
    resizeable: true
  })));
};
ResizableDataTable.storyName = 'Resizable columns';
export default {
  title: 'Visualizations/DataTable/Resizable columns'
};