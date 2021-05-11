import React, { useState } from 'react';
import { Grommet, Box, Meter, Text } from 'grommet';
import { grommet } from 'grommet/themes';
export var MultipleValues = function MultipleValues() {
  var total = 100;

  var _useState = useState(0),
      active = _useState[0],
      setActive = _useState[1];

  var _useState2 = useState(''),
      label = _useState2[0],
      setLabel = _useState2[1];

  var _useState3 = useState(false),
      highlight = _useState3[0],
      setHighlight = _useState3[1];

  return /*#__PURE__*/React.createElement(Grommet, {
    theme: grommet
  }, /*#__PURE__*/React.createElement(Box, {
    align: "center",
    pad: "large",
    gap: "medium"
  }, /*#__PURE__*/React.createElement(Meter, {
    type: "bar",
    background: "light-2",
    values: [{
      value: 50,
      onHover: function onHover(over) {
        setActive(over ? 50 : 0);
        setLabel(over ? 'in use' : undefined);
      },
      onClick: function onClick() {
        setHighlight(function () {
          return !highlight;
        });
      },
      highlight: highlight
    }, {
      value: 30,
      onHover: function onHover(over) {
        setActive(over ? 30 : 0);
        setLabel(over ? 'available' : undefined);
      }
    }],
    max: 100,
    size: "medium",
    thickness: "medium",
    direction: "vertical"
  }), /*#__PURE__*/React.createElement(Box, {
    align: "center"
  }, /*#__PURE__*/React.createElement(Box, {
    direction: "row",
    align: "center",
    pad: {
      bottom: 'xsmall'
    }
  }, /*#__PURE__*/React.createElement(Text, {
    size: "xxlarge",
    weight: "bold"
  }, active || total), /*#__PURE__*/React.createElement(Text, null, "GB")), /*#__PURE__*/React.createElement(Text, null, label || 'total'))));
};
MultipleValues.storyName = 'Vertical Bar Multiple';
export default {
  title: 'Visualizations/Meter/Vertical Bar Multiple'
};