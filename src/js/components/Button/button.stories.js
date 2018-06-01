import React, { Component } from 'react';
import { storiesOf } from '@storybook/react';

import Button from '../Button/Button';
import Grommet from '../Grommet/Grommet';

class SimpleButton extends Component {
  render() {
    return (
      <Grommet>
        <Button label='Submit' onClick={() => {}} />
      </Grommet>
    );
  }
}

storiesOf('Button', module)
  .add('Simple Button', () => <SimpleButton />);
