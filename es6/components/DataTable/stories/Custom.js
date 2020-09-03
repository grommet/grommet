import React from 'react';
import { storiesOf } from '@storybook/react';
import { Box, Grommet, DataTable } from 'grommet';
import { Blank } from "grommet-icons/es6/icons/Blank"; // Source code for the data can be found here
// https://github.com/grommet/grommet/blob/master/src/js/components/DataTable/stories/data.js

import { columns, DATA } from './data';

var SortableIcon = function SortableIcon() {
  return /*#__PURE__*/React.createElement(Blank, {
    color: "text-xweak",
    opacity: "0.5"
  }, /*#__PURE__*/React.createElement("g", {
    fill: "none",
    stroke: "#000",
    strokeWidth: "2"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M 6 10 L 12 6 L 18 10"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M 6 14 L 12 18 L 18 14"
  })));
};

var customTheme = {
  global: {
    font: {
      family: 'Helvetica'
    }
  },
  dataTable: {
    icons: {
      sortable: SortableIcon
    }
  }
};

var Example = function Example() {
  var _React$useState = React.useState({
    property: 'name',
    direction: 'desc'
  }),
      sort = _React$useState[0],
      setSort = _React$useState[1];

  return /*#__PURE__*/React.createElement(Grommet, {
    theme: customTheme
  }, /*#__PURE__*/React.createElement(Box, {
    align: "center",
    pad: "large"
  }, /*#__PURE__*/React.createElement(DataTable, {
    columns: columns,
    data: DATA,
    step: 10,
    sort: sort,
    onSort: setSort
  })));
};

storiesOf('DataTable', module).add('Custom', function () {
  return /*#__PURE__*/React.createElement(Example, null);
});