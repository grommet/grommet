import React, { Component } from 'react';
import { storiesOf } from '@storybook/react';
import { Box, Grommet, MaskedInput } from 'grommet';
import { grommet } from 'grommet/themes';

class PhoneMaskedInput extends Component {
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
                { fixed: '(' },
                {
                  length: 3,
                  regexp: /^[0-9]{1,3}$/,
                  placeholder: 'xxx',
                },
                { fixed: ')' },
                { fixed: ' ' },
                {
                  length: 3,
                  regexp: /^[0-9]{1,3}$/,
                  placeholder: 'xxx',
                },
                { fixed: '-' },
                {
                  length: 4,
                  regexp: /^[0-9]{1,4}$/,
                  placeholder: 'xxxx',
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

storiesOf('MaskedInput', module).add('Phone', () => <PhoneMaskedInput />);
