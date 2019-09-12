function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import React, { Component } from 'react';
import { storiesOf } from '@storybook/react';
import { Grommet, DataTable } from 'grommet';
import { grommet } from 'grommet/themes';
import { columns, DATA } from './data';
var groupColumns = [].concat(columns);
var first = groupColumns[0];
groupColumns[0] = _extends({}, groupColumns[1]);
groupColumns[1] = _extends({}, first);
groupColumns[0].footer = groupColumns[1].footer;
delete groupColumns[1].footer;

var ControlledGroupedDataTable =
/*#__PURE__*/
function (_Component) {
  _inheritsLoose(ControlledGroupedDataTable, _Component);

  function ControlledGroupedDataTable() {
    var _this;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _Component.call.apply(_Component, [this].concat(args)) || this;

    _defineProperty(_assertThisInitialized(_this), "state", {
      expandedGroups: [DATA[2].location]
    });

    return _this;
  }

  var _proto = ControlledGroupedDataTable.prototype;

  _proto.render = function render() {
    var _this2 = this;

    var expandedGroups = this.state.expandedGroups;
    return React.createElement(Grommet, {
      theme: grommet
    }, React.createElement(DataTable, {
      columns: groupColumns,
      data: DATA,
      groupBy: {
        property: 'location',
        expand: expandedGroups,
        onExpand: function onExpand(groupState) {
          return _this2.setState({
            expandedGroups: groupState
          });
        }
      },
      sortable: true
    }));
  };

  return ControlledGroupedDataTable;
}(Component);

storiesOf('DataTable', module).add('Controlled grouped', function () {
  return React.createElement(ControlledGroupedDataTable, null);
});