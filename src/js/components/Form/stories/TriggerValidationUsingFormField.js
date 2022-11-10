import React from 'react';

import { StatusGood } from 'grommet-icons';
import { Box, Button, Form, FormField, Heading } from 'grommet';

export const TriggerValidationUsingFormField = () => (
  <Box fill align="center" justify="center">
    <Box width="medium">
      <Heading alignSelf="center" level="2">
        Validate On
      </Heading>
      <Form
        onReset={(event) => console.log(event)}
        onSubmit={({ value }) => console.log('Submit', value)}
      >
        <FormField
          label="Blur"
          name="blur"
          aria-label="blur"
          required
          validate={[
            { regexp: /^[a-z]/i },
            (name) => {
              if (name && name.length === 1) return 'must be >1 character';
              return undefined;
            },
            (name) => {
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
          validateOn="blur"
        />

        <FormField
          label="Submit"
          name="submit"
          aria-label="submit"
          required
          validate={[
            { regexp: /^[a-z]/i },
            (name) => {
              if (name && name.length === 1) return 'must be >1 character';
              return undefined;
            },
            (name) => {
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
          validateOn="submit"
        />

        <FormField
          label="Change"
          name="change"
          aria-label="change"
          required
          validate={[
            { regexp: /^[a-z]/i },
            (name) => {
              if (name && name.length === 1) return 'must be >1 character';
              return undefined;
            },
            (name) => {
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
          validateOn="change"
        />

        <Box direction="row" justify="between" margin={{ top: 'medium' }}>
          <Button label="Cancel" />
          <Button type="reset" label="Reset" />
          <Button type="submit" label="Update" primary />
        </Box>
      </Form>
    </Box>
  </Box>
);

TriggerValidationUsingFormField.storyName =
  'Trigger Validation using Form Field';

export default {
  title: 'Input/Form/Trigger Validation using Form Field',
};
