import React, { useState } from 'react';
import { storiesOf } from '@storybook/react';

import { Box, MnetUIBase, Select } from 'mnet-ui-base';
import { mnet } from 'mnet-ui-base/themes';
import { deepMerge } from 'mnet-ui-base/utils';
import { FormDown, FormUp } from 'grommet-icons';

const customRoundedTheme = deepMerge(mnet, {
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

const SimpleSelect = ({ ...rest }) => {
  const options = ['one', 'two'];
  const [value, setValue] = useState('');
  return (
    <MnetUIBase full theme={customRoundedTheme}>
      <Box fill align="center" justify="start" pad="large">
        <Select
          id="select"
          name="select"
          placeholder="Select"
          value={value}
          options={options}
          onChange={({ option }) => setValue(option)}
          {...rest}
        />
      </Box>
    </MnetUIBase>
  );
};

const defaultOptions = [];
const objectOptions = [];
for (let i = 1; i <= 200; i += 1) {
  defaultOptions.push(`option ${i}`);
  objectOptions.push({
    lab: `option ${i}`,
    val: i,
    dis: i % 5 === 0,
    sel: i % 13 === 0,
  });
}

storiesOf('Select', module)
  // Chromatic does not catch open Drop.
  // Screenshot taken before the Drop is open.
  .add('Custom Theme', () => <SimpleSelect open />);
