import React from 'react';
import { storiesOf } from '@storybook/react';

import { MnetUIBase, Box, RadioButton } from 'mnet-ui-base';
import { mnet } from 'mnet-ui-base/themes';

const DisabledRadioButton = () => {
  return (
    <MnetUIBase theme={mnet}>
      <Box align="center" pad="large" gap="large">
        <RadioButton
          label="option 1"
          name="name"
          value="option 1"
          checked
          disabled
        />
      </Box>
    </MnetUIBase>
  );
};

storiesOf('RadioButton', module).add('Disabled', () => <DisabledRadioButton />);
