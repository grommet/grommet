import React, { Component } from 'react';
import { storiesOf } from '@storybook/react';

import TextInput from '../TextInput/TextInput';
import Grommet from '../Grommet/Grommet';
import { grommet } from '../../themes';

class SimpleTextInput extends Component {
  state = { value: '' }

  ref = React.createRef()

  onChange = event => this.setState({ value: event.target.value })

  render() {
    const { value } = this.state;
    return (
      <Grommet theme={grommet}>
        <TextInput ref={this.ref} value={value} onChange={this.onChange} />
      </Grommet>
    );
  }
}

const suggestions = Array(10).fill().map((_, i) => `suggestion ${i + 1}`);

class SuggestionsTextInput extends Component {
  state = { value: '' }

  onChange = event => this.setState({ value: event.target.value })

  onSelect = event => this.setState({ value: event.suggestion })

  render() {
    const { value } = this.state;
    return (
      <Grommet theme={grommet}>
        <TextInput
          value={value}
          onChange={this.onChange}
          onSelect={this.onSelect}
          suggestions={suggestions}
        />
      </Grommet>
    );
  }
}

storiesOf('TextInput', module)
  .add('Simple TextInput', () => <SimpleTextInput />)
  .add('Suggestions TextInput', () => <SuggestionsTextInput />);
