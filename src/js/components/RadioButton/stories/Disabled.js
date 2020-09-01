import React from 'react';
import { storiesOf } from '@storybook/react';

import { Grommet, Box, RadioButton } from 'grommet';
import { grommet } from 'grommet/themes';

const DisabledRadioButton = () => {
  return (
    <Grommet theme={grommet}>
      <Box align="center" pad="large" gap="large">
        <RadioButton
          label="option 1"
          name="name"
          value="option 1"
          checked
          disabled
        />
      </Box>
    </Grommet>
  );
};

storiesOf('RadioButton', module).add('Disabled', () => <DisabledRadioButton />);
