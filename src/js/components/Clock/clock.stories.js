import React, { Component } from 'react';
import { storiesOf } from '@storybook/react';

import { Grommet, Clock } from 'grommet';
import { grommet } from 'grommet/themes';

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
