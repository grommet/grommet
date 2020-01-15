import React, { useState } from 'react';
import { storiesOf } from '@storybook/react';
import { MnetUIBase, Box, FormField, TextInput } from 'mnet-ui-base';
import { mnet } from 'mnet-ui-base/themes';
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
    <MnetUIBase theme={mnet}>
      <Box align="center" pad="large">
        <FormField
          direction="row"
          label="Label"
          htmlFor="text-input"
          {...props}
        >
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
    </MnetUIBase>
  );
};

storiesOf('Form', module).add('TextInput', () => <FormFieldTextInput />);
