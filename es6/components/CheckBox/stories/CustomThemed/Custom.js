function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
import React, { useState } from 'react';
import { Box, Grommet, CheckBox } from 'grommet';
import { grommet } from 'grommet/themes';
import { normalizeColor, deepMerge } from 'grommet/utils';
import { FormCheckmark } from "grommet-icons/es6/icons/FormCheckmark";
var customCheckBoxTheme = {
  checkBox: {
    border: {
      color: {
        light: 'accent-2'
      },
      // width: 'xsmall',
      radius: '2px'
    },
    check: {
      extend: function extend(_ref) {
        var theme = _ref.theme,
          checked = _ref.checked;
        return "\n        " + (checked && "background-color: " + normalizeColor('neutral-1', theme) + ";") + "\n        ";
      }
    },
    color: {
      light: 'neutral-3',
      dark: 'neutral-3'
    },
    gap: 'xsmall',
    hover: {
      border: {
        color: undefined
      }
    },
    icon: {
      size: '18px',
      extend: 'stroke: white;'
    },
    icons: {
      checked: FormCheckmark
    },
    size: '18px',
    extend: "\n      color: #6b6c6e;\n    "
  }
};
export var Custom = function Custom(props) {
  var _useState = useState(false),
    checked = _useState[0],
    setChecked = _useState[1];
  return /*#__PURE__*/React.createElement(Grommet, {
    theme: deepMerge(grommet, customCheckBoxTheme)
  }, /*#__PURE__*/React.createElement(Box, {
    align: "center",
    pad: "large"
  }, /*#__PURE__*/React.createElement(CheckBox, _extends({}, props, {
    label: "Choice",
    checked: checked,
    onChange: function onChange(event) {
      return setChecked(event.target.checked);
    }
  }))));
};
export default {
  title: 'Input/CheckBox/Custom Themed/Custom'
};