import React from 'react';

import { StatusGood } from 'grommet-icons';
import { Box, Button, Grommet, Form, FormField, TextInput } from 'grommet';
import { grommet } from 'grommet/themes';

export const ValidateOnChange = () => (
  <Grommet full theme={grommet}>
    <Box fill align="center" justify="center">
      <Box width="medium">
        <Form
          validate="change"
          onReset={event => console.log(event)}
          onSubmit={({ value }) => console.log('Submit', value)}
          onValidate={validationResults => {
            console.log('validationResults = ', validationResults);
          }}
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
                if (name === 'good')
                  return {
                    message: (
                      <Box align="end">
                        <StatusGood />
                      </Box>
                    ),
                    status: 'info',
                  };
                return undefined;
              },
            ]}
          />

          <FormField label="Address" name="address" required>
            <TextInput name="address" />
          </FormField>

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

ValidateOnChange.storyName = 'Validate on change';

export default {
  title: 'Input/Form/Validate on change',
};
