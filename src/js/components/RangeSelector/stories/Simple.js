import React, { useState } from 'react';
import { Box } from 'grommet';
import { RangeSelector } from '../RangeSelector';

export const Simple = () => {
  const [range, setRange] = useState([10, 40]);

  return (
    // Uncomment <Grommet> lines when using outside of storybook
    // <Grommet theme={...}>
    <Box pad="xlarge">
      <RangeSelector
        min={0}
        max={100}
        values={range}
        onChange={(nextRange) => {
          setRange(nextRange);
        }}
      />
    </Box>
    // </Grommet>
  );
};

export default {
  title: 'Input/RangeSelector/Simple',
};
