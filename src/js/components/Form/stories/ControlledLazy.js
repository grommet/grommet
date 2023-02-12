import React, { useEffect, useState } from 'react';

import {
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
} from 'grommet';

const defaultValue = {
  name: '',
  email: '',
  subscribe: false,
  ampm: '',
  size: '',
  comments: '',
  age: '',
};

export const ControlledLazy = () => {
  const [value, setValue] = useState(defaultValue);

  useEffect(
    () =>
      setValue({
        name: 'initial',
        email: 'initial@my.com',
        subscribe: true,
        ampm: 'evening',
        size: 'large',
        comments: 'initial',
        age: 60,
      }),
    [],
  );
  return (
    // Uncomment <Grommet> lines when using outside of storybook
    // <Grommet theme={...}>
    <Box align="center" justify="center" pad="large">
      <Box width="medium">
        <Form
          value={value}
          onChange={(nextValue) => {
            console.log('Change', nextValue);
            setValue(nextValue);
          }}
          onReset={() => setValue(defaultValue)}
          onSubmit={(event) =>
            console.log('Submit', event.value, event.touched)
          }
        >
          <FormField label="Name" htmlFor="name" name="name">
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
          <FormField name="subscribe">
            <CheckBox name="subscribe" label="Subscribe?" />
          </FormField>
          <FormField name="ampm">
            <RadioButtonGroup name="ampm" options={['morning', 'evening']} />
          </FormField>
          <FormField label="Size" htmlFor="size" name="size">
            <Select
              id="size"
              aria-label="size"
              name="size"
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
};

ControlledLazy.storyName = 'Controlled lazy';

ControlledLazy.parameters = {
  // chromatic disabled because snapshot is the same as Controlled
  chromatic: { disable: true },
};

ControlledLazy.args = {
  full: true,
};

export default {
  title: 'Input/Form/Controlled lazy',
};
