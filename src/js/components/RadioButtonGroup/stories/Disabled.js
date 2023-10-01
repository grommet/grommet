import React, { useState } from 'react';

import { Box, Grommet, RadioButtonGroup } from 'grommet';

export const Disabled = ({ value: initialValue, ...props }) => {
  const [value, setValue] = useState(initialValue);

  return (
    <Grommet
      theme={{ global: { control: { disabled: { cursor: 'not-allowed' } } } }}
    >
      <Box align="center" pad="large">
        <RadioButtonGroup
          name="radio"
          options={[
            { label: 'Choice 1', value: 'c1' },
            { label: 'Choice 2', value: 'c2' },
            { label: 'Choice 3', value: 'c3' },
          ]}
          disabled
          value={value}
          onChange={(event) => setValue(event.target.value)}
          {...props}
        />
      </Box>

      <Box align="center" pad="large">
        <RadioButtonGroup
          name="radio"
          options={[
            { label: 'Choice 1', value: 'c1', disabled: true },
            { label: 'Choice 2', value: 'c2' },
            { label: 'Choice 3', value: 'c3', disabled: true },
          ]}
          value={value}
          onChange={(event) => setValue(event.target.value)}
          {...props}
        />
      </Box>
    </Grommet>
  );
};

export default {
  title: 'Input/RadioButtonGroup/Disabled',
};
