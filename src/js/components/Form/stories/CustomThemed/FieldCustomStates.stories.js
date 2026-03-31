import React, { useRef, useEffect } from 'react';

import { grommet, Box, Form, FormField, TextInput, Grommet } from 'grommet';
import { deepMerge } from 'grommet/utils';

const customTheme = deepMerge(grommet, {
  formField: {
    border: {
      error: {
        color: 'border',
      },
      color: 'border',
      side: 'all',
    },
    disabled: {
      background: {
        color: undefined,
      },
      border: {
        color: 'status-disabled',
      },
      label: {
        color: 'status-disabled',
      },
    },
    error: {
      background: {
        color: { light: '#FF404033', dark: '#FF40404D' },
      },
      size: 'xsmall',
      color: 'text-weak',
      margin: {
        start: 'none',
      },
    },
    help: {
      size: 'xsmall',
      color: 'text-weak',
      margin: {
        start: 'none',
        bottom: 'xsmall',
      },
    },
    info: {
      size: 'xsmall',
      color: 'text-weak',
      margin: {
        start: 'none',
      },
    },
    label: {
      size: 'xsmall',
      color: 'text-weak',
      margin: {
        horizontal: 'none',
      },
    },
    round: '4px',
  },
});

export const FieldCustomStates = () => {
  const inputRef = useRef();

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  return (
    <Grommet theme={customTheme}>
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
    </Grommet>
  );
};

FieldCustomStates.storyName = 'Field custom states';

export default {
  title: 'Input/Form/Custom Themed/Field custom states',
};
