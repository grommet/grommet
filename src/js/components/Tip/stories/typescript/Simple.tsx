import React, { useRef } from 'react';

import { grommet, Box, Button, Grommet, Text } from 'grommet';
import { Tip } from '../../Tip';

const Example = () => {
  const ref = useRef();
  return (
    <Grommet full theme={grommet}>
      <Box align="center" justify="center" fill>
        <Tip content="action info">
          <Button label="action" />
        </Tip>
      </Box>
    </Grommet>
  );
};

export const Simple = () => <Example />
Simple.parameters = {  chromatic: { disable: true }};
