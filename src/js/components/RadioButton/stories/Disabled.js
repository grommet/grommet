import React from 'react';
import { storiesOf } from '@storybook/react';

import { Box, RadioButton } from 'mnet-ui-base';

const DisabledRadioButton = () => {
  return (
    <>
      <Box align="center" pad="large" gap="large">
        <RadioButton
          label="option 1"
          name="name"
          value="option 1"
          checked
          disabled
        />
      </Box>
    </>
  );
};

storiesOf('RadioButton', module).add('Disabled', () => <DisabledRadioButton />);
