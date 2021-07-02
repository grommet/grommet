function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import React from 'react';
import { Grommet, Box, DataTable } from 'grommet';
import { grommet } from 'grommet/themes'; // Source code for the data can be found here
// https://github.com/grommet/grommet/blob/master/src/js/components/DataTable/stories/data.js

import { columns, DATA } from './data';
export var ServedDataTable = function ServedDataTable() {
  var _React$useState = React.useState(DATA),
      data2 = _React$useState[0],
      setData2 = _React$useState[1];

  var onSearch = function onSearch(search) {
    var nextData;

    if (search) {
      // The function below escapes regular expression special characters:
      // [ \ ^ $ . | ? * + ( )
      var escapedText = function escapedText(text) {
        return text.replace(/[-\\^$*+?.()|[\]{}]/g, '\\$&');
      };

      var expressions = Object.keys(search).map(function (property) {
        return {
          property: property,
          // Create the regular expression with modified value which handles
          // escaping special characters. Without escaping special characters,
          // errors will appear in the console
          exp: new RegExp(escapedText(search[property]), 'i')
        };
      });
      nextData = DATA.filter(function (d) {
        return !expressions.some(function (e) {
          return !e.exp.test(d[e.property]);
        });
      });
    } else {
      nextData = DATA;
    }

    setData2(nextData);
  };

  return /*#__PURE__*/React.createElement(Grommet, {
    theme: grommet
  }, /*#__PURE__*/React.createElement(Box, {
    align: "center",
    pad: "large"
  }, /*#__PURE__*/React.createElement(DataTable, {
    columns: columns.map(function (column) {
      return _extends({}, column, {
        search: column.property === 'name' || column.property === 'location'
      });
    }),
    data: data2,
    onSearch: onSearch
  })));
};
ServedDataTable.storyName = 'Served';
export default {
  title: 'Visualizations/DataTable/Served'
};