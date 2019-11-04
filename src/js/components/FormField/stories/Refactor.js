import React from 'react';
import { storiesOf } from '@storybook/react';

import { grommet, Box, FormField, CheckBox, Grommet, TextInput } from 'grommet';

const FormFieldRefactor = () => (
  <Grommet theme={grommet}>
    <Box align="center" pad="large">
      <FormField label="Email" position="below">
        <TextInput id="email" />
      </FormField>

      <FormField label="Email" position="above">
        <TextInput id="email" />
      </FormField>

      <FormField label="Email" position="start">
        <TextInput id="email" />
      </FormField>

      <FormField label="Email" position="start" basis="1/3">
        <TextInput id="email" />
      </FormField>

      {/* container */}
      <FormField
        label="Email"
        position="above"
        border={{
          color: {
            default: 'border',
            focus: 'focus',
            error: 'status-critical',
          },
          style: 'solid',
          side: 'bottom',
        }}
        margin={{ bottom: 'small' }}
      >
        <TextInput id="email" plain />
      </FormField>

      <FormField label="Label" htmlFor="check-box">
        <Box pad={{ horizontal: 'small', vertical: 'xsmall' }}>
          <CheckBox id="check-box" label="CheckBox" />
        </Box>
      </FormField>
    </Box>
  </Grommet>
);

storiesOf('FormField', module).add('Refactor', () => <FormFieldRefactor />);
