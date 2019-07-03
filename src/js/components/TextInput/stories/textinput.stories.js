import React, { Component, useState } from 'react';
import { storiesOf } from '@storybook/react';
import { FormLock, View } from 'grommet-icons';

import { Box, Grommet, TextInput, Button } from 'grommet';
import { grommet } from 'grommet/themes';
import { deepMerge } from 'grommet/utils';

class SimpleTextInput extends Component {
  state = { value: '' };

  ref = React.createRef();

  onChange = event => this.setState({ value: event.target.value });

  render() {
    const { value } = this.state;
    return (
      <Grommet full theme={grommet}>
        <Box fill align="center" justify="start" pad="large">
          <Box width="medium">
            <TextInput ref={this.ref} value={value} onChange={this.onChange} />
          </Box>
        </Box>
      </Grommet>
    );
  }
}

const PasswordInput = ({ value, ...rest }) => {
  const [inputValue, setValue] = useState(value);
  const [reveal, setReveal] = useState(false);
  return (
    <Box
      width="medium"
      direction="row"
      margin="large"
      align="center"
      round="small"
      border
    >
      <TextInput
        plain
        type={reveal ? 'text' : 'password'}
        value={inputValue}
        onChange={event => setValue(event.target.value)}
        {...rest}
      />
      <Button
        icon={reveal ? <View size="medium" /> : <FormLock size="medium" />}
        onClick={() => setReveal(!reveal)}
      />
    </Box>
  );
};

const suggestions = Array(100)
  .fill()
  .map((_, i) => `suggestion ${i + 1}`);

class SuggestionsTextInput extends Component {
  state = { value: '' };

  onChange = event => this.setState({ value: event.target.value });

  onSelect = event => this.setState({ value: event.suggestion });

  render() {
    const { value } = this.state;
    return (
      <Grommet full theme={grommet}>
        <Box fill align="center" justify="start" pad="large">
          <Box width="medium">
            <TextInput
              value={value}
              dropProps={{ height: 'small' }}
              onChange={this.onChange}
              onSelect={this.onSelect}
              suggestions={suggestions}
            />
          </Box>
        </Box>
      </Grommet>
    );
  }
}

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

class ThemedTextInput extends Component {
  state = { value: '' };

  onChange = event => this.setState({ value: event.target.value });

  onSelect = event => this.setState({ value: event.suggestion });

  render() {
    const { value } = this.state;
    return (
      <Grommet full theme={customTheme}>
        <Box fill align="center" justify="start" pad="large">
          <Box width="medium">
            <TextInput
              type="password"
              value={value}
              dropProps={{ height: 'small' }}
              onChange={this.onChange}
              onSelect={this.onSelect}
              suggestions={suggestions}
              placeholder={<span>Enter something...</span>}
            />
          </Box>
        </Box>
      </Grommet>
    );
  }
}

storiesOf('TextInput', module)
  .add('Simple TextInput', () => <SimpleTextInput />)
  .add('Password input', () => <PasswordInput />)
  .add('Suggestions', () => <SuggestionsTextInput />)
  .add('Themed', () => <ThemedTextInput />);
