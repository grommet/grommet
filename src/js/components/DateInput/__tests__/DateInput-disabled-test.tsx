import React from 'react';
import { Grommet, Box } from 'grommet';
import { DateInput } from '../DateInput';

const TestComponent = () => {
  const [value, setValue] = React.useState();

  return (
    <Box pad="large" gap="medium">
      <h3>Enabled DateInput</h3>
      <DateInput
        format="mm/dd/yyyy"
        value={value}
        onChange={({ value: nextValue }) => setValue(nextValue)}
      />

      <h3>Disabled DateInput</h3>
      <DateInput
        format="mm/dd/yyyy"
        disabled
        value={value}
        onChange={({ value: nextValue }) => setValue(nextValue)}
      />
    </Box>
  );
};

export default TestComponent;
