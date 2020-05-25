import React, { useState } from 'react';
import { storiesOf } from '@storybook/react';

import { CaretDown } from 'grommet-icons';

import { Box, Select } from 'mnet-ui-base';

const CustomSelect = ({ ...rest }) => {
  const options = ['one', 'two'];
  const [value, setValue] = useState('');

  return (
    <div style={{ width: '100vw', height: '100vh', overflow: 'auto' }}>
      <Box fill align="center" justify="start" pad="large">
        <Select
          id="select"
          name="select"
          placeholder="Select"
          value={value}
          options={options}
          onChange={({ option }) => setValue(option)}
          plain
          valueLabel={
            <Box
              background="brand"
              width="small"
              round="small"
              overflow="hidden"
              align="center"
            >
              {value || 'Select...'}
            </Box>
          }
          icon={
            <Box>
              <CaretDown color="black" />
            </Box>
          }
          {...rest}
        />
      </Box>
    </div>
  );
};

storiesOf('Select', module).add('Custom', () => <CustomSelect />);
