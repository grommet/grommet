import React, { Component } from 'react';
import { storiesOf } from '@storybook/react';

import TextInput from '../TextInput/TextInput';
import Grommet from '../Grommet/Grommet';

class SimpleTextInput extends Component {
  state = { value: '' }

  onChange = event => this.setState({ value: event.target.value })

  render() {
    const { value } = this.state;
    return (
      <Grommet>
        <TextInput value={value} onChange={this.onChange} />
      </Grommet>
    );
  }
}

class FocusedTextInput extends Component {
  state = { value: '' }
  ref = React.createRef()

  componentDidMount() {
    this.ref.current.focus();
  }

  onChange = event => this.setState({ value: event.target.value })

  render() {
    const { value } = this.state;
    return (
      <Grommet>
        <TextInput ref={this.ref} value={value} onChange={this.onChange} />
      </Grommet>
    );
  }
}

class SuggestionsTextInput extends Component {
  state = { value: '' }

  onChange = event => this.setState({ value: event.target.value })

  onSelect = event => this.setState({ value: event.suggestion })

  render() {
    const { value } = this.state;
    return (
      <Grommet>
        <TextInput
          value={value}
          onChange={this.onChange}
          onSelect={this.onSelect}
          suggestions={['First', 'Second', 'Third']}
        />
      </Grommet>
    );
  }
}

storiesOf('TextInput', module)
  .add('Simple TextInput', () => <SimpleTextInput />)
  .add('Focused TextInput', () => <FocusedTextInput />)
  .add('Suggestions TextInput', () => <SuggestionsTextInput />);
