import React from 'react';

import { Box, Grommet, RangeInput } from 'grommet';
import { grommet } from 'grommet/themes';

export const InputValue = () => {
  const [value, setValue] = React.useState(5);

  const onChange = event => setValue(event.target.value);

  return (
    <Grommet theme={grommet}>
      <Box align="center" pad="large">
        <RangeInput
          value={value}
          onChange={onChange}
          inputValue
          inputDirection="right"
          max={100}
          min={0}
        />
      </Box>
    </Grommet>
  );
};

InputValue.storyName = 'Input Value';

export default {
  title: 'Input/RangeInput/Input Value',
};
