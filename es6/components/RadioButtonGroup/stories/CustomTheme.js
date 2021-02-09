function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

import React, { useState } from 'react';
import { Box, Grommet, RadioButtonGroup, ThemeContext } from 'grommet';
import { grommet } from 'grommet/themes';
import { deepMerge } from 'grommet/utils';
import { css } from 'styled-components';
var customTheme = deepMerge(grommet, {
  radioButtonGroup: {
    container: {
      gap: 'xlarge'
    }
  },
  radioButton: {
    border: {
      color: 'red',
      width: '10px'
    },
    container: {
      extend: css(["color:red;"])
    },
    hover: {
      border: {
        color: 'blue'
      },
      background: {
        color: 'accent-4'
      }
    },
    size: '100px',
    // affects the size of the outer circle
    icon: {
      size: '20px' // affects the size of the inner circle

    },
    check: {
      radius: '20%'
    }
  }
});
export var CustomRadioButtonGroup = function CustomRadioButtonGroup(_ref) {
  var initialValue = _ref.value,
      props = _objectWithoutPropertiesLoose(_ref, ["value"]);

  var _useState = useState(initialValue),
      value = _useState[0],
      setValue = _useState[1];

  return /*#__PURE__*/React.createElement(Grommet, {
    theme: customTheme
  }, /*#__PURE__*/React.createElement(ThemeContext.Consumer, null, function (theme) {
    return console.log(JSON.stringify(theme.radioButton));
  }), /*#__PURE__*/React.createElement(Box, {
    align: "center",
    pad: "large"
  }, /*#__PURE__*/React.createElement(RadioButtonGroup, _extends({
    name: "radio",
    options: [{
      label: 'Choice 1',
      value: 'c1'
    }, {
      label: 'Choice 2',
      value: 'c2'
    }, {
      label: 'Choice 3',
      value: 'c3'
    }],
    value: value,
    onChange: function onChange(event) {
      return setValue(event.target.value);
    }
  }, props))));
};
CustomRadioButtonGroup.storyName = 'Custom theme';
export default {
  title: 'Input/RadioButtonGroup/Custom theme'
};