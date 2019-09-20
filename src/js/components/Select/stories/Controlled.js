import React, { Component } from 'react';
import { storiesOf } from '@storybook/react';

import { Box, Grommet, Select, Button } from 'grommet';
import { grommet } from 'grommet/themes';

class SimpleSelect extends Component {
  state = {
    options: ['one', 'two'],
    value: '',
    open: false,
  };

  render() {
    const { theme, ...rest } = this.props;
    const { options, value, open } = this.state;
    return (
      <Grommet full theme={theme || grommet}>
        <Box fill align="center" justify="start" pad="large" gap="small">
          <Button
            onClick={() => this.setState({ open: !open })}
            label="Control the select"
          />
          <Select
            id="select"
            name="select"
            placeholder="Select"
            open={open}
            value={value}
            options={options}
            onChange={({ option }) => this.setState({ value: option })}
            {...rest}
          />
        </Box>
      </Grommet>
    );
  }
}

storiesOf('Select', module).add('Controlled', () => <SimpleSelect />);
