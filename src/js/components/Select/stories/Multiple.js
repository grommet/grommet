import React, { useState } from 'react';
import { storiesOf } from '@storybook/react';

import { Box, Grommet, Select } from 'grommet';
import { grommet } from 'grommet/themes';

const options = ['one', 'two'];

const Example = () => {
  const [value, setValue] = useState(['one']);

  return (
    <Grommet full theme={grommet}>
      <Box fill align="center" justify="start" pad="large">
        <Select
          placeholder="Select"
          multiple
          closeOnChange={false}
          value={value}
          options={options}
          onChange={({ value: nextValue }) => setValue(nextValue)}
        />
      </Box>
    </Grommet>
  );
};

storiesOf('Select', module).add('Multiple', () => <Example />);
