import React from 'react';
import { Box, Data, DataTable, Notification, Toolbar } from 'grommet';
import { DataTableGroupBy } from '../DataTableGroupBy';
import { columns, DATA } from '../../DataTable/stories/data';

// simplify option label for name property
var options = columns.filter(function (_ref) {
  var property = _ref.property;
  return ['location', 'percent'].includes(property);
}).map(function (_ref2) {
  var header = _ref2.header,
    property = _ref2.property;
  return {
    property: property,
    label: header
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
    }, /*#__PURE__*/React.createElement(Notification, {
      status: "info",
      message: "Data is in 'beta'. The API surface is subject to change."
    }), /*#__PURE__*/React.createElement(Data, {
      data: DATA
    }, /*#__PURE__*/React.createElement(Toolbar, null, /*#__PURE__*/React.createElement(DataTableGroupBy, {
      options: options
    })), /*#__PURE__*/React.createElement(DataTable, null)))
    // </Grommet>
  );
};

Simple.args = {
  full: true
};
export default {
  title: 'Data/DataTableGroupBy/Simple'
};