import React, { useState } from 'react';

import { Box, FormField, Grommet, Select } from 'grommet';
import { grommet } from 'grommet/themes';

const allOptions = Array(100)
  .fill()
  .map((_, i) => `option ${i + 1}`);

export const Simple = () => {
  const [value, setValue] = useState('');

  return (
    <Grommet theme={grommet}>
      <Box align="center" pad="large">
        <FormField label="Label" htmlFor="select">
          <Select
            id="select"
            placeholder="placeholder"
            options={allOptions}
            value={value}
            onChange={({ option }) => setValue(option)}
          />
        </FormField>
      </Box>
    </Grommet>
  );
};

export default {
  title: 'Input/FormField/Simple',
};
