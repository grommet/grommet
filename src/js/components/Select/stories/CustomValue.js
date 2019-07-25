import React, { Component } from 'react';
import { storiesOf } from '@storybook/react';

import { CaretDown } from 'grommet-icons';

import { Box, Grommet, Select } from 'grommet';
import { grommet } from 'grommet/themes';

class CustomSelectValue extends Component {
  state = {
    options: ['one', 'two'],
    value: undefined,
  };

  render() {
    const { options, value } = this.state;
    return (
      <Grommet full theme={grommet}>
        <Box fill align="center" justify="start" pad="large">
          <Select
            id="select"
            name="select"
            placeholder="Select"
            value={value}
            options={options}
            onChange={({ option }) => this.setState({ value: option })}
            plain
            valueLabel={
              <Box
                background="brand"
                width="small"
                round="small"
                overflow="hidden"
                align="center"
              >
                {value || 'Select...'}
              </Box>
            }
            icon={false}
            {...this.props}
          />
        </Box>
      </Grommet>
    );
  }
}

storiesOf('Select', module)
  .add('Custom Value', () => <CustomSelectValue />)
  .add('Custom Icon', () => (
    <CustomSelectValue
      icon={
        <Box>
          <CaretDown color="black" />
        </Box>
      }
    />
  ));
