import React, { useState } from 'react';

import { Box, Button, Grommet, Form, FormField } from 'grommet';
import { grommet } from 'grommet/themes';

export const ValidateOnMount = () => {
  const [valid, setValid] = useState(false);

  return (
    <Grommet full theme={grommet}>
      <Box fill align="center" justify="center">
        <Box width="medium">
          <Form
            validate="change"
            onReset={event => console.log(event)}
            onSubmit={({ value }) => console.log('Submit', value)}
            onValidate={validationResults => {
              console.log('validationResults = ', validationResults);
              setValid(validationResults.valid);
            }}
          >
            <FormField
              label="First Name"
              name="firstName"
              required
              validateOnMount
              validate={[
                { regexp: /^[a-z]/i },
                firstName => {
                  if (firstName && firstName.length === 1)
                    return 'must be >1 character';
                  return undefined;
                },
              ]}
            />

            <FormField
              label="Last Name"
              name="lastName"
              required
              validateOnMount
              validate={[
                { regexp: /^[a-z]/i },
                lastName => {
                  if (lastName && lastName.length === 1)
                    return 'must be >1 character';
                  return undefined;
                },
              ]}
            />

            <Box direction="row" justify="between" margin={{ top: 'medium' }}>
              <Button label="Cancel" />
              <Button type="reset" label="Reset" />
              <Button type="submit" label="Update" disabled={!valid} primary />
            </Box>
          </Form>
        </Box>
      </Box>
    </Grommet>
  );
};

ValidateOnMount.storyName = 'Validate on mount';

export default {
  title: 'Input/Form/Validate on mount',
};
