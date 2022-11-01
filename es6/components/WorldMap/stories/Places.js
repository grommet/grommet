function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
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