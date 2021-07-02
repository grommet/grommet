import React from 'react';
import { Grommet, Box, DataTable } from 'grommet';
import { grommet } from 'grommet/themes'; // Source code for the data can be found here
// https://github.com/grommet/grommet/blob/master/src/js/components/DataTable/stories/data.js

import { groupColumns, DATA } from './data';
export var GroupedDataTable = function GroupedDataTable() {
  return /*#__PURE__*/React.createElement(Grommet, {
    theme: grommet
  }, /*#__PURE__*/React.createElement(Box, {
    align: "center",
    pad: "large"
  }, /*#__PURE__*/React.createElement(DataTable, {
    columns: groupColumns,
    data: DATA,
    groupBy: "location",
    sortable: true
  })));
};
GroupedDataTable.storyName = 'Grouped';
export default {
  title: 'Visualizations/DataTable/Grouped'
};