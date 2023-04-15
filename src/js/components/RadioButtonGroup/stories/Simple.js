import React, { useState } from 'react';

import { Box, RadioButtonGroup } from 'grommet';

export const Simple = ({ value: initialValue, ...props }) => {
  const [value, setValue] = useState(initialValue);

  return (
    <Box align="center" pad="large">
      <RadioButtonGroup
        name="radio"
        options={[
          { label: 'yes', value: 1 },
          { label: 'no', value: 0 },
        ]}
        defaultValue={1}
        value={value}
        onChange={(event) => setValue(event.value)}
        {...props}
      />
    </Box>
  );
};

export default {
  title: 'Input/RadioButtonGroup/Simple',
};
