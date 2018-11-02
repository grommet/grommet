import React, { Component } from 'react';
import { storiesOf } from '@storybook/react';

import { Grommet, Box, TextArea } from 'grommet';
import { grommet } from 'grommet/themes';

class SimpleTextArea extends Component {
  state = { value: '' };

  onChange = event => this.setState({ value: event.target.value });

  render() {
    const { value } = this.state;
    return (
      <Grommet theme={grommet}>
        <TextArea value={value} onChange={this.onChange} {...this.props} />
      </Grommet>
    );
  }
}

class FillTextArea extends Component {
  state = { value: '' };

  onChange = event => this.setState({ value: event.target.value });

  render() {
    const { value } = this.state;
    return (
      <Grommet theme={grommet}>
        <Box
          width="large"
          height="medium"
          border={{ color: 'brand', size: 'medium' }}
        >
          <TextArea value={value} onChange={this.onChange} fill />
        </Box>
      </Grommet>
    );
  }
}

storiesOf('TextArea', module)
  .add('Simple', () => <SimpleTextArea />)
  .add('Fill', () => <FillTextArea />);
