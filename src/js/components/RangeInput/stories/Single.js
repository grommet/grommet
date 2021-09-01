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
    thumb: {
      color: '#6495ED',
    },
  },
};

export const Single = () => {
  const [value, setValue] = React.useState(0.4);
  const onChange = (event) => setValue(event.target.value);
  return (
    <Grommet theme={rangeInputTheme}>
      <Box direction="row" align="center" pad="large" gap="small" width="large">
        <RangeInput
          min={0}
          max={1}
          step={0.1}
          value={value}
          color="#6495ED"
          onChange={onChange}
        />
      </Box>
    </Grommet>
  );
};

Single.storyName = 'Single';

export default {
  title: 'Input/RangeInput/Track Color/Single',
};
