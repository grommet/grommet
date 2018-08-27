import React, { Component } from 'react';
import { storiesOf } from '@storybook/react';

import { Grommet, RadioButton } from '../';
import { grommet } from '../../themes';

class SimpleRadioButton extends Component {
  render() {
    return (
      <Grommet theme={grommet}>
        <RadioButton label='Choice 1' name='radio' />
        <RadioButton label='Choice 2' name='radio' />
      </Grommet>
    );
  }
}

storiesOf('RadioButton', module)
  .add('Simple RadioButton', () => <SimpleRadioButton />);
