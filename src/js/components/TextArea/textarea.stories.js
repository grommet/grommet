import React, { Component } from 'react';
import { storiesOf } from '@storybook/react';

import TextArea from '../TextArea/TextArea';
import Grommet from '../Grommet/Grommet';

class SimpleTextArea extends Component {
  state = { value: '' }

  onChange = event => this.setState({ value: event.target.value })

  render() {
    const { value } = this.state;
    return (
      <Grommet>
        <TextArea value={value} onChange={this.onChange} />
      </Grommet>
    );
  }
}

class FocusedTextArea extends Component {
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
        <TextArea ref={this.ref} value={value} onChange={this.onChange} />
      </Grommet>
    );
  }
}

storiesOf('TextArea', module)
  .add('Simple TextArea', () => <SimpleTextArea />)
  .add('Focused TextArea', () => <FocusedTextArea />);
