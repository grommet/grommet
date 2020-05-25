import React from 'react';
import { storiesOf } from '@storybook/react';
import { Add } from 'grommet-icons';

import { Box, Button, Text } from 'mnet-ui-base';

const PlainButton = props => (
  <>
    <Box align="center" pad="large">
      <Button hoverIndicator="light-1" onClick={() => {}} {...props}>
        <Box pad="small" direction="row" align="center" gap="small">
          <Add />
          <Text>Add</Text>
        </Box>
      </Button>
    </Box>
  </>
);

storiesOf('Button', module)
  .add('Active', () => <PlainButton active />)
  .add('Plain', () => <PlainButton />);
