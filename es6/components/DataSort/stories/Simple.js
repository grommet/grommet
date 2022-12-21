import React from 'react';
import { Data, DataTable, Grid } from 'grommet';
import { DataSort } from '../DataSort';
import { columns, DATA } from '../../DataTable/stories/data';
export var Simple = function Simple() {
  return (
    /*#__PURE__*/
    // Uncomment <Grommet> lines when using outside of storybook
    // <Grommet theme={...}>
    React.createElement(Grid, {
      pad: "large",
      columns: ['large'],
      justifyContent: "center"
    }, /*#__PURE__*/React.createElement(Data, {
      data: DATA,
      updateOn: "change"
    }, /*#__PURE__*/React.createElement(DataSort, null), /*#__PURE__*/React.createElement(DataTable, {
      columns: columns
    })))
    // </Grommet>
  );
};

Simple.args = {
  full: true
};
export default {
  title: 'Layout/Data/DataSort/Simple'
};