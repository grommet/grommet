import React, { useState } from 'react';

import {
  Box,
  Button,
  CheckBox,
  Form,
  FormField,
  Grommet,
  TextInput,
} from 'grommet';
import { grommet } from 'grommet/themes';

export const DynamicFields = () => {
  const [haveAlias, setHaveAlias] = useState();
  return (
    <Grommet full theme={grommet}>
      <Box fill align="center" justify="center">
        <Box width="medium">
          <Form
            validate="blur"
            onReset={event => console.log(event)}
            onValidate={event => console.log('Validate', event)}
            onSubmit={({ value }) => console.log('Submit', value)}
          >
            <FormField label="Name" name="name" required>
              <TextInput name="name" />
            </FormField>
            <FormField name="haveAlias">
              <CheckBox
                name="haveAlias"
                label="alias?"
                checked={haveAlias}
                onChange={() => setHaveAlias(!haveAlias)}
              />
            </FormField>
            {haveAlias && (
              <FormField label="Alias" name="alias" required>
                <TextInput name="alias" />
              </FormField>
            )}
            <Box direction="row" justify="between" margin={{ top: 'medium' }}>
              <Button type="reset" label="Reset" />
              <Button type="submit" label="Update" primary />
            </Box>
          </Form>
        </Box>
      </Box>
    </Grommet>
  );
};

DynamicFields.storyName = 'Dynamic fields';

export default {
  title: 'Input/Form/Dynamic fields',
};
