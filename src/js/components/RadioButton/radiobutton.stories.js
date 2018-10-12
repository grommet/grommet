import React from 'react';
import { storiesOf } from '@storybook/react';

import { Grommet, RadioButton } from 'grommet';
import { grommet } from 'grommet/themes';

const SimpleRadioButton = () => (
  <Grommet theme={grommet}>
    <RadioButton label='Choice 1' name='radio' />
    <RadioButton label='Choice 2' name='radio' />
  </Grommet>
);

storiesOf('RadioButton', module)
  .add('Simple RadioButton', () => <SimpleRadioButton />);
