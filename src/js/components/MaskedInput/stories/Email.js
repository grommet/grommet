import React, { Component } from 'react';
import { storiesOf } from '@storybook/react';
import { Box, Grommet, MaskedInput } from 'grommet';
import { grommet } from 'grommet/themes';

class EmailMaskedInput extends Component {
  state = { value: '' };

  onChange = event => {
    this.setState({ value: event.target.value });
  };

  render() {
    const { value } = this.state;
    return (
      <Grommet full theme={grommet}>
        <Box fill align="center" justify="start" pad="large">
          <Box width="medium">
            <MaskedInput
              mask={[
                {
                  regexp: /^[\w\-_.]+$/,
                  placeholder: 'example',
                },
                { fixed: '@' },
                {
                  regexp: /^[\w]+$/,
                  placeholder: 'my',
                },
                { fixed: '.' },
                {
                  regexp: /^[\w]+$/,
                  placeholder: 'com',
                },
              ]}
              value={value}
              onChange={this.onChange}
            />
          </Box>
        </Box>
      </Grommet>
    );
  }
}

storiesOf('MaskedInput', module).add('Email', () => <EmailMaskedInput />);
