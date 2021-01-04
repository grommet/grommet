import React, { useState } from 'react';

import { FormDown, FormUp } from 'grommet-icons';
import { Box, Grommet, Select } from 'grommet';
import { grommet } from 'grommet/themes';
import { deepMerge } from 'grommet/utils';

const customRoundedTheme = deepMerge(grommet, {
  global: {
    colors: {
      selected: 'neutral-3',
    },
    control: {
      border: {
        radius: '24px',
      },
    },
    input: {
      weight: 400,
    },
    font: {
      size: '12px',
    },
  },
  text: {
    medium: '13px',
  },
  textInput: {
    extend: 'padding: 0 12px;',
  },
  select: {
    control: {
      extend: 'padding: 3px 6px;',
      open: {
        background: '#ece0fa',
        border: '1px solid #7D4CDB',
      },
    },
    icons: {
      down: FormDown,
      up: FormUp,
      color: 'dark-1',
      margin: 'small',
    },
  },
});

export const Themed = () => {
  const options = ['one', 'two'];
  const [value, setValue] = useState('');
  return (
    <Grommet full theme={customRoundedTheme}>
      <Box fill align="center" justify="start" pad="large">
        <Select
          id="select"
          name="select"
          placeholder="Select"
          value={value}
          options={options}
          onChange={({ option }) => setValue(option)}
          open
        />
      </Box>
    </Grommet>
  );
};
