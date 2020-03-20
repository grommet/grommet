import React from 'react';
import { storiesOf } from '@storybook/react';

import { Box, Grommet, TextInput } from 'grommet';
import { grommet } from 'grommet/themes';
import { deepMerge } from 'grommet/utils';

const suggestions = Array(100)
  .fill()
  .map((_, i) => `suggestion ${i + 1}`);

const customTheme = deepMerge(grommet, {
  textInput: {
    extend: () => `
      font-size: 20px;
      background: #c9c19f;
      width: 300px;
      margin: 0 auto;
      
      &:focus {
        box-shadow: none;
        border-color: initial;
      }
    `,
    container: {
      extend: () => `
        background: #edf7d2;
        height: 100px;
        width: 400px;
        display: flex;
        flex-flow: column;
        justify-content: center;
        border-radius: 10px;
      `,
    },
    placeholder: {
      extend: () => `
        width: 100%;
        color: #1e1a11;
      `,
    },
    suggestions: {
      extend: () => `
        background: #c9c19f;
        color: #3d3522;
        li {
          border-bottom: 1px solid rgba(0, 0, 0, 0.2);
        }
      `,
    },
  },
});

const ThemedTextInput = () => {
  const [value, setValue] = React.useState('');

  const onChange = event => setValue(event.target.value);

  const onSelect = event => setValue(event.suggestion);

  return (
    <Grommet full theme={customTheme}>
      <Box fill align="center" justify="start" pad="large">
        <Box width="medium">
          <TextInput
            type="password"
            value={value}
            dropProps={{ height: 'small' }}
            onChange={onChange}
            onSelect={onSelect}
            suggestions={suggestions}
            placeholder={<span>Enter something...</span>}
          />
        </Box>
      </Box>
    </Grommet>
  );
};

storiesOf('TextInput', module).add('Themed', () => <ThemedTextInput />);
