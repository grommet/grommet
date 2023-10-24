function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
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