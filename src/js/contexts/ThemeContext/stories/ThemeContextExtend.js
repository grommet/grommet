import React, { useState } from 'react';
import { storiesOf } from '@storybook/react';

import { mnet } from 'mnet-ui-base/themes';
import { deepMerge } from 'mnet-ui-base/utils';
import { Box, Text, ThemeContext, MnetUIBase, Select } from 'mnet-ui-base';

const customTheme = deepMerge(mnet, {
  global: {
    focus: {
      border: {
        color: 'red',
      },
      shadow: {
        color: 'red',
      },
    },
  },
});

const GlobalThemeWithThemeContext = () => {
  const options = ['one', 'two', 'three'];
  const [valueRed, setValueRed] = useState('');
  const [valueBlue, setValueBlue] = useState('');

  return (
    <MnetUIBase theme={customTheme}>
      <Box align="center" pad="large" direction="column" gap="large">
        <Box>
          <Text margin="medium">
            The focus color of this select component is being altered by the
            custom theme that is passed into the MnetUIBase component.
          </Text>
          <Select
            alignSelf="center"
            placeholder="Select"
            value={valueRed}
            options={options}
            onChange={({ option }) => setValueRed(option)}
          />
        </Box>
        <Box>
          <ThemeContext.Extend
            value={{
              global: {
                focus: {
                  border: {
                    color: 'blue',
                  },
                },
              },
            }}
          >
            <Text margin="medium">
              The focus color of this select component is being altered by
              ThemeContext, independent from the custom theme
            </Text>
            <Select
              alignSelf="center"
              placeholder="Select"
              value={valueBlue}
              options={options}
              onChange={({ option }) => setValueBlue(option)}
            />
          </ThemeContext.Extend>
        </Box>
      </Box>
    </MnetUIBase>
  );
};

storiesOf('Theme', module).add('ThemeContext.Extend', () => (
  <GlobalThemeWithThemeContext />
));
