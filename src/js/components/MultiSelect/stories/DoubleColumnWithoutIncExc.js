import React, { useState } from 'react';
import { storiesOf } from '@storybook/react';

import { Box, MultiSelect } from 'mnet-ui-base';

const options = [
  { id: 1, label: 'Test 1' },
  { id: 2, label: 'Test 2' },
  { id: 3, label: 'Test 3' },
  { id: 4, label: 'Test 4' },
  { id: 5, label: 'Test 5' },
  { id: 6, label: 'Test 6' },
  { id: 7, label: 'Test 7' },
  { id: 8, label: 'Test 8' },
  { id: 9, label: 'Test 9' },
  { id: 10, label: 'Test 10' },
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
        layout="double-column"
        width="medium"
        height="medium"
        searchPlaceholder="Search"
        searchable
        withOptionChips
        renderEmptySelected={<span>Empty</span>}
      />
    </Box>
  );
};

storiesOf(
  'MultiSelect',
  module,
).add('Double Column without Inclusion / Exclusion', () => <Example />);
