import React from 'react';

import { Box, Grommet, RangeInput } from 'grommet';
import { grommet } from 'grommet/themes';

const customThemeRangeInput = {
  rangeInput: {
    disabled: {
      track: {
        color: '#2196f3',
      },
      thumb: {
        color: 'red',
      },
    },
  },
};

export const Disabled = () => (
  <>
    <Grommet theme={customThemeRangeInput}>
      <Box align="center" pad="large">
        <RangeInput disabled value={5} a11yTitle="Select range value" />
      </Box>
    </Grommet>
    <Grommet theme={grommet}>
      <Box align="center" pad="large">
        <RangeInput disabled value={5} a11yTitle="Select range value" />
      </Box>
    </Grommet>
  </>
);

export default {
  title: 'Input/RangeInput/Custom Themed/Disabled',
};
