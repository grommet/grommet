import React, { useState } from 'react';

import { Box, DualRangeInput, Heading } from 'grommet';

export const Themed = () => {
  const [values, setValues] = useState([20, 80]);

  return (
    <Box align="center" pad="large" width="medium">
      <Heading level={3}>Cores</Heading>
      <DualRangeInput
        min={0}
        max={100}
        step={1}
        values={values}
        onChange={(nextValues) => setValues(nextValues)}
        color="brand"
        label
      />
    </Box>
  );
};

export default {
  title: 'Input/DualRangeInput/Themed',
};
