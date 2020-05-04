import React from 'react';
import { storiesOf } from '@storybook/react';

import { Box, Grommet, TextInput } from 'grommet';
import { grommet } from 'grommet/themes';

const Example = () => {
  return (
    <Grommet full theme={grommet}>
      <Box fill align="center" justify="start" pad="large">
        <Box width="medium">
          <TextInput
            onChange={event => console.log('Change', event.target.value)}
          />
        </Box>
      </Box>
    </Grommet>
  );
};

storiesOf('TextInput', module).add('Uncontrolled', () => <Example />);
