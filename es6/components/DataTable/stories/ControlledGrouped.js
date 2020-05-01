function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import React, { useState } from 'react';
import { storiesOf } from '@storybook/react';
import { Grommet, DataTable } from 'grommet';
import { grommet } from 'grommet/themes'; // Source code for the data can be found here
// https://github.com/grommet/grommet/blob/master/src/js/components/DataTable/stories/data.js

import { columns, DATA } from './data';
var groupColumns = [].concat(columns);
var first = groupColumns[0];
groupColumns[0] = _extends({}, groupColumns[1]);
groupColumns[1] = _extends({}, first);
groupColumns[0].footer = groupColumns[1].footer;
delete groupColumns[1].footer;

var ControlledGroupedDataTable = function ControlledGroupedDataTable() {
  var _useState = useState([DATA[2].location]),
      expandedGroups = _useState[0],
      setExpandedGroups = _useState[1];

  return /*#__PURE__*/React.createElement(Grommet, {
    theme: grommet
  }, /*#__PURE__*/React.createElement(DataTable, {
    columns: groupColumns,
    data: DATA,
    groupBy: {
      property: 'location',
      expand: expandedGroups,
      onExpand: setExpandedGroups
    },
    sortable: true
  }));
};

storiesOf('DataTable', module).add('Controlled grouped', function () {
  return /*#__PURE__*/React.createElement(ControlledGroupedDataTable, null);
});