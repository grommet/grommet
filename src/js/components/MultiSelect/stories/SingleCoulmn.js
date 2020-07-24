import React, { useState } from 'react';
import { storiesOf } from '@storybook/react';

import { Box, MultiSelect } from 'mnet-ui-base';

const options = [
  { id: 1, label: 'Test 1' },
  { id: 2, label: 'Test 2' },
  { id: 3, label: 'Test 3' },
  { id: 4, label: 'Test 4' },
  { id: 5, label: 'Test 5' },
];

const Example = () => {
  const [value, setValue] = useState([]);

  return (
    <Box fill align="center" justify="start" pad="large">
      <MultiSelect
        options={options}
        value={value}
        labelKey="label"
        valueKey={{ key: 'id', reduce: true }}
        onValueChange={nextValue => setValue(nextValue)}
        layout="single-column"
        width="medium"
        height="small"
        searchPlaceholder="Search"
        searchable
        withSelectAll
        withOptionChips
        withUpdateCancelButtons
      />
    </Box>
  )
}

storiesOf('MultiSelect', module).add('Single Column', () => <Example />);