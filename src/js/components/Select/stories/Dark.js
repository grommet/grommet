import React, { Component } from 'react';
import { storiesOf } from '@storybook/react';

import { Box, Grommet, Select } from 'grommet';
import { grommet } from 'grommet/themes';

class DarkSelect extends Component {
  state = {
    options: ['one', 'two'],
    value: '',
  };

  render() {
    const { options, value } = this.state;
    return (
      <Grommet full theme={grommet} {...this.props}>
        <Box fill background="dark-1" align="center" justify="center">
          <Select
            placeholder="Select"
            value={value}
            options={options}
            onChange={({ option }) => this.setState({ value: option })}
          />
        </Box>
      </Grommet>
    );
  }
}

storiesOf('Select', module).add('Dark', () => <DarkSelect />);
