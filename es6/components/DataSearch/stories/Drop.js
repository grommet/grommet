import React from 'react';
import { Box, Data, DataSummary, DataTable, DataSearch, Paragraph, Toolbar } from 'grommet';
import { columns, DATA } from '../../DataTable/stories/data';
export var Drop = function Drop() {
  return (
    /*#__PURE__*/
    // Uncomment <Grommet> lines when using outside of storybook
    // <Grommet theme={...}>
    React.createElement(Box, {
      pad: "large"
    }, /*#__PURE__*/React.createElement(Paragraph, {
      color: "text-weak"
    }, "Note: Results are filtered as you type, checking all fields."), /*#__PURE__*/React.createElement(Data, {
      data: DATA
    }, /*#__PURE__*/React.createElement(Toolbar, null, /*#__PURE__*/React.createElement(DataSearch, {
      drop: true
    })), /*#__PURE__*/React.createElement(DataSummary, null), /*#__PURE__*/React.createElement(DataTable, {
      alignSelf: "start",
      columns: columns
    })))
    // </Grommet>
  );
};
Drop.args = {
  full: true
};
export default {
  title: 'Data/DataSearch/Drop'
};