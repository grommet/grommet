import React from 'react';
import { storiesOf } from '@storybook/react';

import { Box, Grommet, RangeInput } from 'grommet';

const rangeTheme = {
  rangeInput: {
    track: {
      height: '12px',
      extend: ({ max, value }) => {
        const lowerTrack = 'lightgreen';
        const upperTrack = 'lightgrey';
        const thumbPosition = `${(value / max) * 100}%`;

        return `background: linear-gradient(
        to right, 
        ${lowerTrack}, 
        ${lowerTrack} ${thumbPosition},
        ${upperTrack} ${thumbPosition},
        ${upperTrack}
      );`;
      },
    },
  },
};

const TrackDualColor = () => {
  const [value, setValue] = React.useState(40);

  const onChange = event => setValue(event.target.value);

  return (
    <Grommet theme={rangeTheme}>
      <Box align="center" pad="large" width="medium">
        <RangeInput value={value} max={100} onChange={onChange} />
      </Box>
    </Grommet>
  );
};

storiesOf('RangeInput', module).add('Dual Color Track', () => (
  <TrackDualColor />
));
