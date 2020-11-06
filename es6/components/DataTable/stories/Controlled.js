function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import React from 'react';
import { Grommet, Box, DataTable, CheckBox } from 'grommet';
import { grommet } from 'grommet/themes'; // Source code for the data can be found here
// https://github.com/grommet/grommet/blob/master/src/js/components/DataTable/stories/data.js

import { columns, DATA } from './data';
var controlledColumns = columns.map(function (col) {
  return _extends({}, col);
});
delete controlledColumns[0].footer;
delete controlledColumns[3].footer;
delete controlledColumns[4].footer;
delete controlledColumns[4].aggregate;
export var ControlledDataTable = function ControlledDataTable() {
  var _React$useState = React.useState([]),
      checked = _React$useState[0],
      setChecked = _React$useState[1];

  var onCheck = function onCheck(event, value) {
    if (event.target.checked) {
      setChecked([].concat(checked, [value]));
    } else {
      setChecked(checked.filter(function (item) {
        return item !== value;
      }));
    }
  };

  var onCheckAll = function onCheckAll(event) {
    return setChecked(event.target.checked ? DATA.map(function (datum) {
      return datum.name;
    }) : []);
  };

  return /*#__PURE__*/React.createElement(Grommet, {
    theme: grommet
  }, /*#__PURE__*/React.createElement(Box, {
    align: "center",
    pad: "medium"
  }, /*#__PURE__*/React.createElement(DataTable, {
    columns: [{
      property: 'checkbox',
      render: function render(datum) {
        return /*#__PURE__*/React.createElement(CheckBox, {
          key: datum.name,
          checked: checked.indexOf(datum.name) !== -1,
          onChange: function onChange(e) {
            return onCheck(e, datum.name);
          }
        });
      },
      header: /*#__PURE__*/React.createElement(CheckBox, {
        checked: checked.length === DATA.length,
        indeterminate: checked.length > 0 && checked.length < DATA.length,
        onChange: onCheckAll
      }),
      sortable: false
    }].concat(controlledColumns).map(function (col) {
      return _extends({}, col);
    }),
    data: DATA,
    sortable: true,
    size: "medium"
  })));
};
ControlledDataTable.story = {
  name: 'Controlled'
};