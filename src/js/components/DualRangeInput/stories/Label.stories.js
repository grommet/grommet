import React, { useState } from 'react';

import { Box, DualRangeInput } from 'grommet';

export const WithLabel = () => {
  const [values, setValues] = useState([8, 144]);

  return (
    <Box align="center" pad="large" width="medium">
      <DualRangeInput
        min={0}
        max={256}
        step={8}
        values={values}
        onChange={(nextValues) => setValues(nextValues)}
        label
        messages={{ lower: 'Minimum Cores', upper: 'Maximum Cores' }}
      />
    </Box>
  );
};

export const WithLabelFunction = () => {
  const [values, setValues] = useState([20, 80]);

  return (
    <Box align="center" pad="large" width="medium">
      <DualRangeInput
        min={0}
        max={100}
        step={5}
        values={values}
        onChange={(nextValues) => setValues(nextValues)}
        label={(value) => `${value}%`}
      />
    </Box>
  );
};

export default {
  title: 'Input/DualRangeInput/Label',
};
