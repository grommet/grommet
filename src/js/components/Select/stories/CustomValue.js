import React, { useState } from 'react';
import { storiesOf } from '@storybook/react';

import { CaretDown } from 'grommet-icons';

import { Box, Grommet, Select } from 'grommet';
import { grommet } from 'grommet/themes';

const CustomSelect = ({ ...rest }) => {
  const options = ['one', 'two'];
  const [value, setValue] = useState('');

  return (
    <Grommet full theme={grommet}>
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
    </Grommet>
  );
};

storiesOf('Select', module).add('Custom', () => <CustomSelect />);
