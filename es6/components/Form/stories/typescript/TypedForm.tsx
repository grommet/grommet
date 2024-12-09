import React from 'react';

import {
  Box,
  Button,
  CheckBox,
  Form,
  FormField,
  RadioButtonGroup,
  RangeInput,
  Select,
  TextArea,
  TextInput,
} from 'grommet';
import { useState } from 'react';

// interface declarations can only be used in TypeScript files
// Remove 'interface FormState' if you are not using TypeScript
interface FormState {
  name?: string;
  employeeId?: number;
  subscribe?: boolean;
  ampm?: 'morning' | 'afternoon';
  size?: 'small' | 'medium' | 'large' | 'xlarge';
  comments?: string;
  age?: number;
}

export const TypedForm = () => {
  const [value, setValue] = useState<FormState>({});

  return (
    // Uncomment <Grommet> lines when using outside of storybook
    // <Grommet theme={...}>
    <Box align="center" justify="center" pad="large">
      <Box width="medium">
        {/* 
            Type annotations can only be used in TypeScript files
            Remove <FormState> if you are not using Typescript
          */}
        <Form<FormState>
          value={value}
          onReset={() => setValue({})}
          onChange={(nextValue, { touched }) => {
            console.log('Change', nextValue, touched);
            setValue(nextValue);
          }}
          onSubmit={(event) =>
            console.log('onSubmit', event.value, event.touched)
          }
        >
          <FormField
            label="Name"
            htmlFor="name"
            name="name"
            required
            validate={{ regexp: /^[a-z]/i }}
          >
            <TextInput aria-required name="name" id="name" type="name" />
          </FormField>
          <FormField
            label="Email"
            htmlFor="email"
            name="email"
            type="email"
            required
          >
            <TextInput aria-required name="email" type="email" id="email" />
          </FormField>
          <FormField
            label="Employee ID"
            htmlFor="employeeId"
            name="employeeId"
            required
            validate={{ regexp: /^[0-9]{4,6}$/, message: '4-6 digits' }}
          >
            <TextInput
              aria-required
              id="employeeId"
              name="employeeId"
              type="employeeId"
            />
          </FormField>
          <FormField name="subscribe" pad>
            <CheckBox label="Subscribe?" name="subscribe" id="subscribe" />
          </FormField>
          <FormField name="ampm" pad options={['morning', 'evening']}>
            <RadioButtonGroup
              name="ampm"
              id="ampm"
              options={['morning', 'evening']}
            />
          </FormField>
          <FormField label="Size" htmlFor="size" name="size">
            <Select
              id="size"
              name="size"
              onChange={(event) => console.log(event)}
              options={['small', 'medium', 'large', 'xlarge']}
            />
          </FormField>
          <FormField label="Comments" htmlFor="comments" name="comments">
            <TextArea name="comments" id="comments" />
          </FormField>
          <FormField label="Age" htmlFor="age" name="age" pad>
            <RangeInput name="age" id="age" type="age" min={15} max={75} />
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

TypedForm.parameters = {
  chromatic: { disable: true },
};

TypedForm.args = {
  full: true,
};

TypedForm.storyName = 'Typed Form';

export default {
  title: 'Input/Form/Typed Form',
};
