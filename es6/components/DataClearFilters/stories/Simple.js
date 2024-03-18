import React, { useContext } from 'react';
import { Box, Data, DataClearFilters, DataContext, DataFilter, DataFilters, DataSearch, DataSummary, DataView, DataTable, SelectMultiple, Toolbar } from 'grommet';
import { columns, DATA } from '../../DataTable/stories/data';
export var Simple = function Simple() {
  return (
    /*#__PURE__*/
    // Uncomment <Grommet> lines when using outside of storybook
    // <Grommet theme={...}>
    React.createElement(Box, {
      pad: "medium"
    }, /*#__PURE__*/React.createElement(Data, {
      data: DATA,
      total: DATA.length,
      properties: {
        location: {
          label: 'Location',
          badge: false
        },
        percent: {
          label: 'Percent'
        },
        date: {
          label: 'date'
        },
        name: {
          label: 'Name'
        }
      },
      views: [{
        name: 'latest',
        sort: {
          property: 'date',
          direction: 'desc'
        }
      }, {
        name: 'Bay Area behind',
        properties: {
          percent: {
            min: 0,
            max: 50
          },
          location: ['San Francisco']
        }
      }]
    }, /*#__PURE__*/React.createElement(DataToolbar, null), /*#__PURE__*/React.createElement(DataSummary, null), /*#__PURE__*/React.createElement(DataTable, {
      columns: columns
    })))
    // </Grommet>
  );
};
var DataToolbar = function DataToolbar() {
  var _useContext = useContext(DataContext),
    view = _useContext.view;
  return /*#__PURE__*/React.createElement(Toolbar, {
    gap: "medium",
    align: "end"
  }, /*#__PURE__*/React.createElement(Toolbar, {
    align: "end"
  }, /*#__PURE__*/React.createElement(DataSearch, null), /*#__PURE__*/React.createElement(DataFilters, {
    updateOn: "change",
    clearFilters: false
  }, /*#__PURE__*/React.createElement(DataFilter, {
    property: "location"
    // override HPE theme margin to align with search + filter
    ,
    contentProps: {
      margin: {
        bottom: 'none',
        top: 'xsmall'
      }
    }
    // override Grommet theme margin to align with search + filter
    ,
    margin: "none"
  }, /*#__PURE__*/React.createElement(SelectMultiple, {
    placeholder: "Select location",
    options: ['Boise', 'Fort Collins', 'Palo Alto', 'San Francisco'],
    name: "location"
  }))), /*#__PURE__*/React.createElement(DataFilters, {
    layer: true,
    clearFilters: false
  }, /*#__PURE__*/React.createElement(DataFilter, {
    property: "name"
  }), /*#__PURE__*/React.createElement(DataFilter, {
    property: "percent"
  }), /*#__PURE__*/React.createElement(DataFilter, {
    property: "paid"
  })), (view == null ? void 0 : view.properties) !== undefined && Object.keys(view == null ? void 0 : view.properties).length !== 0 ? /*#__PURE__*/React.createElement(DataClearFilters, null) : null), /*#__PURE__*/React.createElement(DataView, null));
};
Simple.storyName = 'Simple';
export default {
  title: 'Data/DataClearFilters/Simple'
};