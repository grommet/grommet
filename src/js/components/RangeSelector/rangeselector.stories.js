import React, { Component } from 'react';
import { storiesOf } from '@storybook/react';

import { Grommet, Box, RangeSelector, Stack, Text } from 'grommet';
import { grommet } from 'grommet/themes';

class SimpleRangeSelector extends Component {
  state = { values: [2, 8] };

  onChange = values => this.setState({ values });

  render() {
    const { values } = this.state;
    return (
      <Grommet theme={grommet}>
        <Stack>
          <Box direction="row" justify="between">
            {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map(value => (
              <Box key={value} pad="small" border={false}>
                <Text style={{ fontFamily: 'monospace' }}>{value}</Text>
              </Box>
            ))}
          </Box>
          <RangeSelector direction="horizontal" invert={false} min={0} max={9} size="full" round="small" values={values} onChange={this.onChange} />
        </Stack>
      </Grommet>
    );
  }
}

storiesOf('RangeSelector', module).add('Simple RangeSelector', () => <SimpleRangeSelector />);
