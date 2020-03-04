import React from 'react';
import { storiesOf } from '@storybook/react';
import isChromatic from 'storybook-chromatic/isChromatic';

import { Box, MnetUIBase, RangeInput } from 'mnet-ui-base';
import { mnet } from 'mnet-ui-base/themes';
import { deepMerge } from 'mnet-ui-base/utils';

import { Volume } from 'grommet-icons';

const customThemeRangeInput = deepMerge(mnet, {
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
    <MnetUIBase theme={customThemeRangeInput}>
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
    </MnetUIBase>
  );
};

if (!isChromatic()) {
  storiesOf('TypeScript/RangeInput', module).add('Custom', () => (
    <CustomRangeInput />
  ));
}
