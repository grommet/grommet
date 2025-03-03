import React, { useState } from 'react';

import { Box, Button, CheckBox, Form, FormField, TextInput } from 'grommet';

export const DynamicFields = () => {
  const [haveAlias, setHaveAlias] = useState();
  return (
    // Uncomment <Grommet> lines when using outside of storybook
    // <Grommet theme={...}>
    <Box fill align="center" justify="center">
      <Box width="medium">
        <Form
          validate="blur"
          onReset={(event) => console.log(event)}
          onValidate={(event) => console.log('Validate', event)}
          onSubmit={({ value }) => console.log('Submit', value)}
        >
          <FormField htmlFor="name" label="Name" name="name" required>
            <TextInput aria-required id="name" name="name" />
          </FormField>
          <FormField htmlFor="havingAlias" name="haveAlias">
            <CheckBox
              name="haveAlias"
              id="havingAlias"
              label="alias?"
              checked={haveAlias}
              onChange={() => setHaveAlias(!haveAlias)}
            />
          </FormField>
          {haveAlias && (
            <FormField htmlFor="alias" label="Alias" name="alias" required>
              <TextInput id="alias" aria-required name="alias" />
            </FormField>
          )}
          <Box direction="row" justify="between" margin={{ top: 'medium' }}>
            <Button type="reset" label="Reset" />
            <Button type="submit" label="Update" primary />
          </Box>
        </Form>
      </Box>
    </Box>
    // </Grommet>
  );
};

DynamicFields.storyName = 'Dynamic fields';
DynamicFields.args = {
  full: true,
};

export default {
  title: 'Input/Form/Dynamic fields',
};
