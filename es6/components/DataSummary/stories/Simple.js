import React from 'react';
import { Box, Data, DataTable } from 'grommet';
import { DataSummary } from '../DataSummary';
import { columns, DATA } from '../../DataTable/stories/data';
export var Simple = function Simple() {
  return (
    /*#__PURE__*/
    // Uncomment <Grommet> lines when using outside of storybook
    // <Grommet theme={...}>
    React.createElement(Box, {
      fill: true,
      align: "center",
      justify: "start",
      pad: "large"
    }, /*#__PURE__*/React.createElement(Data, {
      data: DATA
    }, /*#__PURE__*/React.createElement(DataSummary, null), /*#__PURE__*/React.createElement(DataTable, {
      columns: columns
    })))
    // </Grommet>
  );
};

Simple.args = {
  full: true
};
export default {
  title: 'Layout/Data/DataSummary/Simple'
};