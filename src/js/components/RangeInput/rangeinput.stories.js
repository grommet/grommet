import React, { Component } from 'react';
import { storiesOf } from '@storybook/react';

import { Box, Grommet, RangeInput } from 'grommet';
import { grommet } from 'grommet/themes';
import { deepMerge } from 'grommet/utils';

import { Volume } from 'grommet-icons';

class SimpleRangeInput extends Component {
  state = { value: 5 };

  onChange = event => this.setState({ value: event.target.value });

  render() {
    const { value } = this.state;
    return (
      <Grommet theme={grommet}>
        <Box align="center" pad="large">
          <RangeInput value={value} onChange={this.onChange} />
        </Box>
      </Grommet>
    );
  }
}

const customThemeRangeInput = deepMerge(grommet, {
  global: {
    spacing: '12px',
  },
  rangeInput: {
    track: {
      color: 'accent-2',
      height: '12px',
      extend: () => `border-radius: 10px`,
    },
    thumb: {
      color: 'neutral-2',
    },
  },
});

class CustomRangeInput extends Component {
  state = { value: 0.4 };

  onChange = event => this.setState({ value: event.target.value });

  render() {
    const { value } = this.state;
    return (
      <Grommet theme={customThemeRangeInput}>
        <Box direction="row" align="center" pad="large" gap="small">
          <Volume color="neutral-2" />
          <Box align="center" width="small">
            <RangeInput
              min={0}
              max={1}
              step={0.1}
              value={value}
              onChange={this.onChange}
            />
          </Box>
        </Box>
      </Grommet>
    );
  }
}

storiesOf('RangeInput', module)
  .add('Simple', () => <SimpleRangeInput />)
  .add('Custom', () => <CustomRangeInput />);
