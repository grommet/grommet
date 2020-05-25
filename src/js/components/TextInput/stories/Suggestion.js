import React from 'react';
import { storiesOf } from '@storybook/react';

import { Box, MnetUIBase, TextInput } from 'mnet-ui-base';
import { mnet } from 'mnet-ui-base/themes';

const suggestions = Array(100)
  .fill()
  .map((_, i) => `suggestion ${i + 1}`);

const SuggestionsTextInput = () => {
  const [value, setValue] = React.useState('');

  const onChange = event => setValue(event.target.value);

  const onSelect = event => setValue(event.suggestion);

  return (
    <MnetUIBase full theme={mnet}>
      <Box fill align="center" justify="start" pad="large">
        <Box width="medium">
          <TextInput
            value={value}
            onChange={onChange}
            onSelect={onSelect}
            suggestions={suggestions}
          />
        </Box>
      </Box>
    </MnetUIBase>
  );
};

storiesOf('TextInput', module).add('Suggestions', () => (
  <SuggestionsTextInput />
));
