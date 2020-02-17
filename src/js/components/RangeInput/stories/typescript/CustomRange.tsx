import React from 'react';
import { storiesOf } from '@storybook/react';
import isChromatic from 'storybook-chromatic/isChromatic';

import { Box, Grommet, RangeInput } from 'grommet';
import { grommet } from 'grommet/themes';
import { deepMerge } from 'grommet/utils';

import { Volume } from 'grommet-icons';

const customThemeRangeInput = deepMerge(grommet, {
  global: {
    spacing: '12px',
  },
  rangeInput: {
    track: {
      color: 'accent-2',
      height: '12px',
      extend: () => `border-radius: 10px`,
    },
    thumb: {
      color: 'neutral-2',
    },
  },
});

const CustomRangeInput = () => {
  const [value, setValue] = React.useState(0.4);

  const onChange = event => setValue(event.target.value);

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
            onChange={onChange}
          />
        </Box>
      </Box>
    </Grommet>
  );
};

if (!isChromatic()) {
  storiesOf('TypeScript/RangeInput', module).add('Custom', () => (
    <CustomRangeInput />
  ));
}
