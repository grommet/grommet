import React from 'react';
import { storiesOf } from '@storybook/react';

import { Box, Clock, Grommet, Text } from 'grommet';
import { grommet } from 'grommet/themes';

const SetTimeOnClock = () => (
  <Grommet theme={grommet}>
    <Box
      align="center"
      justify="center"
      pad="large"
      direction="row"
      gap="large"
    >
      <Box align="center" gap="large" border="right" pad="medium">
        <Text> explicit time - run backward </Text>
        <Clock time="T10:00:00" type="digital" run="backward" />
        <Clock time="2019-10-23T10:37:45" type="digital" run="backward" />
        <Clock time="PT10H37M45S" run="backward" type="digital" />
        <Clock time="T00:30:00" run="backward" />
      </Box>
      <Box align="center" gap="large">
        <Text> explicit time - run is default</Text>
        <Clock time="T10:00:00" type="digital" />
        <Clock time="PT10H37M45S" type="digital" />
        <Clock time="2019-10-23T10:37:45" type="digital" />
        <Clock time="T00:30:00" />
      </Box>
    </Box>
  </Grommet>
);

storiesOf('Clock', module).add('Explicit Time', () => <SetTimeOnClock />);
