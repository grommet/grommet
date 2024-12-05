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
            id="name"
            name="name"
            required
            validate={{ regexp: /^[a-z]/i }}
          >
            <TextInput
              aria-required
              aria-label="name"
              name="name"
              type="name"
            />
          </FormField>
          <FormField
            label="Email"
            htmlFor="email"
            id="email"
            name="email"
            type="email"
            required
          >
            <TextInput
              aria-required
              aria-label="email"
              name="email"
              type="email"
            />
          </FormField>
          <FormField
            label="Employee ID"
            htmlFor="employeeId"
            id="employeeId"
            name="employeeId"
            required
            validate={{ regexp: /^[0-9]{4,6}$/, message: '4-6 digits' }}
          >
            <TextInput
              aria-required
              aria-label="employeeId"
              name="employeeId"
              type="employeeId"
            />
          </FormField>
          <FormField
            name="subscribe"
            component={CheckBox}
            pad
            label="Subscribe?"
          />
          <FormField
            name="ampm"
            component={RadioButtonGroup}
            pad
            options={['morning', 'evening']}
          />
          <FormField
            label="Size"
            htmlFor="size"
            id="size"
            aria-label="size"
            name="size"
          >
            <Select
              onChange={(event) => console.log(event)}
              options={['small', 'medium', 'large', 'xlarge']}
            />
          </FormField>
          <FormField
            label="Comments"
            htmlFor="comments"
            id="comments"
            name="comments"
          >
            <TextArea />
          </FormField>
          <FormField label="Age" htmlFor="age" id="age" name="age" pad>
            <RangeInput
              aria-label="age"
              name="age"
              type="age"
              min={15}
              max={75}
            />
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
