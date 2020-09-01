import React from 'react';
import { storiesOf } from '@storybook/react';

import { Box, Grommet, Select } from 'grommet';
import { grommet } from 'grommet/themes';

const Example = () => {
  return (
    <Grommet full theme={grommet}>
      <Box fill align="center" justify="start" pad="large">
        <Select
          id="select"
          name="select"
          placeholder="Select"
          options={['one', 'two']}
          onChange={({ option }) => console.log(option)}
        />
      </Box>
    </Grommet>
  );
};

storiesOf('Select', module).add('Uncontrolled', () => <Example />);
