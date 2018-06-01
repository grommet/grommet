import React, { Component } from 'react';
import { storiesOf } from '@storybook/react';

import CheckBox from '../CheckBox/CheckBox';
import Grommet from '../Grommet/Grommet';

class SimpleCheckBox extends Component {
  render() {
    return (
      <Grommet>
        <CheckBox label='Choice' />
      </Grommet>
    );
  }
}

storiesOf('CheckBox', module)
  .add('Simple CheckBox', () => <SimpleCheckBox />);
