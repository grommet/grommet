import React, { useReducer, useEffect } from 'react';

import { Grommet, Box, Diagram, Stack, Text } from 'grommet';
import { grommet } from 'grommet/themes';

const Node = ({ id, ...rest }) => (
  <Box
    id={id}
    basis="xxsmall"
    margin="small"
    pad="medium"
    round="small"
    background="dark-3"
    {...rest}
  />
);

const connection = (fromTarget, toTarget, { color, ...rest } = {}) => ({
  fromTarget,
  toTarget,
  anchor: 'vertical',
  color,
  thickness: 'xsmall',
  round: true,
  type: 'rectilinear',
  ...rest,
});

const fullTopRow = [1, 2, 3];

export const Progressing = () => {
  const reducer = topRow => {
    const sliceEnd = topRow.length < fullTopRow.length ? topRow.length + 1 : 1;
    return fullTopRow.slice(0, sliceEnd);
  };

  const [topRow, dispatch] = useReducer(reducer, fullTopRow.slice(0, 1));

  useEffect(() => {
    const timer = setInterval(() => {
      dispatch();
    }, 2000);
    return () => clearInterval(timer);
  }, [dispatch]);

  const connections = [connection('1', '5')];

  if (topRow.length >= 2) {
    connections.push(connection('1', '2', { anchor: 'horizontal' }));
  }

  if (topRow.length >= 3) {
    connections.push(
      connection('3', '5', { anchor: 'horizontal', color: 'brand' }),
    );
  }

  return (
    <Grommet theme={grommet}>
      <Box align="start" pad="large">
        <Text> Adding and removing nodes</Text>
        <Stack>
          <Box>
            <Box direction="row">
              {topRow.map(id => (
                <Node key={id} id={id} />
              ))}
            </Box>
            <Box direction="row">
              {[4, 5].map(id => (
                <Node key={id} id={id} background="dark-2" />
              ))}
            </Box>
          </Box>
          <Diagram connections={connections} />
        </Stack>
      </Box>
    </Grommet>
  );
};
