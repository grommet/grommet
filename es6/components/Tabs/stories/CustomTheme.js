import React from 'react';
import { storiesOf } from '@storybook/react';
import { css } from 'styled-components';
import { CircleInformation } from "grommet-icons/es6/icons/CircleInformation";
import { Currency } from "grommet-icons/es6/icons/Currency";
import { Grommet, FormField, Tab, Tabs, TextInput } from 'grommet';
import { grommet } from 'grommet/themes';
import { deepMerge } from 'grommet/utils';
import { RichTabTitle } from './Rich';
var customTheme = deepMerge(grommet, {
  global: {
    edgeSize: {
      small: '10px'
    },
    elevation: {
      light: {
        small: '0px 1px 5px rgba(0, 0, 0, 0.50)',
        medium: '0px 3px 8px rgba(0, 0, 0, 0.50)'
      }
    }
  },
  tab: {
    active: {
      background: 'dark-1',
      color: 'accent-1'
    },
    background: 'dark-3',
    border: undefined,
    color: 'white',
    hover: {
      background: 'dark-1'
    },
    margin: undefined,
    pad: {
      bottom: undefined,
      horizontal: 'small'
    },
    extend: function extend(_ref) {
      var theme = _ref.theme;
      return css(["border-radius:", ";box-shadow:", ";"], theme.global.control.border.radius, theme.global.elevation.light.small);
    }
  },
  tabs: {
    background: 'dark-3',
    gap: 'medium',
    header: {
      background: 'dark-2',
      extend: function extend(_ref2) {
        var theme = _ref2.theme;
        return css(["padding:", ";box-shadow:", ";"], theme.global.edgeSize.small, theme.global.elevation.light.medium);
      }
    },
    panel: {
      extend: function extend(_ref3) {
        var theme = _ref3.theme;
        return css(["padding:", ";box-shadow:", ";"], theme.global.edgeSize.large, theme.global.elevation.light.medium);
      }
    }
  }
});

var CustomTabs = function CustomTabs() {
  return React.createElement(Grommet, {
    theme: customTheme
  }, React.createElement(Tabs, null, React.createElement(Tab, {
    title: React.createElement(RichTabTitle, {
      icon: React.createElement(CircleInformation, {
        color: "accent-1"
      }),
      label: "Personal Data"
    })
  }, React.createElement(FormField, {
    label: "Name"
  }, React.createElement(TextInput, {
    placeholder: "Enter your name..."
  }))), React.createElement(Tab, {
    title: React.createElement(RichTabTitle, {
      icon: React.createElement(Currency, {
        color: "light-3"
      }),
      label: "Payment"
    })
  }, React.createElement(FormField, {
    label: "Card Number"
  }, React.createElement(TextInput, {
    placeholder: "Enter your card number..."
  }))), React.createElement(Tab, {
    title: "Simple Tab"
  }, "This Tab has a different styling than the RichTabTitle (e.g tab.active.color)")));
};

storiesOf('Tabs', module).add('Custom Theme', function () {
  return React.createElement(CustomTabs, null);
});