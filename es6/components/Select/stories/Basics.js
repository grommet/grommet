function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { storiesOf } from '@storybook/react';
import { Box, Grommet, Select } from 'grommet';
import { grommet } from 'grommet/themes';
import { deepMerge } from 'grommet/utils';
var colors = {
  selected: 'neutral-3'
};
var customRoundedTheme = deepMerge(grommet, {
  global: {
    colors: colors,
    control: {
      border: {
        radius: '24px'
      }
    },
    input: {
      weight: 400
    },
    font: {
      size: '12px'
    }
  },
  text: {
    medium: '13px'
  },
  textInput: {
    extend: 'padding: 0 12px;'
  },
  select: {
    control: {
      extend: 'padding: 3px 6px;',
      open: {
        background: '#ece0fa',
        border: '1px solid #7D4CDB'
      }
    }
  }
});

var SimpleSelect = function SimpleSelect(_ref) {
  var theme = _ref.theme,
      rest = _objectWithoutPropertiesLoose(_ref, ["theme"]);

  var options = ['one', 'two'];

  var _useState = useState(''),
      value = _useState[0],
      setValue = _useState[1];

  return React.createElement(Grommet, {
    full: true,
    theme: theme || grommet
  }, React.createElement(Box, {
    fill: true,
    align: "center",
    justify: "start",
    pad: "large"
  }, React.createElement(Select, _extends({
    id: "select",
    name: "select",
    placeholder: "Select",
    value: value,
    options: options,
    onChange: function onChange(_ref2) {
      var option = _ref2.option;
      return setValue(option);
    }
  }, rest))));
};

SimpleSelect.propTypes = {
  theme: PropTypes.shape({})
};
SimpleSelect.defaultProps = {
  theme: undefined
};
var defaultOptions = [];
var objectOptions = [];

for (var i = 1; i <= 200; i += 1) {
  defaultOptions.push("option " + i);
  objectOptions.push({
    lab: "option " + i,
    val: i,
    dis: i % 5 === 0,
    sel: i % 13 === 0
  });
}

storiesOf('Select', module).add('Simple', function () {
  return React.createElement(SimpleSelect, null);
}).add('Custom Theme', function () {
  return React.createElement(SimpleSelect, {
    open: true,
    theme: customRoundedTheme
  });
});