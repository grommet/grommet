import React from 'react';
import { css } from 'styled-components';
import { Attraction } from "grommet-icons/es6/icons/Attraction";
import { Car } from "grommet-icons/es6/icons/Car";
import { TreeOption } from "grommet-icons/es6/icons/TreeOption";
import { Box, Grommet, Tab, Tabs } from 'grommet';
import { grommet } from 'grommet/themes';
import { deepMerge } from 'grommet/utils';
var customTheme = deepMerge(grommet, {
  tab: {
    color: 'text',
    active: {
      background: 'background-back'
    },
    hover: {
      background: 'background-back',
      color: 'control'
    },
    border: {
      side: 'bottom',
      color: 'background-back',
      active: {
        color: 'border'
      },
      hover: {
        color: 'control'
      }
    },
    pad: 'small',
    margin: 'none',
    extend: function extend(_ref) {
      var theme = _ref.theme;
      return css(["border-top-left-radius:'4px';border-top-right-radius:'4px';font-weight:bold;"]);
    }
  }
});

var IconTabs = function IconTabs() {
  return /*#__PURE__*/React.createElement(Grommet, {
    theme: customTheme,
    full: true
  }, /*#__PURE__*/React.createElement(Box, {
    pad: "medium",
    fill: true
  }, /*#__PURE__*/React.createElement(Tabs, {
    flex: true
  }, /*#__PURE__*/React.createElement(Tab, {
    title: "Tab 1",
    icon: /*#__PURE__*/React.createElement(Attraction, null)
  }, /*#__PURE__*/React.createElement(Box, {
    fill: true,
    pad: "large",
    align: "center",
    background: "accent-1"
  }, /*#__PURE__*/React.createElement(Attraction, {
    size: "xlarge"
  }))), /*#__PURE__*/React.createElement(Tab, {
    title: "Tab 2",
    icon: /*#__PURE__*/React.createElement(TreeOption, null)
  }, /*#__PURE__*/React.createElement(Box, {
    fill: true,
    pad: "large",
    align: "center",
    background: "accent-2"
  }, /*#__PURE__*/React.createElement(TreeOption, {
    size: "xlarge"
  }))), /*#__PURE__*/React.createElement(Tab, {
    title: "Tab 3",
    icon: /*#__PURE__*/React.createElement(Car, null)
  }, /*#__PURE__*/React.createElement(Box, {
    fill: true,
    pad: "large",
    align: "center",
    background: "accent-3"
  }, /*#__PURE__*/React.createElement(Car, {
    size: "xlarge"
  }))))));
};

export var Icon = function Icon() {
  return /*#__PURE__*/React.createElement(IconTabs, null);
};