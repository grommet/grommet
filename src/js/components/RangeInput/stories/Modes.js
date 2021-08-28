import React from 'react';

import { Box, Grommet, RangeInput } from 'grommet';

import { Volume } from 'grommet-icons';

// Type annotations can only be used in TypeScript files.
// Remove ': ThemeType' if you are not using Typescript.
const customThemeRangeInput = {
  global: {
    spacing: '12px',
  },
  rangeInput: {
    track: {
      color: 'accent-2',
      height: '12px',
      extend: () => `border-radius: 10px`,
      upper: {
        color: 'dark-4',
        opacity: 0.3,
      },
    },
    thumb: {
      color: 'neutral-2',
    },
  },
};

export const Modes = () => {
  const [value, setValue] = React.useState(0.4);

  const onChange = (event) => setValue(event.target.value);

  return (
    <Grommet theme={customThemeRangeInput}>
      <Box direction="row" align="center" pad="large" gap="small">
        <Volume color="neutral-2" />
        <Box align="center" width="small">
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
      </Box>
    </Grommet>
  );
};

Modes.storyName = 'Modes';

export default {
  title: 'Input/RangeInput/Track Color/Modes',
};
