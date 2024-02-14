import React from 'react';
import { Box, DataTable } from 'grommet';
import { Data } from '../Data';
import { columns, DATA } from '../../DataTable/stories/data';
export var Simple = function Simple() {
  return (
    /*#__PURE__*/
    // Uncomment <Grommet> lines when using outside of storybook
    // <Grommet theme={...}>
    React.createElement(Box, {
      pad: "large"
    }, /*#__PURE__*/React.createElement(Data, {
      data: DATA,
      toolbar: true
    }, /*#__PURE__*/React.createElement(DataTable, {
      alignSelf: "start",
      columns: columns
    })))
    // </Grommet>
  );
};
Simple.args = {
  full: true
};
export default {
  title: 'Data/Data/Simple'
};