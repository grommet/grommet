import React from 'react';
import { storiesOf } from '@storybook/react';

import { mnet, Box, FormField, CheckBox, MnetUIBase } from 'mnet-ui-base';

const FormFieldToggle = props => (
  <MnetUIBase theme={mnet}>
    <Box align="center" pad="large">
      <FormField label="Label" htmlFor="check-box" {...props}>
        <Box pad={{ horizontal: 'small', vertical: 'xsmall' }}>
          <CheckBox id="check-box" label="CheckBox" toggle />
        </Box>
      </FormField>
    </Box>
  </MnetUIBase>
);

storiesOf('Form', module).add('Toggle', () => <FormFieldToggle />);
