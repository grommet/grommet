import React, { useState } from 'react';

import { Box, Button, Form, FormField, TextInput } from 'grommet';

const allSuggestions = Array(100)
  .fill()
  .map((_, i) => `suggestion ${i + 1}`);

export const InsideFormField = (props) => {
  const [state, setState] = useState({
    value: '',
    suggestions: allSuggestions,
  });

  const onChange = (event) => {
    const {
      target: { value },
    } = event;
    // The line below escapes regular expression special characters:
    // [ \ ^ $ . | ? * + ( )
    const escapedText = value.replace(/[-\\^$*+?.()|[\]{}]/g, '\\$&');

    // Create the regular expression with modified value which
    // handles escaping special characters. Without escaping special
    // characters, errors will appear in the console
    const exp = new RegExp(escapedText, 'i');
    const suggestions = allSuggestions.filter((s) => exp.test(s));
    setState({ value, suggestions });
  };

  const onSelect = (event) => setState({ ...state, value: event.suggestion });

  return (
    // Uncomment <Grommet> lines when using outside of storybook
    // <Grommet theme={...}>
    <Box align="center" pad="large">
      <Form
        onSubmit={({ value: nextValue }) => {
          console.log(nextValue);
          setState({ value: '', suggestions: allSuggestions });
        }}
      >
        <FormField label="Label" htmlFor="text-input" {...props}>
          <TextInput
            id="text-input"
            placeholder="placeholder"
            value={state.value}
            onChange={onChange}
            onSelect={onSelect}
            suggestions={state.suggestions}
          />
        </FormField>
        <Button type="submit" label="submit" />
      </Form>
    </Box>
    // </Grommet>
  );
};

InsideFormField.storyName = 'Inside a FormField';

export default {
  title: 'Input/TextInput/Inside a FormField',
};
