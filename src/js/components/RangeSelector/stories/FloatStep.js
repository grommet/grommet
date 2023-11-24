import React, { useState } from 'react';
import { Box } from 'grommet';
import { RangeSelector } from '../RangeSelector';

export const FloatStep = () => {
  const [range, setRange] = useState([0, 3]);

  return (
    <Box pad="xlarge">
      <RangeSelector
        min={0}
        step={0.15}
        max={3}
        label
        values={range}
        onChange={(nextRange) => {
          setRange(nextRange);
        }}
      />
    </Box>
  );
};

export default {
  title: 'Input/RangeSelector/FloatStep',
};
