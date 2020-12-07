import React from 'react';
import { Grommet, Box, DataTable, Text } from 'grommet';
import { grommet } from 'grommet/themes'; // Source code for the data can be found here
// https://github.com/grommet/grommet/blob/master/src/js/components/DataTable/stories/data.js

import { columns, DATA } from './data';
export var Placeholder = function Placeholder() {
  return /*#__PURE__*/React.createElement(Grommet, {
    theme: grommet
  }, /*#__PURE__*/React.createElement(Box, {
    align: "center",
    pad: "large"
  }, /*#__PURE__*/React.createElement(DataTable, {
    columns: columns,
    data: DATA,
    placeholder: /*#__PURE__*/React.createElement(Box, {
      fill: true,
      align: "center",
      justify: "center",
      direction: "row",
      pad: "large",
      gap: "small",
      background: {
        color: 'background-front',
        opacity: 'strong'
      }
    }, /*#__PURE__*/React.createElement(Box, {
      direction: "row",
      border: [{
        side: 'all',
        color: 'transparent',
        size: 'medium'
      }, {
        side: 'horizontal',
        color: 'brand',
        size: 'medium'
      }],
      pad: "small",
      round: "full",
      animation: {
        type: 'rotateRight',
        duration: 1500
      }
    }), /*#__PURE__*/React.createElement(Text, {
      weight: "bold"
    }, "Loading ...")),
    step: 10
  })));
};