import React from 'react';
import { storiesOf } from '@storybook/react';

import { Grommet, Box, Meter, Stack, Text } from 'grommet';
import { grommet } from 'grommet/themes';

const BarMeter = () => (
  <Grommet theme={grommet}>
    <Meter type="bar" background="light-2" values={[{ value: 30 }]} />
  </Grommet>
);

const CircleMeter = () => (
  <Grommet theme={grommet}>
    <Meter type="circle" background="light-2" values={[{ value: 30 }]} />
  </Grommet>
);

const LabelledMeter = () => (
  <Grommet theme={grommet}>
    <Box align="start">
      <Stack anchor="center">
        <Meter
          type="circle"
          background="light-2"
          values={[{ value: 30 }]}
          size="xsmall"
          thickness="small"
        />
        <Box direction="row" align="center" pad={{ bottom: 'xsmall' }}>
          <Text size="xlarge" weight="bold">
            30
          </Text>
          <Text size="small">%</Text>
        </Box>
      </Stack>
    </Box>
  </Grommet>
);

storiesOf('Meter', module)
  .add('Bar', () => <BarMeter />)
  .add('Circle', () => <CircleMeter />)
  .add('Labelled', () => <LabelledMeter />);
