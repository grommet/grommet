var _excluded = ["animate", "multiple"];
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function _objectWithoutPropertiesLoose(r, e) { if (null == r) return {}; var t = {}; for (var n in r) if ({}.hasOwnProperty.call(r, n)) { if (-1 !== e.indexOf(n)) continue; t[n] = r[n]; } return t; }
import React from 'react';
import { SubtractCircle } from "grommet-icons/es6/icons/SubtractCircle";
import { AddCircle } from "grommet-icons/es6/icons/AddCircle";
import { Accordion, AccordionPanel, Box, Grommet, Text } from 'grommet';
var customAccordionTheme = {
  global: {
    font: {
      family: "-apple-system,\n       BlinkMacSystemFont,\n       \"Segoe UI\",\n       Roboto"
    }
  },
  accordion: {
    heading: {
      level: 3,
      margin: {
        vertical: '6px',
        horizontal: '24px'
      }
    },
    hover: {
      heading: {
        color: 'accent-2'
      },
      background: 'background-contrast'
    },
    icons: {
      collapse: SubtractCircle,
      expand: AddCircle,
      color: 'hotpink'
    },
    border: undefined
  }
};
var CustomAccordion = function CustomAccordion(_ref) {
  var animate = _ref.animate,
    multiple = _ref.multiple,
    rest = _objectWithoutPropertiesLoose(_ref, _excluded);
  return /*#__PURE__*/React.createElement(Grommet, {
    theme: customAccordionTheme
  }, /*#__PURE__*/React.createElement(Box, _extends({}, rest, {
    pad: "large",
    align: "center",
    justify: "center"
  }), /*#__PURE__*/React.createElement(Accordion, {
    animate: animate,
    multiple: true
  }, /*#__PURE__*/React.createElement(AccordionPanel, {
    label: /*#__PURE__*/React.createElement(Text, {
      size: "large"
    }, "Panel 1 - uses large Text size")
  }, /*#__PURE__*/React.createElement(Box, {
    background: "light-2",
    height: "small"
  }, "Important Info")), /*#__PURE__*/React.createElement(AccordionPanel, {
    label: /*#__PURE__*/React.createElement(Text, {
      size: "xlarge",
      margin: "vertical"
    }, "Panel 2 - uses xlarge Text size")
  }, /*#__PURE__*/React.createElement(Box, {
    background: "light-2",
    height: "xsmall"
  }, /*#__PURE__*/React.createElement(Text, {
    size: "small"
  }, "Important Info"))), /*#__PURE__*/React.createElement(AccordionPanel, {
    label: "Panel 3 - uses custom theme heading level for sizing"
  }, /*#__PURE__*/React.createElement(Box, {
    background: "light-2",
    height: "xsmall"
  }, /*#__PURE__*/React.createElement(Text, {
    size: "small"
  }, "Important Info"))))));
};
export var Custom = function Custom() {
  return /*#__PURE__*/React.createElement(CustomAccordion, null);
};
export default {
  title: 'Controls/Accordion/Custom Themed/Custom'
};