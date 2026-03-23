import React, { useState } from 'react';

import { Box, Button, Form, FormField } from 'grommet';
import { TextInput } from '../../TextInput';

export const ValidateOnMount = () => {
  const defaultValue = {
    firstName: 'J',
    lastName: '',
  };

  const [valid, setValid] = useState(false);
  const [value, setValue] = useState(defaultValue);

  return (
    // Uncomment <Grommet> lines when using outside of storybook
    // <Grommet theme={...}>
    <Box fill align="center" justify="center">
      <Box width="medium">
        <Form
          value={value}
          validate="change"
          onReset={(event) => console.log(event)}
          onChange={(nextValue, { touched }) => {
            console.log('Change', nextValue, touched);
            setValue(nextValue);
          }}
          onValidate={(validationResults) => {
            console.log('validationResults = ', validationResults);
            setValid(validationResults.valid);
          }}
        >
          <FormField
            label="First Name"
            htmlFor="firstName"
            name="firstName"
            required
            validate={[
              { regexp: /^[a-z]/i },
              (firstName) => {
                if (firstName && firstName.length === 1)
                  return 'must be >1 character';
                return undefined;
              },
            ]}
          >
            <TextInput aria-required id="firstName" name="firstName" />
          </FormField>
          <FormField
            label="Last Name"
            htmlFor="lastName"
            name="lastName"
            required
            validate={[
              { regexp: /^[a-z]/i },
              (lastName) => {
                if (lastName && lastName.length === 1)
                  return 'must be >1 character';
                return undefined;
              },
            ]}
          >
            <TextInput aria-required id="lastName" name="lastName" />
          </FormField>
          <Box direction="row" justify="between" margin={{ top: 'medium' }}>
            <Button label="Cancel" />
            <Button type="reset" label="Reset" />
            <Button type="submit" label="Update" disabled={!valid} primary />
          </Box>
        </Form>
      </Box>
    </Box>
    // </Grommet>
  );
};

ValidateOnMount.storyName = 'Validate on mount';

ValidateOnMount.args = {
  full: true,
};

export default {
  title: 'Input/Form/Validate on mount',
};
