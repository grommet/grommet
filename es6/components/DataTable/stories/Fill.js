function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import React from 'react';
import { Grommet, Box, DataTable } from 'grommet';
import { grommet } from 'grommet/themes';
import { deepMerge } from 'grommet/utils'; // Source code for the data can be found here
// https://github.com/grommet/grommet/blob/master/src/js/components/DataTable/stories/data.js

import { columns, data } from './data';
var pinnedColumns = columns.map(function (c) {
  return _extends({}, c);
});
pinnedColumns[0].pin = true;
var myTheme = deepMerge(grommet, {
  table: {
    header: {
      background: {
        color: 'background'
      }
    },
    footer: {
      background: {
        color: 'background-back'
      }
    }
  },
  dataTable: {
    pinned: {
      header: {
        background: {
          color: 'brand',
          opacity: 'medium'
        },
        extend: "backdrop-filter: blur(8px);"
      },
      footer: {
        background: {
          color: 'light-2'
        }
      }
    }
  }
});
export var Fill = function Fill() {
  return /*#__PURE__*/React.createElement(Grommet, {
    theme: myTheme,
    full: true
  }, /*#__PURE__*/React.createElement(Box, {
    fill: "vertical"
  }, /*#__PURE__*/React.createElement(DataTable, {
    columns: pinnedColumns,
    data: data,
    step: 10,
    fill: true,
    pin: true,
    background: {
      pinned: {
        color: 'orange'
      }
    }
  })));
};
Fill.story = {
  name: 'Fill and pin'
};