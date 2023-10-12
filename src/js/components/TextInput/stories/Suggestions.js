import React from 'react';

import { Box, TextInput } from 'grommet';

const allSuggestions = Array(100)
  .fill()
  .map((_, i) => `${i + 1} suggestion`);

export const Suggestions = () => {
  const [suggestions, setSuggestions] = React.useState(allSuggestions);
  const [value, setValue] = React.useState('');

  const onChange = (event) => {
    const nextValue = event.target.value;
    setValue(nextValue);
    if (!nextValue) setSuggestions(allSuggestions);
    else {
      const regexp = new RegExp(`^${nextValue}`);
      setSuggestions(allSuggestions.filter((s) => regexp.test(s)));
    }
  };

  const onSuggestionSelect = (event) => {
    setValue(event.suggestion);
  };

  return (
    // Uncomment <Grommet> lines when using outside of storybook
    // <Grommet theme={...}>
    <Box fill align="center" justify="start" pad="large">
      <Box width="medium">
        <TextInput
          id="grommet-text-combobox"
          value={value}
          onChange={onChange}
          onSuggestionSelect={onSuggestionSelect}
          suggestions={suggestions}
          aria-label="Input Text"
        />
      </Box>
    </Box>
    // </Grommet>
  );
};

Suggestions.parameters = {
  chromatic: { disable: true },
};

export default {
  title: 'Input/TextInput/Suggestions',
};
