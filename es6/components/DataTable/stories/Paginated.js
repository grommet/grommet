import React from 'react';
import { Box, Grommet, DataTable } from 'grommet';
import { grommet } from 'grommet/themes';
import { columns, DATA } from './data';
export var Paginated = function Paginated() {
  var _React$useState = React.useState([]),
      select = _React$useState[0],
      setSelect = _React$useState[1];

  return /*#__PURE__*/React.createElement(Grommet, {
    theme: grommet,
    full: true
  }, /*#__PURE__*/React.createElement(Box, {
    pad: "large"
  }, /*#__PURE__*/React.createElement(DataTable, {
    columns: columns,
    data: [].concat(DATA),
    onSelect: setSelect,
    select: select,
    sortable: true,
    step: 3,
    paginate: true
  })));
};
export default {
  title: 'Visualizations/DataTable/Paginated'
};