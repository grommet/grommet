function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
import React from 'react';
import { Box, CheckBox, Text, WorldMap } from 'grommet';
var placeProps = function placeProps(name, color, showDrop) {
  return _extends({
    name: name,
    color: color
  }, showDrop ? {
    content: /*#__PURE__*/React.createElement(Box, {
      pad: {
        horizontal: 'small',
        vertical: 'xsmall'
      }
    }, /*#__PURE__*/React.createElement(Text, null, name)),
    dropProps: {
      align: {
        left: 'right'
      },
      background: {
        color: color,
        opacity: 'strong'
      },
      elevation: 'medium',
      margin: {
        left: 'small'
      },
      round: 'xsmall'
    }
  } : {});
};
export var Places = function Places() {
  var _React$useState = React.useState(true),
    showDrops = _React$useState[0],
    setShowDrops = _React$useState[1];
  return /*#__PURE__*/React.createElement(Box, {
    align: "center",
    pad: "large"
  }, /*#__PURE__*/React.createElement(CheckBox, {
    label: "show",
    checked: showDrops,
    onChange: function onChange() {
      return setShowDrops(!showDrops);
    }
  }), /*#__PURE__*/React.createElement(WorldMap, {
    places: [_extends({
      location: [-33.8830555556, 151.216666667]
    }, placeProps('Sydney', 'graph-1', showDrops)), _extends({
      location: [42.358056, -71.063611]
    }, placeProps('Boston', 'graph-2', showDrops)), _extends({
      location: [51.507222, -0.1275]
    }, placeProps('London', 'graph-3', showDrops)), _extends({
      location: [-0.002222, -78.455833]
    }, placeProps('Quito', 'graph-1', showDrops)), _extends({
      location: [34.05, -118.25]
    }, placeProps('Los Angeles', 'graph-2', showDrops)), _extends({
      location: [35.689722, 139.692222]
    }, placeProps('Tokyo', 'graph-3', showDrops)), _extends({
      location: [78.22, 15.65]
    }, placeProps('Svalbard', 'graph-1', showDrops)), _extends({
      location: [-54.801944, -68.303056]
    }, placeProps('Ushuaia', 'graph-2', showDrops))]
  }));
};
export default {
  title: 'Visualizations/WorldMap/Places'
};