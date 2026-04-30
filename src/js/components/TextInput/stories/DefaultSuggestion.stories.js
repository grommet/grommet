import React from 'react';

import { Box, TextInput } from 'grommet';

const suggestions = Array(100)
  .fill()
  .map((_, i) => `suggestion ${i + 1}`);

const DefaultSuggestionExample = () => {
  const [value, setValue] = React.useState('');

  const onChange = (event) => setValue(event.target.value);

  const onSelect = (event) => setValue(event.suggestion);

  return (
    // Uncomment <Grommet> lines when using outside of storybook
    // <Grommet theme={...}>
    <Box fill align="center" justify="start" pad="large">
      <Box width="medium">
        <TextInput
          id="grommet-text-combobox-default-suggestion"
          value={value}
          onChange={onChange}
          onSelect={onSelect}
          suggestions={suggestions}
          defaultSuggestion={1}
          aria-label="Input Text"
        />
      </Box>
    </Box>
    // </Grommet>
  );
};

export const DefaultSuggestion = {
  name: 'Default suggestion',
  render: DefaultSuggestionExample,
  parameters: {
    chromatic: { disable: true },
  },
};

export default {
  title: 'Input/TextInput/Default suggestion',
};
