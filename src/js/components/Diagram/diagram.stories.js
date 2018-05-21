import React, { Component } from 'react';
import { storiesOf } from '@storybook/react';

import Diagram from '../Diagram/Diagram';
import Box from '../Box/Box';
import Stack from '../Stack/Stack';
import Grommet from '../Grommet/Grommet';

const Node = ({ id, ...rest }) => (
  <Box
    id={id}
    basis='xxsmall'
    margin='small'
    pad='medium'
    round='small'
    background='neutral-1'
    {...rest}
  />
);

const connection = (fromTarget, toTarget, { color, ...rest } = {}) => ({
  fromTarget,
  toTarget,
  color: (color || 'accent-1'),
  thickness: 'xsmall',
  round: true,
  type: 'rectilinear',
  ...rest,
});

class SimpleDiagram extends Component {
  render() {
    return (
      <Grommet>
        <Stack>
          <Box>
            <Box direction='row'>
              {[1, 2].map(id => (
                <Node key={id} id={id} />
              ))}
            </Box>
            <Box direction='row'>
              {[3, 4].map(id => (
                <Node key={id} id={id} background='neutral-2' />
              ))}
            </Box>
          </Box>
          <Diagram
            connections={[
              connection('1', '4', { color: 'accent-2' }),
            ]}
          />
        </Stack>
      </Grommet>
    );
  }
}

storiesOf('Diagram', module)
  .add('Simple Diagram', () => <SimpleDiagram />);
