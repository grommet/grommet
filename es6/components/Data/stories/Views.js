import React from 'react';
import { Box, Data, DataTable } from 'grommet';
import { columns, DATA } from '../../DataTable/stories/data';
export var Views = function Views() {
  return (
    /*#__PURE__*/
    // Uncomment <Grommet> lines when using outside of storybook
    // <Grommet theme={...}>
    React.createElement(Box, {
      pad: "large"
    }, /*#__PURE__*/React.createElement(Data, {
      data: DATA,
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
      }, {
        name: 'Fewer Columns',
        columns: ['name', 'location']
      }],
      toolbar: true
    }, /*#__PURE__*/React.createElement(DataTable, {
      alignSelf: "start",
      columns: columns
    })))
    // </Grommet>
  );
};
Views.args = {
  full: true
};
export default {
  title: 'Data/Data/Views'
};