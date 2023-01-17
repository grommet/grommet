import React from 'react';
import { Box, Data } from 'grommet';
import { DataView } from '../DataView';
import { DATA } from '../../DataTable/stories/data';
export var Simple = function Simple() {
  return (
    /*#__PURE__*/
    // Uncomment <Grommet> lines when using outside of storybook
    // <Grommet theme={...}>
    React.createElement(Box, {
      fill: true,
      align: "center",
      justify: "start",
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
        name: 'behind',
        properties: {
          percent: {
            min: 0,
            max: 30
          }
        }
      }]
    }, /*#__PURE__*/React.createElement(DataView, null)))
    // </Grommet>
  );
};

Simple.args = {
  full: true
};
export default {
  title: 'Layout/Data/DataView/Simple'
};