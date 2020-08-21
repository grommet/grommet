import React, { useState } from 'react';
import { storiesOf } from '@storybook/react';

import { Box, Button, Grommet, Select } from 'grommet';
import { grommet } from 'grommet/themes';

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

const ClearRender = () => {
  const [value, setValue] = useState('');
  return (
    <Box fill align="center" justify="start" pad="large">
      <Select
        placeholder="Clear with render"
        value={value}
        options={options}
        onChange={({ option }) => setValue(option)}
        clear={{
          render: ({ onClear }) => {
            return (
              <Box pad="medium" background="accent-4">
                <Button onClick={onClear}>Click me!</Button>
              </Box>
            );
          },
        }}
      />
    </Box>
  );
};

const ClearExamples = () => (
  <Grommet theme={grommet}>
    <Box direction="row">
      <ClearTop />
      <ClearBottom />
      <ClearRender />
    </Box>
  </Grommet>
);

storiesOf('Select', module).add('Clear', () => <ClearExamples />);
