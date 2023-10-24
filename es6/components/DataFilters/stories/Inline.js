import React from 'react';
import { Box, Data, DataFilter, DataSearch, DataSort, DataView, Notification } from 'grommet';
import { DataFilters } from '../DataFilters';
import { DATA } from '../../DataTable/stories/data';
export var Inline = function Inline() {
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
      views: [{
        name: 'latest',
        sort: {
          property: 'date',
          direction: 'desc'
        }
      }, {
        name: 'behind',
        properties: {
          percent: {
            min: 0,
            max: 30
          }
        }
      }]
    }, /*#__PURE__*/React.createElement(DataFilters, null, /*#__PURE__*/React.createElement(DataView, null), /*#__PURE__*/React.createElement(DataSearch, null), /*#__PURE__*/React.createElement(DataFilter, {
      property: "location"
    }), /*#__PURE__*/React.createElement(DataFilter, {
      property: "percent"
    }), /*#__PURE__*/React.createElement(DataSort, null))))
    // </Grommet>
  );
};

Inline.args = {
  full: true
};
export default {
  title: 'Data/DataFilters/Inline'
};