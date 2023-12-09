import React, { useContext } from 'react';
import { Box, Data, DataClearFilters, DataContext, DataFilter, DataFilters, DataSearch, DataSummary, DataTable, SelectMultiple, Toolbar } from 'grommet';
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
          label: 'Location'
        }
      }
    }, /*#__PURE__*/React.createElement(DataToolbar, null), /*#__PURE__*/React.createElement(DataSummary, null), /*#__PURE__*/React.createElement(DataTable, {
      columns: columns
    })))
    // </Grommet>
  );
};
var DataToolbar = function DataToolbar() {
  var _useContext = useContext(DataContext),
    filteredTotal = _useContext.filteredTotal,
    total = _useContext.total;
  return /*#__PURE__*/React.createElement(Toolbar, {
    align: "end"
  }, /*#__PURE__*/React.createElement(DataSearch, {
    placeholder: "Search"
  }), /*#__PURE__*/React.createElement(DataFilters, {
    updateOn: "change"
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
  }))), filteredTotal !== total ? /*#__PURE__*/React.createElement(DataClearFilters, null) : null);
};
Simple.storyName = 'Simple';
export default {
  title: 'Data/DataClearFilters/Simple'
};