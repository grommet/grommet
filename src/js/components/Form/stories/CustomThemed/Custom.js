import React from 'react';

import {
  Box,
  Button,
  CheckBox,
  Form,
  FormField,
  Grommet,
  MaskedInput,
  RadioButtonGroup,
  RangeInput,
  Select,
  TextArea,
  TextInput,
} from 'grommet';
import { grommet } from 'grommet/themes';
import { deepMerge } from 'grommet/utils';

const customTheme = {
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
      color: 'dark-2',
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

export const Custom = () => (
  <Grommet full theme={deepMerge(grommet, customTheme)}>
    <Box fill align="center" justify="center">
      <Box width="medium">
        <Form
          onReset={(event) => console.log(event)}
          onSubmit={({ value }) => console.log('Submit', value)}
        >
          <FormField htmlFor="name" label="Name" name="name" required>
            <TextInput id="name" aria-required name="name" />
          </FormField>
          <FormField htmlFor="email" label="Email" name="email" required>
            <MaskedInput
              name="email"
              id="email"
              aria-required
              mask={[
                { regexp: /^[\w\-_.]+$/, placeholder: 'example' },
                { fixed: '@' },
                { regexp: /^[\w]+$/, placeholder: 'my' },
                { fixed: '.' },
                { regexp: /^[\w]+$/, placeholder: 'com' },
              ]}
            />
          </FormField>
          <FormField htmlFor="subscribe" name="subscribe">
            <CheckBox id="subscribe" name="subscribe" label="Subscribe?" />
          </FormField>
          <FormField htmlFor="ampm" name="ampm">
            <RadioButtonGroup
              id="ampm"
              name="ampm"
              options={['morning', 'evening']}
            />
          </FormField>
          <FormField htmlFor="size" label="Size" name="size">
            <Select
              id="size"
              name="size"
              options={['small', 'medium', 'large']}
            />
          </FormField>
          <FormField
            htmlFor="comments"
            label="Comments"
            name="comments"
            disabled
          >
            <TextArea id="comments" name="comments" disabled />
          </FormField>
          <FormField htmlFor="age" label="Age" name="age">
            <RangeInput id="age" name="age" min={15} max={75} />
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

export default {
  title: 'Input/Form/Custom Themed/Custom',
};
