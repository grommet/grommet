import React, { useRef } from 'react';
import { storiesOf } from '@storybook/react';

import { grommet, Box, Button, Grommet, Text } from 'grommet';
import { Tip } from '../../Tip';

const Example = () => {
  const ref = useRef();
  return (
    <Grommet full theme={grommet}>
      <Box align="center" justify="center" fill>
        <Tip content="tooltip">
          <Button label="action" />
        </Tip>
      </Box>
    </Grommet>
  );
};

storiesOf('Tip', module).add('Simple', () => <Example />, {
  chromatic: { disable: true },
});
