import React, { Component } from 'react';
import { storiesOf } from '@storybook/react';

import { Grommet, Box, TextArea } from 'grommet';
import { grommet } from 'grommet/themes';
import { deepMerge } from 'grommet/utils';

class SimpleTextArea extends Component {
  state = { value: '' };

  onChange = event => this.setState({ value: event.target.value });

  render() {
    const { value } = this.state;
    return (
      <Grommet theme={grommet}>
        <Box align="center" pad="large">
          <TextArea value={value} onChange={this.onChange} {...this.props} />
        </Box>
      </Grommet>
    );
  }
}

const customTheme = deepMerge(grommet, {
  textArea: {
    extend: () => `
      font-size: 40px;
      color: red;
    `,
  },
});

class ThemedTextArea extends Component {
  state = { value: '' };

  onChange = event => this.setState({ value: event.target.value });

  render() {
    const { value } = this.state;
    return (
      <Grommet theme={customTheme}>
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
  .add('Simple', () => <SimpleTextArea resize />)
  .add('Fill', () => <FillTextArea />)
  .add('Themed', () => <ThemedTextArea />)
  .add('Non resizable', () => <SimpleTextArea resize={false} />);
