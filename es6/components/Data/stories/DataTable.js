import React from 'react';
import { Box, DataFilters, DataFilter, DataSearch, DataSort, DataSummary, DataTable, Grid, Notification, Toolbar } from 'grommet';
import { Data } from '../Data';
import { columns, DATA } from '../../DataTable/stories/data';
export var Table = function Table() {
  return (
    /*#__PURE__*/
    // Uncomment <Grommet> lines when using outside of storybook
    // <Grommet theme={...}>
    React.createElement(Grid, {
      height: {
        min: 'medium',
        height: '100%'
      },
      pad: "large",
      columns: [['small', 'large']],
      justifyContent: "center",
      alignContent: "start",
      gap: "large"
    }, /*#__PURE__*/React.createElement(Notification, {
      status: "info",
      message: "Data is in 'beta'. The API surface is subject to change."
    }), /*#__PURE__*/React.createElement(Data, {
      data: DATA
    }, /*#__PURE__*/React.createElement(Toolbar, null, /*#__PURE__*/React.createElement(DataSearch, null), /*#__PURE__*/React.createElement(DataFilters, {
      drop: true
    }, /*#__PURE__*/React.createElement(DataFilter, {
      property: "location"
    }), /*#__PURE__*/React.createElement(DataSort, null))), /*#__PURE__*/React.createElement(DataSummary, null), /*#__PURE__*/React.createElement(Box, {
      flex: true,
      overflow: "auto"
    }, /*#__PURE__*/React.createElement(DataTable, {
      columns: columns
    }))))
    // </Grommet>
  );
};

Table.storyName = 'DataTable';
Table.args = {
  full: true
};
export default {
  title: 'Data/Data/DataTable'
};