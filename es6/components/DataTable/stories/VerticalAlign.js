import React from 'react';
import { Box, DataTable } from 'grommet';

// Source code for the data can be found here
// https://github.com/grommet/grommet/blob/master/src/js/components/DataTable/stories/data.js
import { columns, DATA } from './data';
export var VerticalAlign = function VerticalAlign() {
  return (
    /*#__PURE__*/
    // Uncomment <Grommet> lines when using outside of storybook
    // <Grommet theme={grommet}>
    React.createElement(Box, {
      align: "center",
      pad: "large"
    }, /*#__PURE__*/React.createElement(DataTable, {
      columns: [{
        property: 'large',
        header: 'This header name is long and wraps',
        render: function render() {
          return 'This content is long and wraps a lot too.';
        },
        size: 'small',
        footer: 'This footer content is long and wraps.'
      }].concat(columns),
      data: DATA,
      step: 10,
      verticalAlign: {
        header: 'bottom',
        body: 'top',
        footer: 'top'
      }
    }))
    // </Grommet>
  );
};

VerticalAlign.storyName = 'Vertical Align';
export default {
  title: 'Visualizations/DataTable/Vertical Align'
};