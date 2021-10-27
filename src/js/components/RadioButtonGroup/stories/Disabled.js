import React, { useState } from 'react';

import { Box, RadioButtonGroup } from 'grommet';

export const Disabled = ({ value: initialValue, ...props }) => {
  const [value, setValue] = useState(initialValue);

  return (
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
  );
};

export default {
  title: 'Input/RadioButtonGroup/Disabled',
};
