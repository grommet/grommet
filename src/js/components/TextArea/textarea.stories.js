import React, { Component } from 'react';
import { storiesOf } from '@storybook/react';

import { Grommet, TextArea } from 'grommet';
import { grommet } from 'grommet/themes';

class SimpleTextArea extends Component {
  state = { value: '' }

  onChange = event => this.setState({ value: event.target.value })

  render() {
    const { value } = this.state;
    return (
      <Grommet theme={grommet}>
        <TextArea value={value} onChange={this.onChange} />
      </Grommet>
    );
  }
}

storiesOf('TextArea', module)
  .add('Simple TextArea', () => <SimpleTextArea />);
