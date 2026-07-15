import React from 'react';
import { Box, Data, DataSummary, DataTable, DataSearch, Paragraph, Toolbar } from 'grommet';
import { columns, DATA } from '../../DataTable/stories/data';
export var Responsive = function Responsive() {
  return (
    /*#__PURE__*/
    // Uncomment <Grommet> lines when using outside of storybook
    // <Grommet theme={...}>
    React.createElement(Box, {
      pad: "large"
    }, /*#__PURE__*/React.createElement(Paragraph, {
      color: "text-weak"
    }, "Note: Results are filtered as you type, checking all fields. When responsive=true on DataSearch, the search control will collapse at small breakpoints. Reduce the width of your screen to see this behavior."), /*#__PURE__*/React.createElement(Data, {
      data: DATA
    }, /*#__PURE__*/React.createElement(Toolbar, null, /*#__PURE__*/React.createElement(DataSearch, {
      responsive: true
    })), /*#__PURE__*/React.createElement(DataSummary, null), /*#__PURE__*/React.createElement(DataTable, {
      columns: columns
    })))
    // </Grommet>
  );
};
Responsive.args = {
  full: true
};
export default {
  title: 'Data/DataSearch/Responsive'
};