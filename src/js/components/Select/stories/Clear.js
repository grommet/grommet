import React, { useState } from 'react';
import { storiesOf } from '@storybook/react';

import { Box, Grommet, Select, grommet } from 'grommet';

const options = ['one', 'two'];

const ClearTop = () => {
  const [value, setValue] = useState('');
  return (
    <Box fill align="center" justify="start" pad="large">
      <Select
        placeholder="Clear on top"
        value={value}
        options={options}
        onChange={({ option }) => setValue(option)}
        clear
      />
    </Box>
  );
};

const ClearBottom = () => {
  const [value, setValue] = useState('');
  return (
    <Box fill align="center" justify="start" pad="large">
      <Select
        placeholder="Clear on bottom"
        value={value}
        options={options}
        onChange={({ option }) => setValue(option)}
        clear={{ position: 'bottom' }}
      />
    </Box>
  );
};

const ClearLabel = () => {
  const [value, setValue] = useState('');
  return (
    <Box fill align="center" justify="start" pad="large">
      <Select
        placeholder="Clear with label"
        value={value}
        options={options}
        onChange={({ option }) => setValue(option)}
        clear={{ label: 'Click me!' }}
      />
    </Box>
  );
};

const ClearExamples = () => (
  <Grommet theme={grommet}>
    <Box direction="row">
      <ClearTop />
      <ClearBottom />
      <ClearLabel />
    </Box>
  </Grommet>
);

storiesOf('Select', module).add('Clear', () => <ClearExamples />);
