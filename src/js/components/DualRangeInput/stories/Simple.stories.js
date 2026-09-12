import React, { useState } from 'react';

import { Box, DualRangeInput } from 'grommet';

export const Simple = () => {
  const [values, setValues] = useState([25, 75]);

  return (
    <Box align="center" pad="large">
      <DualRangeInput
        a11yTitle="Select range"
        min={0}
        max={100}
        step={1}
        values={values}
        onChange={(nextValues) => setValues(nextValues)}
      />
    </Box>
  );
};

export default {
  title: 'Input/DualRangeInput/Simple',
};
