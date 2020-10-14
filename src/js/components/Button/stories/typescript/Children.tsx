import React from 'react';
import { storiesOf } from '@storybook/react';

import { grommet, Box, Button, Grommet, Text } from 'grommet';
import { Add } from 'grommet-icons';

const BasicButtons = () => (
  <Grommet theme={grommet}>
    <Box align="center" pad="medium">
      <Button hoverIndicator="light-1" onClick={() => {}} plain disabled>
        {({ disabled, hover, focus }) => (
          <Box
            background={disabled ? 'light-2' : 'white'}
            pad="small"
            direction="row"
            align={disabled ? 'start' : 'center'}
            gap="small"
          >
            {hover || disabled ? <Add color="brand" /> : <Add />}
            {focus ? (
              <Text>Child Button is focused</Text>
            ) : (
              <Text>Child Button</Text>
            )}
          </Box>
        )}
      </Button>
    </Box>
  </Grommet>
);

const ChildButtons = () => {};

storiesOf('Button', module).add('Children', () => <BasicButtons />);
