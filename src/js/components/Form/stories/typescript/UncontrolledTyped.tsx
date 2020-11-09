import React from 'react';

import {
  Box,
  Button,
  CheckBox,
  Form,
  FormField,
  Grommet,
  RadioButtonGroup,
  RangeInput,
  Select,
  TextArea,
} from 'grommet';
import { grommet } from 'grommet/themes';
import { FormExtendedEvent } from '../../Form';

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

export const UncontrolledTyped = () => (
  <Grommet full theme={grommet}>
    <Box fill align="center" justify="center">
      <Box width="medium">
        <Form
          onReset={event => console.log(event)}
          // Type annotations can only be used in TypeScript files
          // Remove ': FormState' and ': FormExtendEvent'
          // if you are not using Typescript.
          onChange={(value: FormState) => console.log('onChange', value)}
          onSubmit={(event: FormExtendedEvent) =>
            console.log('onSubmit', event.value, event.touched)
          }
        >
          <FormField
            label="Name"
            name="name"
            required
            validate={{ regexp: /^[a-z]/i }}
          />
          <FormField label="Email" name="email" type="email" required />
          <FormField
            label="Employee ID"
            name="employeeId"
            required
            validate={{ regexp: /^[0-9]{4,6}$/, message: '4-6 digits' }}
          />
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
            name="size"
            component={Select}
            onChange={event => console.log(event)}
            options={['small', 'medium', 'large', 'xlarge']}
          />
          <FormField label="Comments" name="comments" component={TextArea} />
          <FormField
            label="Age"
            name="age"
            component={RangeInput}
            pad
            min={15}
            max={75}
          />
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

UncontrolledTyped.story = {
  name: 'Uncontrolled typed',
  parameters: {
    chromatic: { disable: true },
  },
};
