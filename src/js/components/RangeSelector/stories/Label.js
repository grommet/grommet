import React, { useState } from 'react';
import { Box, FormField } from 'grommet';
import { RangeSelector } from '../RangeSelector';

export const Label = () => {
  const [range, setRange] = useState([0, 100]);
  const [range2, setRange2] = useState([0, 100]);

  return (
    // Uncomment <Grommet> lines when using outside of storybook
    // <Grommet theme={...}>
    <Box pad="xlarge" align="center">
      <Box width="medium">
        <FormField name="range" htmlFor="range" label="Range">
          <RangeSelector
            id="range"
            min={0}
            max={100}
            label
            values={range}
            onChange={(nextRange) => {
              setRange(nextRange);
            }}
          />
        </FormField>
        <FormField name="range2" htmlFor="range2" label="Range units">
          <RangeSelector
            id="range2"
            min={0}
            max={100}
            label={(value) => `${value}%`}
            values={range2}
            onChange={(nextRange) => {
              setRange2(nextRange);
            }}
          />
        </FormField>
      </Box>
    </Box>
    // </Grommet>
  );
};

export default {
  title: 'Input/RangeSelector/Label',
};
