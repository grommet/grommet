import React, { useState } from 'react';

import { Box, Grommet, Select, grommet } from 'grommet';

const options = ['one', 'two', 'three'];

const ClearTop = () => {
  const [value, setValue] = useState();
  return (
    <Box fill align="center" justify="start" pad="large">
      <Select
        placeholder="Clear Options"
        multiple
        value={value}
        options={options}
        onChange={({ value: nextValue }) => setValue(nextValue)}
        clear
      />
    </Box>
  );
};

export const Clear = () => (
  <Grommet theme={grommet}>
    <ClearTop />
  </Grommet>
);

Clear.parameters = {
  chromatic: { disable: true },
};

export default {
  title: 'Input/Select/Clear',
};
