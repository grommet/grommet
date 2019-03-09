import React from 'react';
import { storiesOf } from '@storybook/react';
import { Add } from 'grommet-icons';

import { Box, Button, Grommet, Text } from 'grommet';
import { grommet } from 'grommet/themes';

const PlainButton = props => (
  <Grommet theme={grommet}>
    <Box align="center" pad="large">
      <Button hoverIndicator="light-1" onClick={() => {}} {...props}>
        <Box pad="small" direction="row" align="center" gap="small">
          <Add />
          <Text>Add</Text>
        </Box>
      </Button>
    </Box>
  </Grommet>
);

storiesOf('Button', module)
  .add('Active', () => <PlainButton active />)
  .add('Plain', () => <PlainButton />);
