import React from 'react';
import { storiesOf } from '@storybook/react';

import { Grommet, Clock } from 'grommet';
import { grommet } from 'grommet/themes';

const DigitalClock = () => (
  <Grommet theme={grommet}>
    <Clock type='digital' />
  </Grommet>
);

const AnalogClock = () => (
  <Grommet theme={grommet}>
    <Clock type='analog' />
  </Grommet>
);

storiesOf('Clock', module)
  .add('Digital Clock', () => <DigitalClock />)
  .add('Analog Clock', () => <AnalogClock />);
