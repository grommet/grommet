import React from 'react';
import { storiesOf } from '@storybook/react';

import { Box, Grommet, TextInput } from 'grommet';
import { grommet } from 'grommet/themes';

const suggestions = Array(100)
  .fill()
  .map((_, i) => `suggestion ${i + 1}`);

const SuggestionsTextInput = () => {
  const [value, setValue] = React.useState('');

  const onChange = event => setValue(event.target.value);

  const onSelect = event => setValue(event.suggestion);

  return (
    <Grommet full theme={grommet}>
      <Box fill align="center" justify="start" pad="large">
        <Box width="medium">
          <TextInput
            value={value}
            dropProps={{ height: 'small' }}
            onChange={onChange}
            onSelect={onSelect}
            suggestions={suggestions}
          />
        </Box>
      </Box>
    </Grommet>
  );
};

storiesOf('TextInput', module).add('Suggestions', () => (
  <SuggestionsTextInput />
));
