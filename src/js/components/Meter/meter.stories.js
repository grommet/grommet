import React, { Component } from 'react';
import { storiesOf } from '@storybook/react';

import Meter from '../Meter/Meter';
import Grommet from '../Grommet/Grommet';
import { grommet } from '../../themes';

class BarMeter extends Component {
  render() {
    return (
      <Grommet theme={grommet}>
        <Meter
          type='bar'
          background='light-2'
          values={[{ value: 30 }]}
        />
      </Grommet>
    );
  }
}

class CircleMeter extends Component {
  render() {
    return (
      <Grommet theme={grommet}>
        <Meter
          type='circle'
          background='light-2'
          values={[{ value: 30 }]}
        />
      </Grommet>
    );
  }
}

storiesOf('Meter', module)
  .add('Bar Meter', () => <BarMeter />)
  .add('Circle Meter', () => <CircleMeter />);
