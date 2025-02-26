import React from 'react';
import { Box, Data, DataTable, DataView } from 'grommet';
import { DATA, columns } from '../../DataTable/stories/data';
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
    }, /*#__PURE__*/React.createElement(DataView, null), /*#__PURE__*/React.createElement(DataTable, {
      columns: columns
    })))
    // </Grommet>
  );
};
Simple.args = {
  full: true
};
export default {
  title: 'Data/DataView/Simple'
};