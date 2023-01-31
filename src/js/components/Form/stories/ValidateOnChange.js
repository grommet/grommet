import React, { useState } from 'react';

import { Box, Button, Form, FormField, Select } from 'grommet';

export const ValidateOnChange = () => {
  const [valid, setValid] = useState(false);

  return (
    // Uncomment <Grommet> lines when using outside of storybook
    // <Grommet theme={...}>
    <Box fill align="center" justify="center">
      <Box width="medium">
        <Form
          validate="change"
          onReset={(event) => console.log(event)}
          onSubmit={({ value }) => console.log('Submit', value)}
          onValidate={(validationResults) => {
            console.log('validationResults = ', validationResults);
            setValid(validationResults.valid);
          }}
        >
          <FormField
            label="First Name"
            htmlFor="firstName"
            id="firstName"
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
          />

          <FormField
            label="Last Name"
            htmlFor="lastName"
            id="lastName"
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
          />
          <FormField
            label="Size"
            name="select-size"
            htmlFor="select-size"
            required
            validate={(val) => {
              if (val === 'small') {
                return { message: 'Only 10 left in stock!', status: 'info' };
              }
              return undefined;
            }}
          >
            <Select
              name="select-size"
              htmlFor="select-size"
              id="select-size"
              aria-label="select-size"
              options={['small', 'medium', 'large']}
            />
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

ValidateOnChange.storyName = 'Validate on change';

ValidateOnChange.args = {
  full: true,
};

export default {
  title: 'Input/Form/Validate on change',
};
