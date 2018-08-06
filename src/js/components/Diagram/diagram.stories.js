import React, { Component } from 'react';
import { storiesOf } from '@storybook/react';

import Diagram from '../Diagram/Diagram';
import Box from '../Box/Box';
import Stack from '../Stack/Stack';
import Grommet from '../Grommet/Grommet';
import { grommet } from '../../themes';

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
  anchor: 'vertical',
  color: (color || 'accent-1'),
  thickness: 'xsmall',
  round: true,
  type: 'rectilinear',
  ...rest,
});

class SimpleDiagram extends Component {
  render() {
    return (
      <Grommet theme={grommet}>
        <Stack>
          <Box>
            <Box direction='row'>
              {[1, 2, 3].map(id => (
                <Node key={id} id={id} />
              ))}
            </Box>
            <Box direction='row'>
              {[4, 5].map(id => (
                <Node key={id} id={id} background='neutral-2' />
              ))}
            </Box>
          </Box>
          <Diagram
            connections={[
              connection('1', '5', { color: 'accent-2' }),
              connection('3', '5', { color: 'accent-2', anchor: 'horizontal' }),
            ]}
          />
        </Stack>
      </Grommet>
    );
  }
}

storiesOf('Diagram', module)
  .add('Simple Diagram', () => <SimpleDiagram />);
