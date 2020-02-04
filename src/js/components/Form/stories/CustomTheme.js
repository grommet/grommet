import React from 'react';
import { storiesOf } from '@storybook/react';
import { deepMerge } from 'grommet/utils';

import {
  grommet,
  Box,
  Button,
  CheckBox,
  Form,
  FormField,
  MaskedInput,
  RadioButtonGroup,
  RangeInput,
  Select,
  TextArea,
  TextInput,
  Grommet,
} from 'grommet';

const customFormFieldTheme = {
  global: {
    font: {
      size: '16px',
    },
    input: {
      weight: 400,
    },
  },
  formField: {
    label: {
      color: 'dark-3',
      size: 'small',
      margin: 'xsmall',
      weight: 600,
    },
    border: {
      position: 'outer',
      side: 'all',
    },
    disabled: {
      background: {
        color: 'status-disabled',
        opacity: true,
      },
    },
    content: {
      pad: 'small',
    },
    error: {
      background: {
        color: 'status-critical',
        opacity: 'weak',
      },
    },
    margin: 'none',
  },
};

const CustomFormField = () => (
  <Grommet full theme={deepMerge(grommet, customFormFieldTheme)}>
    <Box fill align="center" justify="center">
      <Box width="medium">
        <Form
          onReset={event => console.log(event)}
          onSubmit={({ value }) => console.log('Submit', value)}
        >
          <FormField label="Name" name="name" required>
            <TextInput name="name" />
          </FormField>
          <FormField label="Email" name="email" required>
            <MaskedInput
              name="email"
              mask={[
                { regexp: /^[\w\-_.]+$/, placeholder: 'example' },
                { fixed: '@' },
                { regexp: /^[\w]+$/, placeholder: 'my' },
                { fixed: '.' },
                { regexp: /^[\w]+$/, placeholder: 'com' },
              ]}
            />
          </FormField>
          <FormField name="subscribe">
            <CheckBox name="subscribe" label="Subscribe?" />
          </FormField>
          <FormField name="ampm">
            <RadioButtonGroup name="ampm" options={['morning', 'evening']} />
          </FormField>
          <FormField label="Size" name="size">
            <Select name="size" options={['small', 'medium', 'large']} />
          </FormField>
          <FormField label="Comments" name="comments" disabled>
            <TextArea name="comments" disabled />
          </FormField>
          <FormField label="Age" name="age">
            <RangeInput name="age" min={15} max={75} />
          </FormField>
          <Box direction="row" justify="between" margin={{ top: 'medium' }}>
            <Button label="Cancel" />
            <Button type="reset" label="Reset" />
            <Button type="submit" label="Update" primary />
          </Box>
        </Form>
      </Box>
    </Box>
  </Grommet>
);

storiesOf('Form', module).add('Custom Theme', () => <CustomFormField />);
