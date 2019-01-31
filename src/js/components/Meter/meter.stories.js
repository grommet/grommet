import React from 'react';
import { storiesOf } from '@storybook/react';

import { Grommet, Box, Meter, Stack, Text } from '..';
import { grommet } from '../../themes';

const BarMeter = () => (
  <Grommet theme={grommet}>
    <Box align="center" pad="large">
      <Meter type="bar" background="light-2" values={[{ value: 30 }]} />
    </Box>
  </Grommet>
);

class CircleMeter extends React.Component {
  state = { value: 20 };

  componentDidMount() {
    this.timer = setInterval(() => {
      const { value } = this.state;
      this.setState({ value: value < 100 ? value + 8 : 20 });
    }, 2000);
  }

  componentWillUnmount() {
    clearInterval(this.timer);
  }

  render() {
    const { value } = this.state;
    return (
      <Grommet theme={grommet}>
        <Box align="center" pad="large">
          <Meter
            type="circle"
            background="light-2"
            values={[{ value, color: value > 50 ? 'accent-2' : 'accent-1' }]}
          />
        </Box>
      </Grommet>
    );
  }
}

const LabelledMeter = () => (
  <Grommet theme={grommet}>
    <Box align="center" pad="large">
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
