import React from 'react';
import { Box, Data, DataSearch, DataSummary, DataTable, Notification, Toolbar } from 'grommet';
import { DataTableColumns } from '../DataTableColumns';
import { columns, DATA } from '../../DataTable/stories/data';

// simplify option label for name property
var options = columns.map(function (_ref) {
  var header = _ref.header,
    property = _ref.property;
  return {
    property: property,
    label: property === 'name' ? 'Name' : header
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
      data: DATA,
      updateOn: "change"
    }, /*#__PURE__*/React.createElement(Toolbar, null, /*#__PURE__*/React.createElement(DataSearch, null), /*#__PURE__*/React.createElement(DataTableColumns, {
      drop: true,
      options: options
    })), /*#__PURE__*/React.createElement(DataSummary, null), /*#__PURE__*/React.createElement(DataTable, {
      columns: columns,
      primaryKey: "name"
    })))
    // </Grommet>
  );
};

Simple.args = {
  full: true
};
export default {
  title: 'Data/DataTableColumns/Simple'
};