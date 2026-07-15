import React from 'react';
import { Box, Data, DataSort, DataTable, Toolbar } from 'grommet';
import { columns, DATA } from '../../DataTable/stories/data';
export var Drop = function Drop() {
  return (
    /*#__PURE__*/
    // Uncomment <Grommet> lines when using outside of storybook
    // <Grommet theme={...}>
    React.createElement(Box, {
      align: "center",
      justify: "start",
      pad: "large",
      gap: "medium"
    }, /*#__PURE__*/React.createElement(Data, {
      data: DATA
    }, /*#__PURE__*/React.createElement(Toolbar, null, /*#__PURE__*/React.createElement(DataSort, {
      drop: true
    })), /*#__PURE__*/React.createElement(DataTable, {
      columns: columns
    })))
    // </Grommet>
  );
};
Drop.args = {
  full: true
};
export default {
  title: 'Data/DataSort/Drop'
};