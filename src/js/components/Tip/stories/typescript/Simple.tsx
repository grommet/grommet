import React, { useRef } from 'react';
import { storiesOf } from '@storybook/react';

import { grommet, Box, Button, Grommet, Text } from 'grommet';
import { Tip } from '../../Tip';

const Example = () => {
  const ref = useRef();
  return (
    <Grommet full theme={grommet}>
      <Box align="center" justify="center" background="dark-1" fill>
        <Tip
          content={
            <Box
              ref={ref}
              margin="small"
              background="dark-4"
              round="medium"
              pad="small"
              align="center"
            >
              <Text color="accent-1">Tooltip</Text>
            </Box>
          }
        >
          <Button label="Hover Me" />
        </Tip>
      </Box>
    </Grommet>
  );
};

storiesOf('Tip', module).add('Simple', () => <Example />, {
  chromatic: { disable: true },
});
