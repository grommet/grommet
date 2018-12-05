import React from 'react';
import { storiesOf } from '@storybook/react';

import {
  Box,
  Button,
  Grommet,
  Form,
  // FormContext,
  FormField,
  RadioButton,
  Select,
  TextArea,
} from 'grommet';
import { grommet } from 'grommet/themes';

const RadioButtonGroup = ({ name, onChange, options, value }) => (
  <Box margin={{ bottom: 'small' }}>
    {options.map(option => (
      <Box key={option} pad={{ horizontal: 'small', vertical: 'xsmall' }}>
        <RadioButton
          name={name}
          value={option}
          label={option}
          checked={value === option}
          onChange={() => onChange({ value: option })}
        />
      </Box>
    ))}
  </Box>
);

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
          <FormField
            name="ampm"
            component={RadioButtonGroup}
            options={['morning', 'evening']}
          />
          <FormField
            label="Size"
            name="size"
            component={Select}
            options={['small', 'medium', 'large', 'xlarge']}
          />
          <FormField label="Comments" name="comments" component={TextArea} />
          {/* }
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
          { */}
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
