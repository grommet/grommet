// SPDX-FileCopyrightText: © Hewlett Packard Enterprise Development LP
// SPDX-License-Identifier: Apache-2.0
import React from 'react';
import { FormField, Grommet, Form, TextInput, Box, grommet } from 'grommet';
import { deepMerge } from 'grommet/utils';

const content = {
  background: { light: '#fbfbfb', dark: 'black' },
  border: {
    color: { light: 'dodgerblue', dark: 'yellow' },
    side: 'all',
    size: 'xsmall',
    position: 'outer',
  },
  round: 'small',
};

const contentHover = {
  background: { light: '#ffffff', dark: '#202020' },
  border: {
    color: { light: 'blueviolet', dark: 'orange' },
  },
};

const error = {
  background: { light: '#ffe6e6', dark: '#660000' },
  border: {
    color: { light: 'red', dark: '#990000' },
  },
  hover: {
    background: { light: '#ffe6e6', dark: '#660000' },
    border: { color: { light: 'red', dark: '#990000' } },
  },
};

const customTheme = deepMerge(grommet, {
  global: {
    colors: {
      'background-back': {
        light: '#f0f0f0',
        dark: '#333333',
      },
    },
  },
  formField: {
    content: {
      ...content,
      hover: {
        ...contentHover,
      },
      error: {
        ...error,
      },
    },
  },
});

const PartsAndStates = () => {
  return (
    <Grommet theme={customTheme} full>
      <Box direction="row" fill>
        {['light', 'dark'].map((mode) => (
          <Box
            background={{ color: 'background-back', dark: mode === 'dark' }}
            pad="medium"
          >
            <Form>
              <Box width="medium">
                <FormFieldStory state={undefined} />
                <FormFieldStory state="error" />
              </Box>
            </Form>
          </Box>
        ))}
      </Box>
    </Grommet>
  );
};

const FormFieldStory = ({ state }) => {
  return (
    <FormField
      label="Text input"
      name="textInput"
      htmlFor="textInput"
      error={state === 'error' ? 'This field has an error' : undefined}
    >
      <TextInput id="textInput" name="textInput" placeholder="Enter text" />
    </FormField>
  );
};

export default {
  title: 'Input/FormField/Custom Themed/Parts And States',
  component: PartsAndStates,
};
export { PartsAndStates };
