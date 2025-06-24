import React, { useReducer, useEffect } from 'react';

import { Box, Diagram, Stack, Text } from 'grommet';
import { Diamond } from 'grommet-icons';

import { data } from './data';

const connection = (fromTarget, toTarget, { ...rest } = {}) => ({
  fromTarget,
  toTarget,
  anchor: 'vertical',
  color: 'accent-4',
  thickness: 'xsmall',
  round: true,
  type: 'curved',
  ...rest,
});

const DiamondContainer = ({ carat, color, cut, align, id, name, textSize }) => (
  <Box
    align={align || 'center'}
    alignSelf="center"
    direction="row"
    gap="medium"
    key={id}
  >
    <Diamond id={id} size="xlarge" color="neutral-3" />
    <Box align={align}>
      <Text size="medium" weight="bold">
        {name}
      </Text>
      {carat && <Text size={textSize}> Carat: {carat} </Text>}
      {color && <Text size={textSize}> Color: {color} </Text>}
      {cut && <Text size={textSize}> Cut: {cut} </Text>}
    </Box>
  </Box>
);

const Container = ({ node, index }) => (
  <DiamondContainer
    carat={node.carat}
    color={node.color}
    cut={node.cut}
    id={index}
    key={node.name}
    name={node.name}
    textSize="small"
  />
);

export const Animated = () => {
  const reducer = (draw) => !draw;

  const [draw, toogleDraw] = useReducer(reducer, true);

  useEffect(() => {
    const timer = setInterval(() => {
      toogleDraw();
    }, 2000);
    return () => clearInterval(timer);
  }, [toogleDraw]);

  const connections = [];

  if (draw) {
    connections.push(connection('4', '1', { anchor: 'vertical' }));
    connections.push(connection('4', '2', { anchor: 'vertical' }));
    connections.push(connection('4', '3', { anchor: 'vertical' }));
  }

  return (
    // Uncomment <Grommet> lines when using outside of storybook
    // <Grommet theme={...}>
    <Box align="center">
      <Box pad="large">
        <Stack>
          <Box>
            <Box alignSelf="center" margin={{ bottom: 'large' }}>
              <Container node={data[0]} index={1} />
              <Box pad="small" />
              <Box
                id="4"
                width="xsmall"
                margin={{ bottom: 'large', top: 'xlarge' }}
              />
            </Box>
            <Box direction="row" gap="xlarge">
              {[2, 3].map((id) => (
                <Container key={id} node={data[id - 1]} index={id} />
              ))}
            </Box>
          </Box>
          <Diagram
            animation={{ type: 'draw', duration: 3000 }}
            connections={connections}
          />
        </Stack>
      </Box>
    </Box>
    // </Grommet>
  );
};

export default {
  title: 'Visualizations/Diagram/Animated',
};
