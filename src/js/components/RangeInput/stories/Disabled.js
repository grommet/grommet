import React from 'react';
import { Box, Grommet, RangeInput } from 'grommet';

export const Disabled = () => {
  const [value, setValue] = React.useState(5);

  const onChange = (event) => setValue(event.target.value);

  return (
    <Grommet
      theme={{ global: { control: { disabled: { cursor: 'not-allowed' } } } }}
    >
      <Box align="center" pad="large">
        <RangeInput
          disabled
          a11yTitle="Select range value"
          value={value}
          onChange={onChange}
        />
      </Box>
    </Grommet>
  );
};

Disabled.storyName = 'Disabled';

export default {
  title: 'Input/RangeInput/Disabled',
};
