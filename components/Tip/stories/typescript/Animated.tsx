import React from 'react';

import { Box, Button, Tip } from 'grommet';
import { UserFemale, Info } from 'grommet-icons';

const Circle = ({ ...rest }) => (
  <Box
    animation={['fadeIn', 'pulse']} // double animation
    round="full"
    background="linear-gradient(102.77deg, #FD6FFF -9.18%, #ffdde2 209.09%)"
    {...rest}
  />
);

export const Animated = () => (
  // Uncomment <Grommet> lines when using outside of storybook
  // <Grommet theme={...}>
  <Box align="center" justify="center" fill background="dark-1" gap="medium">
    <Tip
      plain
      dropProps={{ align: { left: 'right' } }}
      content={
        <Box align="start" margin={{ bottom: 'xlarge' }} pad="xsmall">
          <Circle margin={{ left: 'large' }} pad="small">
            <Info color="brand" />
          </Circle>
          <Circle margin={{ left: 'medium' }} pad="small" />
          <Circle pad="xsmall" />
        </Box>
      }
    >
      <Button icon={<UserFemale color="light-1" size="large" />} />
    </Tip>
    Double animation of 'fadeIn' and 'pulse'
  </Box>
  // </Grommet>
);

Animated.parameters = {
  chromatic: { disable: true },
};

Animated.args = {
  full: true,
};

export default {
  title: 'Controls/Tip/Animated',
};
