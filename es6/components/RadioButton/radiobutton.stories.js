function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

import React from 'react';
import { storiesOf } from '@storybook/react';
import { Box, Button, Grommet, RadioButton } from 'grommet';
import { grommet } from 'grommet/themes';
import { deepMerge } from 'grommet/utils';

var SimpleRadioButton = function SimpleRadioButton(_ref) {
  var selectedProp = _ref.selected,
      rest = _objectWithoutPropertiesLoose(_ref, ["selected"]);

  var _React$useState = React.useState(selectedProp),
      selected = _React$useState[0],
      setSelected = _React$useState[1];

  var onChange = function onChange(event) {
    return setSelected(event.target.value);
  };

  return React.createElement(Grommet, {
    theme: grommet
  }, React.createElement(Box, {
    align: "center",
    pad: "large",
    gap: "small"
  }, React.createElement(RadioButton, _extends({
    label: "Choice 1",
    name: "radio",
    value: "c1",
    checked: selected === 'c1',
    onChange: onChange
  }, rest)), React.createElement(RadioButton, _extends({
    label: "Choice 2",
    name: "radio",
    value: "c2",
    checked: selected === 'c2',
    onChange: onChange
  }, rest))));
};

var customTheme = deepMerge(grommet, {
  radioButton: {
    gap: 'xsmall',
    size: '18px',
    hover: {
      border: {
        color: 'dark-3'
      }
    },
    check: {
      color: {
        light: 'neutral-1'
      }
    },
    icon: {
      size: '10px'
    }
  }
});

var CustomRadioButton = function CustomRadioButton() {
  var _React$useState2 = React.useState(),
      selected = _React$useState2[0],
      setSelected = _React$useState2[1];

  var onChange = function onChange(event) {
    return setSelected(event.target.value);
  };

  return React.createElement(Grommet, {
    theme: customTheme
  }, React.createElement(Box, {
    align: "center",
    pad: "large",
    gap: "small"
  }, React.createElement(RadioButton, {
    label: "Choice 1",
    name: "radio",
    value: "c1",
    checked: selected === 'c1',
    onChange: onChange
  }), React.createElement(RadioButton, {
    label: "Choice 2",
    name: "radio",
    value: "c2",
    checked: selected === 'c2',
    onChange: onChange
  })));
};

var CheckBoxInsideButton = function CheckBoxInsideButton() {
  var _React$useState3 = React.useState(),
      selected = _React$useState3[0],
      setSelected = _React$useState3[1];

  return React.createElement(Grommet, {
    theme: grommet
  }, React.createElement(Box, {
    align: "center",
    pad: "large"
  }, React.createElement(Button, {
    hoverIndicator: "background",
    onClick: function onClick() {
      if (selected) {
        setSelected(undefined);
      } else {
        setSelected('c1');
      }
    }
  }, React.createElement(RadioButton, {
    label: "Choice 1",
    name: "radio",
    value: "c1",
    checked: selected === 'c1'
  }))));
};

storiesOf('RadioButton', module).add('Simple', function () {
  return React.createElement(SimpleRadioButton, null);
}).add('Disabled', function () {
  return React.createElement(SimpleRadioButton, {
    disabled: true,
    selected: "c2"
  });
}).add('Custom Theme', function () {
  return React.createElement(CustomRadioButton, null);
}).add('Inside a Button Theme', function () {
  return React.createElement(CheckBoxInsideButton, null);
});