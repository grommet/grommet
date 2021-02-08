import React from 'react';
import { Grommet, Box, DataTable, Heading } from 'grommet';
import { grommet } from 'grommet/themes';
var DATA = [{
  name: 'Boot',
  free: 24,
  size: 4
}, {
  name: 'Backup',
  free: 30,
  size: 12
}, {
  name: 'Application',
  free: 40,
  size: 23
}];
var columns = [{
  property: 'name',
  header: 'Disk Name',
  size: 'small'
}, {
  property: 'size',
  header: 'Size',
  size: 'xsmall',
  align: 'end',
  units: '(TiB)'
}, {
  property: 'free',
  header: 'Free',
  size: 'xsmall',
  align: 'end',
  units: '%'
}];
export var UnitsDataTable = function UnitsDataTable() {
  return /*#__PURE__*/React.createElement(Grommet, {
    theme: grommet
  }, /*#__PURE__*/React.createElement(Box, {
    align: "center",
    pad: "large"
  }, /*#__PURE__*/React.createElement(Heading, {
    level: "3"
  }, "Table with units in the heading"), /*#__PURE__*/React.createElement(DataTable, {
    columns: columns,
    data: DATA,
    primaryKey: false
  })));
};
UnitsDataTable.storyName = 'Units';
export default {
  title: 'Visualizations/DataTable/Units'
};