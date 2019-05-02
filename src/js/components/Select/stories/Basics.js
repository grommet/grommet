import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { storiesOf } from '@storybook/react';

import { Box, Grommet, Select } from 'grommet';
import { grommet } from 'grommet/themes';
import { deepMerge } from 'grommet/utils';

const customRoundedTheme = deepMerge(grommet, {
  global: {
    control: {
      border: {
        radius: '24px',
      },
    },
    input: {
      weight: 400,
    },
    font: {
      size: '12px',
    },
  },
  text: {
    medium: '13px',
  },
  textInput: {
    extend: 'padding: 0 12px;',
  },
  select: {
    control: {
      extend: 'padding: 3px 6px;',
    },
  },
});

class SimpleSelect extends Component {
  static propTypes = {
    theme: PropTypes.shape({}),
  };

  static defaultProps = {
    theme: undefined,
  };

  state = {
    options: ['one', 'two'],
    value: '',
  };

  render() {
    const { theme, ...rest } = this.props;
    const { options, value } = this.state;
    return (
      <Grommet full theme={theme || grommet}>
        <Box fill align="center" justify="start" pad="large">
          <Select
            id="select"
            name="select"
            placeholder="Select"
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

const defaultOptions = [];
const objectOptions = [];
for (let i = 1; i <= 200; i += 1) {
  defaultOptions.push(`option ${i}`);
  objectOptions.push({
    lab: `option ${i}`,
    val: i,
    dis: i % 5 === 0,
    sel: i % 13 === 0,
  });
}

storiesOf('Select', module)
  .add('Simple', () => <SimpleSelect />)
  .add('Custom', () => <SimpleSelect open theme={customRoundedTheme} />);
