import React from 'react';
import { Box, ToggleGroup } from 'grommet';
import { List } from "grommet-icons/es6/icons/List";
import { Table } from "grommet-icons/es6/icons/Table";
import { MapLocation } from "grommet-icons/es6/icons/MapLocation";
var options = [{
  icon: /*#__PURE__*/React.createElement(List, {
    a11yTitle: "List view"
  }),
  value: 'list'
}, {
  icon: /*#__PURE__*/React.createElement(Table, {
    a11yTitle: "Map view"
  }),
  value: 'table'
}, {
  icon: /*#__PURE__*/React.createElement(MapLocation, {
    a11yTitle: "Map view"
  }),
  value: 'map'
}];
export var Simple = function Simple() {
  return /*#__PURE__*/React.createElement(Box, {
    gap: "large",
    pad: "large"
  }, /*#__PURE__*/React.createElement(ToggleGroup, {
    a11yTitle: "Choose view",
    options: options,
    defaultValue: "list"
  }));
};
export default {
  title: 'Controls/ToggleGroup/Simple'
};