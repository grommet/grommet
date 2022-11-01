import React from 'react';
import { Box, DataTable } from 'grommet';

// Source code for the data can be found here
// https://github.com/grommet/grommet/blob/master/src/js/components/DataTable/stories/data.js
import { columns, DATA } from './data';
export var Simple = function Simple() {
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
      step: 10
    }))
    // </Grommet>
  );
};

export default {
  title: 'Visualizations/DataTable/Simple'
};