import React from 'react';
import { Box, Data, DataSort, DataTable } from 'grommet';
import { columns, DATA } from '../../DataTable/stories/data';
var properties = {};
columns.forEach(function (_ref) {
  var property = _ref.property,
    header = _ref.header;
  properties[property] = {
    label: typeof header === 'string' ? header : property
  };
});
export var Simple = function Simple() {
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
      data: DATA,
      properties: properties
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
  title: 'Data/DataSort/Simple'
};