function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
import React from 'react';
import { Grommet, Box, DataTable } from 'grommet';
import { grommet } from 'grommet/themes';
import { deepMerge } from 'grommet/utils';

// Source code for the data can be found here
// https://github.com/grommet/grommet/blob/master/src/js/components/DataTable/stories/data.js
import { columns, data } from '../data';
var pinnedColumns = columns.map(function (c) {
  return _extends({}, c);
});
pinnedColumns[0].pin = true;
var myTheme = deepMerge(grommet, {
  table: {
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
    tabIndex: 0,
    columns: pinnedColumns,
    data: data,
    step: 10,
    fill: true,
    pin: true,
    background: {
      pinned: {
        color: 'background-contrast'
      }
    }
  })));
};
Fill.storyName = 'Fill and pin';
export default {
  title: 'Visualizations/DataTable/Custom Themed/Fill and pin'
};