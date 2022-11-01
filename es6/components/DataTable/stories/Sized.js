import React from 'react';
import { Box, DataTable } from 'grommet';

// Source code for the data can be found here
// https://github.com/grommet/grommet/blob/master/src/js/components/DataTable/stories/data.js
import { columns, data } from './data';
export var SizedDataTable = function SizedDataTable() {
  return (
    /*#__PURE__*/
    // Uncomment <Grommet> lines when using outside of storybook
    // <Grommet theme={grommet}>
    React.createElement(Box, {
      align: "center",
      pad: "large"
    }, /*#__PURE__*/React.createElement(DataTable, {
      columns: columns,
      data: data,
      size: "medium"
    }))
    // </Grommet>
  );
};

SizedDataTable.storyName = 'Sized';
export default {
  title: 'Visualizations/DataTable/Sized'
};