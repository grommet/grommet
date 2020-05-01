import React from 'react';
import { storiesOf } from '@storybook/react';
import { Box, Grommet, RangeInput } from 'grommet';
import { grommet } from 'grommet/themes';
import { deepMerge } from 'grommet/utils';
import { Volume } from "grommet-icons/es6/icons/Volume";
var customThemeRangeInput = deepMerge(grommet, {
  global: {
    spacing: '12px'
  },
  rangeInput: {
    track: {
      color: 'accent-2',
      height: '12px',
      extend: function extend() {
        return "border-radius: 10px";
      }
    },
    thumb: {
      color: 'neutral-2'
    }
  }
});

var CustomRangeInput = function CustomRangeInput() {
  var _React$useState = React.useState(0.4),
      value = _React$useState[0],
      setValue = _React$useState[1];

  var onChange = function onChange(event) {
    return setValue(event.target.value);
  };

  return /*#__PURE__*/React.createElement(Grommet, {
    theme: customThemeRangeInput
  }, /*#__PURE__*/React.createElement(Box, {
    direction: "row",
    align: "center",
    pad: "large",
    gap: "small"
  }, /*#__PURE__*/React.createElement(Volume, {
    color: "neutral-2"
  }), /*#__PURE__*/React.createElement(Box, {
    align: "center",
    width: "small"
  }, /*#__PURE__*/React.createElement(RangeInput, {
    min: 0,
    max: 1,
    step: 0.1,
    value: value,
    onChange: onChange
  }))));
};

storiesOf('RangeInput', module).add('Custom', function () {
  return /*#__PURE__*/React.createElement(CustomRangeInput, null);
});