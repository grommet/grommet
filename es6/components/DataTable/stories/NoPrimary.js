import React from 'react';
import { Box, DataTable } from 'grommet';

// Source code for the data can be found here
// https://github.com/grommet/grommet/blob/master/src/js/components/DataTable/stories/data.js
import { DATA } from './data';
var columns = [{
  property: 'name',
  header: 'Name'
}, {
  property: 'location',
  header: 'Location'
}];
export var NoPrimaryKeyDataTable = function NoPrimaryKeyDataTable() {
  return (
    /*#__PURE__*/
    // Uncomment <Grommet> lines when using outside of storybook
    // <Grommet theme={grommet}>
    React.createElement(Box, {
      align: "center",
      pad: "large"
    }, /*#__PURE__*/React.createElement(DataTable, {
      columns: columns,
      data: DATA,
      step: 10,
      primaryKey: false
    }))
    // </Grommet>
  );
};

NoPrimaryKeyDataTable.storyName = 'No primary';
export default {
  title: 'Visualizations/DataTable/No primary'
};