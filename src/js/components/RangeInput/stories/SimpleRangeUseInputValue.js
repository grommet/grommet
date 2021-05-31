import React from 'react';

import { Box, Grommet, RangeInput } from 'grommet';
import { grommet } from 'grommet/themes';

export const SimpleRangeUseInputValue = () => {
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

export default {
  title: 'Input/RangeInput/SimpleRangeUseInputValue',
};
