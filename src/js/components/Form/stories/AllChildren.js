import React from 'react';
import { storiesOf } from '@storybook/react';

import {
  Box,
  Button,
  CheckBoxGroup,
  Grommet,
  Form,
  FormField,
  MaskedInput,
  RadioButtonGroup,
  RangeInput,
  Select,
  TextArea,
  TextInput,
} from 'grommet';
import { grommet } from 'grommet/themes';

const passwordRulesStrong = [
  {
    regexp: new RegExp('(?=.*?[A-Z])'),
    message: 'One uppercase letter',
    status: 'error',
  },
  {
    regexp: new RegExp('(?=.*?[a-z])'),
    message: 'One lowercase letter',
    status: 'error',
  },
  {
    regexp: new RegExp('(?=.*?[#?!@$ %^&*-])'),
    message: 'One special character',
    status: 'error',
  },
  {
    regexp: new RegExp('.{8,}'),
    message: 'At least 8 characters',
    status: 'error',
  },
];

const Example = () => (
  <Grommet full theme={grommet}>
    <Box fill align="center" justify="center">
      <Box width="medium">
        <Form
          onReset={event => console.log(event)}
          onSubmit={({ value }) => console.log('Submit', value)}
          onValidate={({ errors, infos }) =>
            console.log('Validate', errors, infos)
          }
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
          <FormField label="Size" name="size">
            <Select
              name="size"
              multiple
              options={['small', 'medium', 'large']}
            />
          </FormField>
          <FormField label="Comments" name="comments">
            <TextArea name="comments" />
          </FormField>
          <FormField label="Age" name="age" pad>
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

storiesOf('Form', module).add('FormField children', () => <Example />);
