/* eslint-disable react/no-array-index-key */
import React from 'react';
import { Box, Meter, Table, TableBody, TableCell, TableRow, Text } from 'grommet';
var values = [20, 40, 60, 80, 100];
export var MeterInTable = function MeterInTable() {
  return (
    /*#__PURE__*/
    // Uncomment <Grommet> lines when using outside of storybook
    // <Grommet theme={...}>
    React.createElement(Box, {
      align: "center",
      pad: "large"
    }, /*#__PURE__*/React.createElement(Box, {
      border: true,
      pad: {
        top: 'xsmall'
      }
    }, /*#__PURE__*/React.createElement(Table, {
      caption: "Meter Inside Table"
    }, /*#__PURE__*/React.createElement(TableBody, null, values.map(function (val, index) {
      return /*#__PURE__*/React.createElement(TableRow, {
        key: index
      }, /*#__PURE__*/React.createElement(TableCell, null, /*#__PURE__*/React.createElement(Meter, {
        type: "bar",
        values: [{
          value: val
        }]
      })), /*#__PURE__*/React.createElement(TableCell, null, /*#__PURE__*/React.createElement(Text, null, val, "% complete")));
    })))))
    // </Grommet>
  );
};

MeterInTable.storyName = 'Meter inside table';
export default {
  title: 'Visualizations/Table/Meter inside table'
};