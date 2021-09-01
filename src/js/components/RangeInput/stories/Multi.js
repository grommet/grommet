import React from 'react';

import { Box, Grommet, RangeInput } from 'grommet';

const rangeInputTheme = {
  rangeInput: {
    track: {
      height: '12px',
      extend: () => `border-radius: 10px`,
      upper: {
        color: 'dark-4',
        opacity: 0.3,
      },
    },
  },
};

export const Multi = () => {
  const [value, setValue] = React.useState(8);
  const onChange = (event) => setValue(event.target.value);
  return (
    <Grommet theme={rangeInputTheme}>
      <Box direction="row" align="center" pad="large" gap="small" width="large">
        <RangeInput
          min={0}
          max={10}
          step={1}
          value={value}
          onChange={onChange}
          color={[
            { value: 3, color: '#FF0000', opacity: 0.5 },
            { value: 7, color: { light: 'accent-3', dark: 'brand' } },
            { value: 10, color: '#00FF00' },
          ]}
        />
      </Box>
    </Grommet>
  );
};

Multi.storyName = 'Multi';

export default {
  title: 'Input/RangeInput/Track Color/Multi',
};
