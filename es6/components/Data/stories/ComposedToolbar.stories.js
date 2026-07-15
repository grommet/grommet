import React from 'react';
import { Box, DataFilters, DataFilter, DataSearch, DataSort, DataSummary, DataTable, DataTableColumns, DataView, Toolbar } from 'grommet';
import { Data } from '../Data';
import { columns, DATA } from '../../DataTable/stories/data';
export var ComposedToolbar = function ComposedToolbar() {
  return (
    /*#__PURE__*/
    // Uncomment <Grommet> lines when using outside of storybook
    // <Grommet theme={...}>
    React.createElement(Box, {
      pad: "large"
    }, /*#__PURE__*/React.createElement(Data, {
      data: DATA,
      properties: {
        date: {
          filter: false
        },
        location: {
          label: 'Location'
        },
        name: {
          filter: false
        },
        percent: {
          filter: false
        },
        paid: {
          filter: false
        }
      },
      views: [{
        name: 'My location',
        properties: {
          location: ['San Francisco']
        }
      }]
    }, /*#__PURE__*/React.createElement(Toolbar, {
      gap: "medium"
    }, /*#__PURE__*/React.createElement(Toolbar, null, /*#__PURE__*/React.createElement(DataSearch, null), /*#__PURE__*/React.createElement(DataSort, {
      drop: true
    }), /*#__PURE__*/React.createElement(DataFilters, {
      drop: true
    }, /*#__PURE__*/React.createElement(DataFilter, {
      property: "location"
    }))), /*#__PURE__*/React.createElement(DataView, null), /*#__PURE__*/React.createElement(DataTableColumns, {
      options: columns.map(function (column) {
        return {
          property: column.property,
          label: column.header
        };
      }),
      drop: true
    })), /*#__PURE__*/React.createElement(DataSummary, null), /*#__PURE__*/React.createElement(Box, {
      overflow: "auto"
    }, /*#__PURE__*/React.createElement(DataTable, {
      alignSelf: "start",
      columns: columns,
      sortable: true,
      primaryKey: "name"
    }))))
    // </Grommet>
  );
};
ComposedToolbar.storyName = 'Composed Toolbar';
ComposedToolbar.args = {
  full: true
};
export default {
  title: 'Data/Data/Composed Toolbar'
};