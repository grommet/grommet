import React from 'react';
import { storiesOf } from '@storybook/react';

import { Box, FormField, CheckBox } from 'mnet-ui-base';

const FormFieldToggle = props => (
  <>
    <Box align="center" pad="large">
      <FormField label="Label" htmlFor="check-box" {...props}>
        <Box pad={{ horizontal: 'small', vertical: 'xsmall' }}>
          <CheckBox id="check-box" label="CheckBox" toggle />
        </Box>
      </FormField>
    </Box>
  </>
);

storiesOf('Form', module).add('Toggle', () => <FormFieldToggle />);
