import React from 'react';
import { storiesOf } from '@storybook/react';

import { Box, MnetUIBase, Select } from 'mnet-ui-base';
import { mnet } from 'mnet-ui-base/themes';

const Example = () => {
  return (
    <MnetUIBase full theme={mnet}>
      <Box fill align="center" justify="start" pad="large">
        <Select
          id="select"
          name="select"
          placeholder="Select"
          options={['one', 'two']}
          onChange={({ option }) => console.log(option)}
        />
      </Box>
    </MnetUIBase>
  );
};

storiesOf('Select', module).add('Uncontrolled', () => <Example />);
