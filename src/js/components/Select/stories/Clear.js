import React, { useState } from 'react';

import { Box, Select } from 'grommet';

const options = [];
for (let i = 0; i < 500; i += 1) {
  options.push(`Number ${i}`);
}

const ClearTop = () => {
  const [value, setValue] = useState();
  return (
    <Box fill align="center" justify="start" pad="large">
      <Select
        placeholder="Clear Options"
        value={value}
        multiple
        options={options}
        onChange={({ value: nextValue }) => setValue(nextValue)}
        dropHeight="large"
        clear
      />
    </Box>
  );
};

const ClearBottom = () => {
  const [value, setValue] = useState();
  return (
    <Box fill align="center" justify="start" pad="large">
      <Select
        placeholder="Clear Options"
        value={value}
        multiple
        options={options}
        onChange={({ value: nextValue }) => setValue(nextValue)}
        dropHeight="large"
        clear={{ position: 'bottom' }}
      />
    </Box>
  );
};

export const Clear = () => (
  // Uncomment <Grommet> lines when using outside of storybook
  // <Grommet theme={...}>
  <>
    <ClearTop />
    <ClearBottom />
  </>
  // </Grommet>
);

Clear.parameters = {
  chromatic: { disable: true },
};

export default {
  title: 'Input/Select/Clear',
};
