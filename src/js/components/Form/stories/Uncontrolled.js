import React from 'react';

import {
  Box,
  Button,
  CheckBox,
  Form,
  FormField,
  FileInput,
  Grommet,
  MaskedInput,
  RadioButtonGroup,
  RangeInput,
  Select,
  TextArea,
  TextInput,
} from 'grommet';
import { grommet } from 'grommet/themes';

const suggestions = ['Shimi', 'Eric'];

export const Uncontrolled = () => (
  <Grommet full theme={grommet}>
    <Box fill align="center" justify="center">
      <Box width="medium">
        <Form
          onChange={value => console.log('Change', value)}
          onSubmit={event => console.log('Submit', event.value, event.touched)}
        >
          <FormField label="Name" name="name">
            <TextInput name="name" suggestions={suggestions} />
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
          <FormField label="Comments" name="comments">
            <TextArea name="comments" />
          </FormField>
          <FormField label="Age" name="age" pad>
            <RangeInput name="age" min={15} max={75} />
          </FormField>
          <FormField label="Image" name="image">
            <FileInput name="image" />
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
  title: 'Input/Form/Uncontrolled',
};
