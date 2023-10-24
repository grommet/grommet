import React from 'react';
import { DataFilters, DataFilter, DataSearch, DataSummary, Grid, List, Notification, Toolbar } from 'grommet';
import { Data } from '../Data';
import { DATA } from '../../DataTable/stories/data';
export var Example = function Example() {
  return (
    /*#__PURE__*/
    // Uncomment <Grommet> lines when using outside of storybook
    // <Grommet theme={...}>
    React.createElement(Grid, {
      flex: false,
      pad: "large",
      columns: [['small', 'medium']],
      justifyContent: "center",
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
    }))), /*#__PURE__*/React.createElement(DataSummary, null), /*#__PURE__*/React.createElement(List, {
      primaryKey: "name",
      secondaryKey: "location"
    })))
    // </Grommet>
  );
};

Example.storyName = 'List';
Example.args = {
  full: true
};
export default {
  title: 'Data/Data/List'
};