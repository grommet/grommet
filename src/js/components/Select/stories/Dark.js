import React, { useState } from 'react';
import { storiesOf } from '@storybook/react';

import { Box, Select } from 'mnet-ui-base';

const DarkSelect = () => {
  const options = ['one', 'two'];
  const [value, setValue] = useState('');

  return (
    <div style={{ width: '100vw', height: '100vh', overflow: 'auto' }}>
      <Box fill background="dark-1" align="center" justify="center">
        <Select
          placeholder="Select"
          value={value}
          options={options}
          onChange={({ option }) => setValue(option)}
        />
      </Box>
    </div>
  );
};

storiesOf('Select', module).add('Dark', () => <DarkSelect />);
