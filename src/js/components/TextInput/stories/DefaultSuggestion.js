import React from 'react';

import { Box, Grommet, TextInput } from 'grommet';
import { grommet } from 'grommet/themes';

const suggestions = Array(100)
  .fill()
  .map((_, i) => `suggestion ${i + 1}`);

export const DefaultSuggestion = () => {
  const [value, setValue] = React.useState('');

  const onChange = event => setValue(event.target.value);

  const onSelect = event => setValue(event.suggestion);

  return (
    <Grommet full theme={grommet}>
      <Box fill align="center" justify="start" pad="large">
        <Box width="medium">
          <TextInput
            value={value}
            onChange={onChange}
            onSelect={onSelect}
            suggestions={suggestions}
            defaultSuggestion={1}
          />
        </Box>
      </Box>
    </Grommet>
  );
};

DefaultSuggestion.storyName = 'Default suggestion';

DefaultSuggestion.parameters = {
  chromatic: { disable: true },
};

export default {
  title: 'Input/TextInput/Default suggestion',
};
