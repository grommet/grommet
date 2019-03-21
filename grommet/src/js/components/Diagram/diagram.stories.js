import React from 'react';
import { storiesOf } from '@storybook/react';

import { Grommet, Box, Diagram, Stack } from 'grommet';
import { grommet } from 'grommet/themes';

const Node = ({ id, ...rest }) => (
  <Box
    id={id}
    basis="xxsmall"
    margin="small"
    pad="medium"
    round="small"
    background="neutral-1"
    {...rest}
  />
);

const connection = (fromTarget, toTarget, { color, ...rest } = {}) => ({
  fromTarget,
  toTarget,
  anchor: 'vertical',
  color: color || 'accent-1',
  thickness: 'xsmall',
  round: true,
  type: 'rectilinear',
  ...rest,
});

const fullTopRow = [1, 2, 3];
class SimpleDiagram extends React.Component {
  state = { topRow: fullTopRow.slice(0, 1) };

  componentDidMount() {
    this.timer = setInterval(() => {
      const { topRow } = this.state;
      this.setState({
        topRow: fullTopRow.slice(
          0,
          topRow.length < fullTopRow.length ? topRow.length + 1 : 1,
        ),
      });
    }, 2000);
  }

  render() {
    const { topRow } = this.state;
    const connections = [connection('1', '5', { color: 'accent-2' })];
    if (topRow.length >= 2) {
      connections.push(
        connection('1', '2', { color: 'accent-1', anchor: 'horizontal' }),
      );
    }
    if (topRow.length >= 3) {
      connections.push(
        connection('3', '5', { color: 'accent-2', anchor: 'horizontal' }),
      );
    }
    return (
      <Grommet theme={grommet}>
        <Box align="start" pad="large">
          <Stack>
            <Box>
              <Box direction="row">
                {topRow.map(id => (
                  <Node key={id} id={id} />
                ))}
              </Box>
              <Box direction="row">
                {[4, 5].map(id => (
                  <Node key={id} id={id} background="neutral-2" />
                ))}
              </Box>
            </Box>
            <Diagram connections={connections} />
          </Stack>
        </Box>
      </Grommet>
    );
  }
}

storiesOf('Diagram', module).add('Simple Diagram', () => <SimpleDiagram />);
