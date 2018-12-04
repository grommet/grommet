import React from 'react';
import { storiesOf } from '@storybook/react';

import {
  Box,
  Button,
  Grommet,
  Form,
  FormContext,
  FormField,
  TextArea,
} from 'grommet';
import { grommet } from 'grommet/themes';

const Example = () => (
  <Grommet full theme={grommet}>
    <Box fill align="center" justify="center">
      <Box width="medium">
        <Form onSubmit={event => console.log('Submit', event.value)}>
          <FormField label="Name" name="name" required />
          <FormField label="Email" name="email" type="email" required />
          <FormField
            label="Employee ID"
            name="employeeId"
            required
            validate={{ regexp: /^[0-9]{4,6}$/, message: '4-6 digits' }}
          />
          <FormField name="ampm" options={['am', 'pm']} />
          <FormField
            label="Size"
            name="size"
            options={['small', 'medium', 'large', 'xlarge']}
          />
          <FormField label="Comments" name="comments">
            <FormContext.Consumer>
              {({ value, update }) => (
                <TextArea
                  plain
                  focusIndicator={false}
                  value={value.comments}
                  onChange={event => update('comments', event.target.value)}
                />
              )}
            </FormContext.Consumer>
          </FormField>
          <Box direction="row" justify="between" margin={{ top: 'medium' }}>
            <Button label="Cancel" />
            <Button type="submit" label="Update" primary />
          </Box>
        </Form>
      </Box>
    </Box>
  </Grommet>
);

storiesOf('Form', module).add('All', () => <Example />);
