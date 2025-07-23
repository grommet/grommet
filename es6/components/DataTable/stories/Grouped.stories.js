import React from 'react';
import { Box, DataTable } from 'grommet';

// Source code for the data can be found here
// https://github.com/grommet/grommet/blob/master/src/js/components/DataTable/stories/data.js
import { groupColumns, DATA } from './data';
var expandLabel = function expandLabel(row) {
  return row == null ? void 0 : row.location;
};
export var GroupedDataTable = function GroupedDataTable() {
  return (
    /*#__PURE__*/
    // Uncomment <Grommet> lines when using outside of storybook
    // <Grommet theme={grommet}>
    React.createElement(Box, {
      align: "center",
      pad: "large"
    }, /*#__PURE__*/React.createElement(DataTable, {
      columns: groupColumns,
      data: DATA,
      groupBy: {
        property: 'location',
        expandLabel: expandLabel
      },
      sortable: true
    }))
    // </Grommet>
  );
};
GroupedDataTable.storyName = 'Grouped';
export default {
  title: 'Visualizations/DataTable/Grouped'
};