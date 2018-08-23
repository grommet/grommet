import React, { Component } from 'react';
import { storiesOf } from '@storybook/react';

import { Box, Grommet, Text } from '../';
import { grommet } from '../../themes';

const sizes = ['xxlarge', 'xlarge', 'large', 'medium', 'small', 'xsmall'];

class All extends Component {
  render() {
    return (
      <Grommet theme={grommet}>
        {sizes.map(size => (
          <Box margin='small'>
            <Text size={size}>
              {`Text ${size}`}
            </Text>
          </Box>
        ))}
      </Grommet>
    );
  }
}

storiesOf('Text', module)
  .add('All', () => <All />);
