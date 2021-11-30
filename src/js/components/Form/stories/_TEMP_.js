import React, { useState } from 'react';

import { Box, Button, Form, FormField, Grommet, TextInput } from 'grommet';

export const TEMP = () => {
  const [valid] = useState(false);
  const [value, setValue] = useState('a');

  return (
    <Grommet full>
      <Box fill align="center" justify="center">
        <Box width="medium">
          <Form validate="blur">
            <FormField
              label="First Name"
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
              <TextInput
                name="firstName"
                value={value}
                onChange={(e) => {
                  setValue(e.target.value);
                }}
              />
            </FormField>

            <Box direction="row" justify="between" margin={{ top: 'medium' }}>
              <Button label="Cancel" />
              <Button type="reset" label="Reset" />
              <Button type="submit" label="Update" disabled={!valid} primary />
            </Box>
          </Form>
          {/* <Form onSubmit={() => {}}>
            <FormField name="test" required placeholder="test input" />
            <Button type="submit" primary label="Submit" />
          </Form> */}
        </Box>
      </Box>
    </Grommet>
  );
};

export default {
  title: 'Input/Form/TEMP',
};
