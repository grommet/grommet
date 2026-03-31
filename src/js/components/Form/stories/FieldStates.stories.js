import React, { useEffect, useRef } from 'react';

import { Box, Form, FormField, TextInput } from 'grommet';

export const FieldStates = () => {
  const inputRef = useRef();

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  return (
    // Uncomment <Grommet> lines when using outside of storybook
    // <Grommet theme={...}>
    <Box align="center" pad="large">
      <Form>
        <Box border gap="medium" pad="large" width="medium">
          <FormField htmlFor="enabled-id" name="enabled" label="Default">
            <TextInput
              id="enabled-id"
              name="enabled"
              placeholder="Enter a username"
            />
          </FormField>
          <FormField htmlFor="focus-id" name="focus" label="Focus State">
            <TextInput
              id="focus-id"
              name="focus"
              placeholder="Enter a username"
              ref={inputRef}
            />
          </FormField>
          <FormField
            htmlFor="info-id"
            name="info-demo"
            label="Info State"
            info="Unique name. No spaces. May include '-' as a separator."
          >
            <TextInput
              id="info-id"
              name="info-demo"
              placeholder="Enter a username"
              value="fluffyKi"
            />
          </FormField>
          <FormField
            htmlFor="error-id"
            name="error-demo"
            label="Error State"
            error="It looks like that username is already taken. Bummer."
          >
            <TextInput
              id="error-id"
              name="error-demo"
              placeholder="Enter a username"
              value="fluffyKitty123"
            />
          </FormField>
          <FormField
            htmlFor="disabled-id"
            name="disabled"
            label="Disabled State"
            disabled
          >
            <TextInput
              id="disabled-id"
              name="disabled"
              placeholder="Enter a username"
              disabled
            />
          </FormField>
        </Box>
      </Form>
    </Box>
    // </Grommet>
  );
};

FieldStates.storyName = 'Field states';

export default {
  title: 'Input/Form/Field states',
};
