function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
import React, { useState } from 'react';
import { DataTable } from 'grommet';

// Source code for the data can be found here
// https://github.com/grommet/grommet/blob/master/src/js/components/DataTable/stories/data.js
import { columns, DATA } from './data';
var groupColumns = [].concat(columns);
var first = groupColumns[0];
groupColumns[0] = _extends({}, groupColumns[1]);
groupColumns[1] = _extends({}, first);
groupColumns[0].footer = groupColumns[1].footer;
delete groupColumns[1].footer;
export var ControlledGroupedDataTable = function ControlledGroupedDataTable() {
  var _useState = useState([DATA[2].location]),
    expandedGroups = _useState[0],
    setExpandedGroups = _useState[1];
  return (
    /*#__PURE__*/
    // Uncomment <Grommet> lines when using outside of storybook
    // <Grommet theme={grommet}>
    React.createElement(DataTable, {
      columns: groupColumns,
      data: DATA,
      groupBy: {
        property: 'location',
        expand: expandedGroups,
        onExpand: setExpandedGroups
      },
      sortable: true
    })
    // </Grommet>
  );
};
ControlledGroupedDataTable.storyName = 'Controlled grouped';
export default {
  title: 'Visualizations/DataTable/Controlled grouped'
};