var _excluded = ["value"];
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function _objectWithoutPropertiesLoose(r, e) { if (null == r) return {}; var t = {}; for (var n in r) if ({}.hasOwnProperty.call(r, n)) { if (-1 !== e.indexOf(n)) continue; t[n] = r[n]; } return t; }
import React, { useState } from 'react';
import { Box, Grommet, RadioButtonGroup, ThemeContext } from 'grommet';
import { grommet } from 'grommet/themes';
import { deepMerge } from 'grommet/utils';
import { css } from 'styled-components';
var customTheme = deepMerge(grommet, {
  radioButtonGroup: {
    container: {
      gap: 'medium'
    }
  },
  radioButton: {
    border: {
      color: 'dark-5',
      width: '5px'
    },
    container: {
      extend: css(["color:black;"])
    },
    hover: {
      border: {
        color: 'dark-2'
      }
    },
    size: '30px',
    // affects the size of the outer circle
    icon: {
      size: '15px' // affects the size of the inner circle
    },
    check: {
      radius: '20%'
    }
  }
});
export var CustomRadioButtonGroup = function CustomRadioButtonGroup(_ref) {
  var initialValue = _ref.value,
    props = _objectWithoutPropertiesLoose(_ref, _excluded);
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
  title: 'Input/RadioButtonGroup/Custom Themed/Custom theme'
};