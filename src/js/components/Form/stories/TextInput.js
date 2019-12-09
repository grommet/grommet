import React, { useState } from 'react';
import { storiesOf } from '@storybook/react';
import { Grommet, Box, FormField, TextInput } from 'grommet';
import { grommet } from 'grommet/themes';
import { allSuggestions } from './data';

const FormFieldTextInput = props => {
  const [state, setState] = useState({
    value: '',
    suggestions: allSuggestions,
  });

  const onChange = event => {
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
    const suggestions = allSuggestions.filter(s => exp.test(s));
    setState({ value, suggestions });
  };

  const onSelect = event => setState({ ...state, value: event.suggestion });

  return (
    <Grommet theme={grommet}>
      <Box align="center" pad="large">
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
      </Box>
    </Grommet>
  );
};

storiesOf('Form', module).add('TextInput', () => <FormFieldTextInput />);
