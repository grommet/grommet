import React, { Component } from 'react';
import { storiesOf } from '@storybook/react';

import { Grommet, Box, RangeSelector, Stack, Text } from 'grommet';
import { grommet } from 'grommet/themes';
import { deepMerge } from 'grommet/utils';

const customThemeRangeSelector = deepMerge(grommet, {
  global: {
    borderSize: {
      small: '6px',
    },
    edgeSize: {
      small: '13px',
    },
    spacing: '10px',
    colors: {
      control: 'accent-2',
      border: 'brand',
    },
  },
  rangeSelector: {
    background: {
      invert: {
        color: 'brand',
      },
    },
    edge: {
      type: 'bar',
    },
  },
});
class CustomRangeSelector extends Component {
  static defaultProps = {
    direction: 'horizontal',
  };

  state = { values: [12, 16] };

  onChange = values => this.setState({ values });

  render() {
    const { direction, ...rest } = this.props;
    const { values } = this.state;
    return (
      <Grommet theme={customThemeRangeSelector}>
        <Box align="center" pad="large">
          <Stack>
            <Box
              direction={direction === 'vertical' ? 'column' : 'row'}
              justify="between"
            >
              {[10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20].map(value => (
                <Box
                  key={value}
                  width="xxsmall"
                  height="xxsmall"
                  align="center"
                  pad="small"
                  border={false}
                >
                  <Text style={{ fontFamily: 'monospace' }}>{value}</Text>
                </Box>
              ))}
            </Box>
            <RangeSelector
              invert
              direction={direction}
              min={10}
              max={20}
              size="full"
              values={values}
              onChange={this.onChange}
              {...rest}
            />
          </Stack>
        </Box>
      </Grommet>
    );
  }
}

storiesOf('RangeSelector', module).add('Custom', () => <CustomRangeSelector />);
