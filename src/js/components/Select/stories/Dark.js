import React, { useState } from 'react';
import { storiesOf } from '@storybook/react';

import { Box, MnetUIBase, Select } from 'mnet-ui-base';
import { mnet } from 'mnet-ui-base/themes';

const DarkSelect = () => {
  const options = ['one', 'two'];
  const [value, setValue] = useState('');

  return (
    <MnetUIBase full theme={mnet}>
      <Box fill background="dark-1" align="center" justify="center">
        <Select
          placeholder="Select"
          value={value}
          options={options}
          onChange={({ option }) => setValue(option)}
        />
      </Box>
    </MnetUIBase>
  );
};

storiesOf('Select', module).add('Dark', () => <DarkSelect />);
