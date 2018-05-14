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
    setTimeout(() => { this.ref.current.focus(); }, 0);
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

storiesOf('TextInput', module)
  .add('Simple TextInput', () => <SimpleTextInput />)
  .add('Focused TextInput', () => <FocusedTextInput />);
