import React, { Component } from 'react';
import { storiesOf } from '@storybook/react';

import Clock from '../Clock/Clock';
import Grommet from '../Grommet/Grommet';
import { grommet } from '../../themes';

class DigitalClock extends Component {
  render() {
    return (
      <Grommet theme={grommet}>
        <Clock type='digital' />
      </Grommet>
    );
  }
}

class AnalogClock extends Component {
  render() {
    return (
      <Grommet theme={grommet}>
        <Clock type='analog' />
      </Grommet>
    );
  }
}

storiesOf('Clock', module)
  .add('Digital Clock', () => <DigitalClock />)
  .add('Analog Clock', () => <AnalogClock />);
