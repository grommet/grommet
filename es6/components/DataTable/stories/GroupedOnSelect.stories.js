function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
import React from 'react';
import { Box, DataTable } from 'grommet';
// Source code for the data can be found here
// https://github.com/grommet/grommet/blob/master/src/js/components/DataTable/stories/data.js
import { columns, DATA } from './data';
var groupColumns = [].concat(columns);
var first = groupColumns[0];
groupColumns[0] = _extends({}, groupColumns[1]);
groupColumns[1] = _extends({}, first);
groupColumns[0].footer = groupColumns[1].footer;
delete groupColumns[1].footer;
export var GroupedOnSelectDataTable = function GroupedOnSelectDataTable() {
  return (
    /*#__PURE__*/
    // Uncomment <Grommet> lines when using outside of storybook
    // <Grommet theme={grommet}>
    React.createElement(Box, {
      align: "center",
      pad: "large"
    }, /*#__PURE__*/React.createElement(DataTable, {
      columns: groupColumns,
      data: DATA,
      groupBy: "location",
      onSelect: function onSelect() {},
      sortable: true
    }))
    // </Grommet>
  );
};
GroupedOnSelectDataTable.storyName = 'Grouped and onSelect';
export default {
  title: 'Visualizations/DataTable/Grouped and onSelect'
};