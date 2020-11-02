import React, { useState } from 'react';
import { Box, Grommet, Tab, Tabs, Text, ThemeContext } from 'grommet';
import { grommet } from 'grommet/themes';
var colors = {
  'background-contrast': '#0000000A',
  text: '#444444',
  'text-strong': '#000000',
  'text-weak': '#BBBBBB',
  border: '#999999',
  'border-strong': '#666666',
  'border-weak': '#BBBBBB',
  'active-background': 'background-contrast',
  'active-text': 'text'
};
var customTheme = {
  global: {
    colors: colors
  },
  tab: {
    border: {
      disabled: {
        color: 'border-weak'
      }
    },
    disabled: {
      color: 'text-weak'
    }
  }
};
var customThemeWithButtonDefault = {
  global: {
    colors: colors
  },
  button: {
    /* When theme.button.default is defined, Button relies on
     * <StyledButtonKind /> for implementation. It is being included
     * in this story to demonstrate and test Tab states which utilize
     * <StyledButtonKind /> in its implementation.
     */
    "default": {}
  },
  tab: {
    color: 'text-strong',
    active: {
      background: 'background-contrast'
    },
    border: {
      side: 'bottom',
      color: 'border',
      active: {
        color: 'border-strong'
      },
      disabled: {
        color: 'border-weak'
      },
      hover: {
        color: 'border'
      }
    },
    disabled: {
      color: 'text-weak'
    },
    hover: {
      background: 'background-contrast',
      color: 'text'
    },
    pad: 'small',
    margin: {
      horizontal: 'none'
    }
  }
};

var TabsExample = function TabsExample(_ref) {
  var label = _ref.label;

  var _useState = useState(0),
      index = _useState[0],
      setIndex = _useState[1];

  var onActive = function onActive(nextIndex) {
    return setIndex(nextIndex);
  };

  return /*#__PURE__*/React.createElement(Box, {
    border: true,
    gap: "medium",
    pad: "medium"
  }, /*#__PURE__*/React.createElement(Text, {
    weight: "bold"
  }, label), /*#__PURE__*/React.createElement(Tabs, {
    activeIndex: index,
    onActive: onActive
  }, /*#__PURE__*/React.createElement(Tab, {
    title: index === 0 ? 'Active' : 'Enabled'
  }, /*#__PURE__*/React.createElement(Box, {
    margin: "small"
  }, "The first tab is active.")), /*#__PURE__*/React.createElement(Tab, {
    title: index === 1 ? 'Active' : 'Enabled'
  }, /*#__PURE__*/React.createElement(Box, {
    margin: "small"
  }, "The second tab is active.")), /*#__PURE__*/React.createElement(Tab, {
    title: index === 2 ? 'Active' : 'Enabled'
  }, /*#__PURE__*/React.createElement(Box, {
    margin: "small"
  }, "The third tab is active.")), /*#__PURE__*/React.createElement(Tab, {
    title: "Disabled",
    disabled: true
  }, /*#__PURE__*/React.createElement(Box, {
    margin: "small"
  }, "This tab is disabled."))));
};

var TabStates = function TabStates() {
  return /*#__PURE__*/React.createElement(Grommet, {
    theme: grommet
  }, /*#__PURE__*/React.createElement(Box, {
    gap: "large",
    pad: "large",
    width: {
      max: 'large'
    }
  }, /*#__PURE__*/React.createElement(TabsExample, {
    label: "Grommet Default"
  }), /*#__PURE__*/React.createElement(ThemeContext.Extend, {
    value: customTheme
  }, /*#__PURE__*/React.createElement(TabsExample, {
    label: "Customized Disabled State"
  })), /*#__PURE__*/React.createElement(ThemeContext.Extend, {
    value: customThemeWithButtonDefault
  }, /*#__PURE__*/React.createElement(TabsExample, {
    label: "Customized Disabled State with 'theme.button.default' Defined"
  }))));
};

export var States = function States() {
  return /*#__PURE__*/React.createElement(TabStates, null);
};