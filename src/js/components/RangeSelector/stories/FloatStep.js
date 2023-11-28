import React, { useState } from 'react';
import { Box } from 'grommet';
import { RangeSelector } from '../RangeSelector';

const SimpleRangeSelector = ({ step }) => {
  const [range, setRange] = useState([0, 3]);

  return (
    <Box pad="xlarge">
      <RangeSelector
        min={0}
        step={step}
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

export const FloatStep = () => [0.15, 0.156].map((step) => (
  <SimpleRangeSelector step={step} />
));

export default {
  title: 'Input/RangeSelector/FloatStep',
};
