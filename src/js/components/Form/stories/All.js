import React from 'react';
import { storiesOf } from '@storybook/react';

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
} from 'mnet-ui-base';

const Example = () => (
  <div style={{ width: '100vw', height: '100vh', overflow: 'auto' }}>
    <Box fill align="center" justify="center">
      <Box width="medium">
        <Form
          onReset={event => console.log(event)}
          onSubmit={({ value, touched }) =>
            console.log('Submit', value, touched)
          }
        >
          <FormField
            label="Name"
            name="name"
            required
            validate={[
              { regexp: /^[a-z]/i },
              name => {
                if (name && name.length === 1) return 'must be >1 character';
                return undefined;
              },
              name => {
                if (name && name.length <= 2)
                  return { message: "that's short", status: 'info' };
                return undefined;
              },
            ]}
          />
          <FormField label="Email" name="email" type="email" required />
          <FormField
            label="Employee ID"
            name="employeeId"
            required
            validate={{ regexp: /^[0-9]{4,6}$/, message: '4-6 digits' }}
          />
          <FormField name="subscribe" component={CheckBox} label="Subscribe?" />
          <FormField
            name="ampm"
            component={RadioButtonGroup}
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
  </div>
);

storiesOf('Form', module).add('All', () => <Example />);
