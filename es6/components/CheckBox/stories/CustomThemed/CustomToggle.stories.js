function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
import React, { useState } from 'react';
import { css } from 'styled-components';
import { Box, Grommet, CheckBox } from 'grommet';
import { grommet } from 'grommet/themes';
import { deepMerge } from 'grommet/utils';
var checkboxCheckStyle = css(["background-color:#2196f3;border-color:#2196f3;"]);
var customToggleTheme = {
  global: {
    colors: {
      'toggle-bg': '#757575',
      'toggle-knob': 'white',
      'toggle-accent': 'accent-2'
    }
  },
  checkBox: {
    border: {
      color: {
        light: 'toggle-bg'
      }
    },
    color: {
      light: 'toggle-knob'
    },
    check: {
      radius: '2px'
    },
    hover: {
      border: {
        color: undefined
      }
    },
    toggle: {
      background: {
        light: 'toggle-accent'
      },
      color: {
        light: 'toggle-knob'
      },
      size: '36px',
      knob: {
        extend: "\n          top: -4px;\n          box-shadow: 0px 0px 2px 0px rgba(0,0,0,0.12),\n           0px 2px 2px 0px rgba(0,0,0,0.24);\n        "
      },
      extend: function extend(_ref) {
        var checked = _ref.checked;
        return "\n        height: 14px;\n        " + (checked && checkboxCheckStyle) + "\n      ";
      }
    },
    gap: 'xsmall',
    size: '18px'
  }
};
export var CustomToggle = function CustomToggle(props) {
  var _useState = useState(false),
    checked = _useState[0],
    setChecked = _useState[1];
  return /*#__PURE__*/React.createElement(Grommet, {
    theme: deepMerge(grommet, customToggleTheme)
  }, /*#__PURE__*/React.createElement(Box, {
    align: "center",
    pad: "large"
  }, /*#__PURE__*/React.createElement(CheckBox, _extends({}, props, {
    label: "Choice",
    checked: checked,
    onChange: function onChange(event) {
      return setChecked(event.target.checked);
    },
    toggle: true
  }))));
};
CustomToggle.storyName = 'Custom toggle';
export default {
  title: 'Input/CheckBox/Custom Themed/Custom toggle'
};