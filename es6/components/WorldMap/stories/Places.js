function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import React from 'react';
import { Box, CheckBox, Grommet, Text, WorldMap } from 'grommet';
import { grommet } from 'grommet/themes';

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

  return /*#__PURE__*/React.createElement(Grommet, {
    theme: grommet
  }, /*#__PURE__*/React.createElement(Box, {
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
      location: [9.933333, -84.083333]
    }, placeProps('San José', 'graph-2', showDrops))]
  })));
};
export default {
  title: 'Visualizations/WorldMap/Places'
};