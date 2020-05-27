import React from 'react';
import { storiesOf } from '@storybook/react';
import { Box, Button, Grommet, RangeInput } from 'grommet';
import { Add } from "grommet-icons/es6/icons/Add";
import { Subtract } from "grommet-icons/es6/icons/Subtract";
var rangeInputTheme = {
  rangeInput: {
    track: {
      height: '10px',
      lower: {
        color: 'brand',
        opacity: 0.7
      },
      upper: {
        color: 'dark-4',
        opacity: 0.3
      }
    }
  }
};

var CustomRangeInput = function CustomRangeInput() {
  var _React$useState = React.useState(3),
      value = _React$useState[0],
      setValue = _React$useState[1];

  var _React$useState2 = React.useState(),
      isAddDisabled = _React$useState2[0],
      setIsAddDisabled = _React$useState2[1];

  var _React$useState3 = React.useState(),
      isSubtractDisabled = _React$useState3[0],
      setIsSubtractDisabled = _React$useState3[1];

  var onChange = function onChange(event) {
    return setValue(event.target.value);
  };

  return /*#__PURE__*/React.createElement(Grommet, {
    theme: rangeInputTheme
  }, /*#__PURE__*/React.createElement(Box, {
    direction: "row",
    align: "center",
    pad: "large",
    gap: "small"
  }, /*#__PURE__*/React.createElement(Button, {
    plain: false,
    disabled: isSubtractDisabled,
    icon: /*#__PURE__*/React.createElement(Subtract, {
      color: "neutral-2"
    }),
    onClick: function onClick() {
      if (value > 0) {
        setIsAddDisabled(false);
        setValue(value - 1);
      } else setIsSubtractDisabled(true);
    }
  }), /*#__PURE__*/React.createElement(Box, {
    align: "center",
    width: "medium"
  }, /*#__PURE__*/React.createElement(RangeInput, {
    min: 0,
    max: 10,
    step: 1,
    value: value,
    onChange: onChange
  })), /*#__PURE__*/React.createElement(Button, {
    plain: false,
    disabled: isAddDisabled,
    icon: /*#__PURE__*/React.createElement(Add, {
      color: "neutral-2"
    }),
    onClick: function onClick() {
      if (value < 10) {
        setIsSubtractDisabled(false);
        setValue(value + 1);
      } else setIsAddDisabled(true);
    }
  })));
};

storiesOf('RangeInput', module).add('Bounds', function () {
  return /*#__PURE__*/React.createElement(CustomRangeInput, null);
});