function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
import React from 'react';
import { Box, DataTable } from 'grommet';
// Source code for the data can be found here
// https://github.com/grommet/grommet/blob/master/src/js/components/DataTable/stories/data.js
import { columns, DATA } from './data';
export var TunableDataTable = function TunableDataTable() {
  return (
    /*#__PURE__*/
    // Uncomment <Grommet> lines when using outside of storybook
    // <Grommet theme={grommet}>
    React.createElement(Box, {
      align: "center",
      pad: "large"
    }, /*#__PURE__*/React.createElement(DataTable, {
      columns: columns.map(function (c) {
        return _extends({}, c, {
          search: c.property === 'name' || c.property === 'location'
        });
      }),
      data: DATA,
      sortable: true,
      resizeable: true
    }))
    // </Grommet>
  );
};
TunableDataTable.storyName = 'Tunable';
export default {
  title: 'Visualizations/DataTable/Tunable'
};