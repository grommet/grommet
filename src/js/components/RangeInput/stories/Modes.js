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

export const Modes = () => {
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
          color={{
            light: 'accent-3',
            dark: 'brand',
          }}
          onChange={onChange}
        />
      </Box>
    </Grommet>
  );
};

Modes.storyName = 'Modes';

export default {
  title: 'Input/RangeInput/Track Color/Modes',
};
