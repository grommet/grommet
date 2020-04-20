import React from 'react';
import { css } from 'styled-components';
import { storiesOf } from '@storybook/react';
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
      return css(["border-top-left-radius:", ";border-top-right-radius:", ";font-weight:bold;"], theme.global.control.border.radius, theme.global.control.border.radius);
    }
  }
});

var Icon = function Icon() {
  return React.createElement(Grommet, {
    theme: customTheme,
    full: true
  }, React.createElement(Box, {
    pad: "medium",
    fill: true
  }, React.createElement(Tabs, {
    flex: true
  }, React.createElement(Tab, {
    title: "Tab 1",
    icon: React.createElement(Attraction, null)
  }, React.createElement(Box, {
    fill: true,
    pad: "large",
    align: "center",
    background: "accent-1"
  }, React.createElement(Attraction, {
    size: "xlarge"
  }))), React.createElement(Tab, {
    title: "Tab 2",
    icon: React.createElement(TreeOption, null)
  }, React.createElement(Box, {
    fill: true,
    pad: "large",
    align: "center",
    background: "accent-2"
  }, React.createElement(TreeOption, {
    size: "xlarge"
  }))), React.createElement(Tab, {
    title: "Tab 3",
    icon: React.createElement(Car, null)
  }, React.createElement(Box, {
    fill: true,
    pad: "large",
    align: "center",
    background: "accent-3"
  }, React.createElement(Car, {
    size: "xlarge"
  }))))));
};

storiesOf('Tabs', module).add('Icon', function () {
  return React.createElement(Icon, null);
});