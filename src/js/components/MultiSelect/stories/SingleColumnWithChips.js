import React, { useState } from 'react';
import { storiesOf } from '@storybook/react';

import { Box, MultiSelect } from 'mnet-ui-base';

const options = ['Test 1', 'Test 2', 'Test 3', 'Test 4', 'Test 5'];

const Example = () => {
  const [value, setValue] = useState([]);

  return (
    <Box fill align="center" justify="start" pad="large">
      <MultiSelect
        options={options}
        value={value}
        onValueChange={(nextValue) => setValue(nextValue)}
        layout="single-column"
        width="medium"
        withOptionChips
      />
    </Box>
  )
}

storiesOf('MultiSelect', module)
  .add('Single Column with Option Chips', () => <Example />);
