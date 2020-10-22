import React from 'react';
import { storiesOf } from '@storybook/react';

import { grommet, Box, Button, Grommet } from 'grommet';
import { UserFemale, Info } from 'grommet-icons';
import { Tip } from '../../Tip';

const Circle = ({ ...rest }) => (
  <Box
    animation={['fadeIn', 'pulse']} // double animation
    round="full"
    background="linear-gradient(102.77deg, #FD6FFF -9.18%, #ffdde2 209.09%)"
    {...rest}
  />
);

const Example = () => {
  return (
    <Grommet full theme={grommet}>
      <Box
        align="center"
        justify="center"
        fill
        background="dark-1"
        gap="medium"
      >
        <Tip
          dropProps={{ align: { left: 'right' } }}
          content={
            <Box align="start" margin={{ bottom: 'xlarge' }} pad="xsmall">
              <Circle margin={{ left: 'large' }} pad="small">
                <Info color="accent-1" />
              </Circle>
              <Circle margin={{ left: 'medium' }} pad="small" />
              <Circle pad="xsmall" />
            </Box>
          }
        >
          <Button icon={<UserFemale color="accent-1" size="large" />} />
        </Tip>
        Animated Tooltip when hovering the lady
      </Box>
    </Grommet>
  );
};

storiesOf('Tip', module).add('Animated', () => <Example />, {
  chromatic: { disable: true },
});
