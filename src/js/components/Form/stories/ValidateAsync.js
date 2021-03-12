import React from 'react';

import { Box, Button, Grommet, Form, FormField, TextInput } from 'grommet';
import { grommet } from 'grommet/themes';

export const ValidateAsync = () => {
  const [valid, setValid] = React.useState();
  return (
    <Grommet full theme={grommet}>
      <Box fill align="center" justify="center">
        <Box width="medium">
          <Form
            validate="change"
            onValidate={({ valid: nextValid }) => setValid(nextValid)}
            onReset={event => console.log(event)}
            onSubmit={({ value }) => console.log('Submit', value)}
          >
            <FormField
              label="Name"
              name="name"
              required
              validate={[
                { regexp: /^[a-z]/i },
                value => {
                  const controller = new AbortController();
                  const { abort, signal } = controller;
                  return {
                    abort,
                    promise: fetch(
                      `https://corporatebs-generator.sameerkumar.website/?${value}`,
                      { signal },
                    )
                      .then(response => response.json())
                      .then(obj =>
                        value.length % 2 === 0
                          ? { message: obj.phrase, status: 'info' }
                          : obj.phrase,
                      )
                      .catch(() => console.log('!!! catch')),
                  };
                },
              ]}
            >
              <TextInput name="name" />
            </FormField>

            <FormField
              label="Email"
              name="email"
              required
              validate={{ regexp: /^[a-z]+@[a-z]+/i }}
            >
              <TextInput name="email" />
            </FormField>

            <Box direction="row" justify="between" margin={{ top: 'medium' }}>
              <Button label="Cancel" />
              <Button type="reset" label="Reset" />
              <Button type="submit" label="Update" primary disabled={!valid} />
            </Box>
          </Form>
        </Box>
      </Box>
    </Grommet>
  );
};

ValidateAsync.storyName = 'Validate async';

ValidateAsync.parameters = {
  chromatic: { disable: true },
};

export default {
  title: 'Input/Form/Validate async',
};
