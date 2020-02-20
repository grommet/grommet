import { Box, Form, NumberInput, Text } from 'grommet';

import React from 'react';
import { storiesOf } from '@storybook/react';

const StyledPlaceholder = () => {
  return (
    <Box>
      <Form>
        <NumberInput name="age" placeholder={<Text>input number</Text>} />
      </Form>
    </Box>
  );
};

storiesOf('NumberInput', module).add('StyledPlaceholder', () => (
  <StyledPlaceholder />
));
