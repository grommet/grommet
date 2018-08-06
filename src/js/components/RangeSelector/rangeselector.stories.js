import React, { Component } from 'react';
import { storiesOf } from '@storybook/react';

import RangeSelector from '../RangeSelector/RangeSelector';
import Stack from '../Stack/Stack';
import Box from '../Box/Box';
import Text from '../Text/Text';
import Grommet from '../Grommet/Grommet';
import { grommet } from '../../themes';

class SimpleRangeSelector extends Component {
  state = { values: [2, 8] }

  onChange = values => this.setState({ values })

  render() {
    const { values } = this.state;
    return (
      <Grommet theme={grommet}>
        <Stack>
          <Box direction='row' justify='between'>
            {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map(value => (
              <Box key={value} pad='small' border={false}>
                <Text style={{ fontFamily: 'monospace' }}>{value}</Text>
              </Box>
            ))}
          </Box>
          <RangeSelector
            direction='horizontal'
            invert={false}
            min={0}
            max={9}
            size='full'
            round='small'
            values={values}
            onChange={this.onChange}
          />
        </Stack>
      </Grommet>
    );
  }
}

storiesOf('RangeSelector', module)
  .add('Simple RangeSelector', () => <SimpleRangeSelector />);
