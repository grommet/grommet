import React from 'react';
import { storiesOf } from '@storybook/react';

import { Box, MnetUIBase, TextInput } from 'mnet-ui-base';
import { mnet } from 'mnet-ui-base/themes';

const Example = () => {
  return (
    <MnetUIBase full theme={mnet}>
      <Box fill align="center" justify="start" pad="large">
        <Box width="medium">
          <TextInput
            onChange={event => console.log('Change', event.target.value)}
          />
        </Box>
      </Box>
    </MnetUIBase>
  );
};

storiesOf('TextInput', module).add('Uncontrolled', () => <Example />);
