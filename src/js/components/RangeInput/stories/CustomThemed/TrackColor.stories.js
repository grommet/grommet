import React from 'react';

import { Box, Grommet, RangeInput } from 'grommet';

const rangeInputTheme = {
  rangeInput: {
    pad: '12px',
    track: {
      height: '12px',
      extend: () => `border-radius: 10px`,
    },
  },
};

export const TrackColor = () => {
  const [value1, setValue1] = React.useState(0.4);
  const onChange1 = (event) => setValue1(event.target.value);
  const [value2, setValue2] = React.useState(8);
  const onChange2 = (event) => setValue2(event.target.value);

  return (
    <Grommet theme={rangeInputTheme}>
      <Box align="center" pad="large" gap="large" width="large">
        <RangeInput
          a11yTitle="Select range value"
          min={0}
          max={1}
          step={0.1}
          value={value1}
          color="skyblue"
          onChange={onChange1}
        />
        <RangeInput
          a11yTitle="Select range value"
          min={0}
          max={10}
          step={1}
          value={value2}
          onChange={onChange2}
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

TrackColor.storyName = 'Track Color';

export default {
  title: 'Input/RangeInput/Custom Themed/Track Color',
};
