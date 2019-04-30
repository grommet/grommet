import React, { Component, useState } from 'react';
import { storiesOf } from '@storybook/react';
import { FormLock, View } from 'grommet-icons';

import { Box, Grommet, TextInput, Button } from 'grommet';
import { grommet } from 'grommet/themes';

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
        icon={reveal ? <FormLock size="medium" /> : <View size="medium" />}
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

storiesOf('TextInput', module)
  .add('Simple TextInput', () => <SimpleTextInput />)
  .add('Password input', () => <PasswordInput />)
  .add('Suggestions TextInput', () => <SuggestionsTextInput />);
