import React, { useState } from 'react';

import { Box, Grommet, Tab, Tabs, Text, ThemeContext } from 'grommet';
import { grommet } from 'grommet/themes';

const colors = {
  'background-contrast': '#0000000A',
  text: '#444444',
  'text-strong': '#000000',
  'text-weak': '#BBBBBB',
  border: '#999999',
  'border-strong': '#666666',
  'border-weak': '#BBBBBB',
  'active-background': 'background-contrast',
  'active-text': 'text',
};

const customTheme = {
  global: {
    colors,
  },
  tab: {
    border: {
      disabled: {
        color: 'border-weak',
      },
    },
    disabled: {
      color: 'text-weak',
    },
  },
};

const customThemeWithButtonDefault = {
  global: {
    colors,
  },
  button: {
    /* When theme.button.default is defined, Button relies on
     * <StyledButtonKind /> for implementation. It is being included
     * in this story to demonstrate and test Tab states which utilize
     * <StyledButtonKind /> in its implementation.
     */
    default: {},
  },
  tab: {
    color: 'text-strong',
    active: {
      background: 'background-contrast',
    },
    border: {
      side: 'bottom',
      color: 'border',
      active: {
        color: 'border-strong',
      },
      disabled: {
        color: 'border-weak',
      },
      hover: {
        color: 'border',
      },
    },
    disabled: {
      color: 'text-weak',
    },
    hover: {
      background: 'background-contrast',
      color: 'text',
    },
    pad: 'small',
    margin: {
      horizontal: 'none',
    },
  },
};

const TabsExample = ({ label }) => {
  const [index, setIndex] = useState(0);
  const onActive = (nextIndex) => setIndex(nextIndex);
  return (
    <Box border gap="medium" pad="medium">
      <Text weight="bold">{label}</Text>
      <Tabs activeIndex={index} onActive={onActive}>
        <Tab title={index === 0 ? 'Active' : 'Enabled'}>
          <Box margin="small">The first tab is active.</Box>
        </Tab>
        <Tab title={index === 1 ? 'Active' : 'Enabled'}>
          <Box margin="small">The second tab is active.</Box>
        </Tab>
        <Tab title={index === 2 ? 'Active' : 'Enabled'}>
          <Box margin="small">The third tab is active.</Box>
        </Tab>
        <Tab title="Disabled" disabled>
          <Box margin="small">This tab is disabled.</Box>
        </Tab>
      </Tabs>
    </Box>
  );
};

const TabStates = () => (
  <Grommet theme={grommet}>
    <Box gap="large" pad="large" width={{ max: 'large' }}>
      <TabsExample label="Grommet Default" />
      <ThemeContext.Extend value={customTheme}>
        <TabsExample label="Customized Disabled State" />
      </ThemeContext.Extend>
      <ThemeContext.Extend value={customThemeWithButtonDefault}>
        <TabsExample
          label="Customized Disabled State with
            'theme.button.default' Defined"
        />
      </ThemeContext.Extend>
    </Box>
  </Grommet>
);

export const States = () => <TabStates />;

export default {
  title: 'Controls/Tabs/Custom Themed/States',
};
