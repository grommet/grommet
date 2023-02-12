import React from 'react';

import {
  Box,
  Button,
  CheckBoxGroup,
  Form,
  FormField,
  MaskedInput,
  RadioButtonGroup,
  RangeInput,
  Select,
  TextArea,
  TextInput,
} from 'grommet';

const passwordRulesStrong = [
  {
    regexp: /(?=.*?[A-Z])/,
    message: 'One uppercase letter',
    status: 'error',
  },
  {
    regexp: /(?=.*?[a-z])/,
    message: 'One lowercase letter',
    status: 'error',
  },
  {
    regexp: /(?=.*?[#?!@$ %^&*-])/,
    message: 'One special character',
    status: 'error',
  },
  {
    regexp: /.{8,}/,
    message: 'At least 8 characters',
    status: 'error',
  },
];

export const FieldWithChildren = () => (
  // Uncomment <Grommet> lines when using outside of storybook
  // <Grommet theme={...}>
  <Box align="center" justify="center" pad="large">
    <Box width="medium">
      <Form
        onReset={(event) => console.log(event)}
        onSubmit={({ value }) => console.log('Submit', value)}
        onValidate={({ errors, infos }) =>
          console.log('Validate', errors, infos)
        }
      >
        <FormField label="Name" htmlFor="name" name="name" required>
          <TextInput id="name" name="name" />
        </FormField>
        <FormField label="Email" htmlFor="email" name="email" required>
          <MaskedInput
            id="email"
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
        <FormField
          label="Password"
          name="password"
          htmlFor="password"
          validate={passwordRulesStrong}
        >
          <TextInput name="password" id="password" type="password" />
        </FormField>
        <FormField name="subscription">
          <CheckBoxGroup
            name="subscription"
            options={['subscribe', 'receive email notifications']}
          />
        </FormField>
        <FormField name="ampm">
          <RadioButtonGroup name="ampm" options={['morning', 'evening']} />
        </FormField>
        <FormField label="Size" htmlFor="size" name="size">
          <Select
            id="size"
            aria-label="size"
            name="size"
            multiple
            options={['small', 'medium', 'large']}
          />
        </FormField>
        <FormField label="Comments" htmlFor="comments" name="comments">
          <TextArea id="comments" name="comments" />
        </FormField>
        <FormField label="Age" htmlFor="age" name="age" pad>
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
  // </Grommet>
);

FieldWithChildren.storyName = 'Field with children';

FieldWithChildren.args = {
  full: true,
};

export default {
  title: 'Input/Form/Field with children',
};
