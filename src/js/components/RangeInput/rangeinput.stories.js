import React, { Component } from 'react';
import { storiesOf } from '@storybook/react';

import RangeInput from '../RangeInput/RangeInput';
import Grommet from '../Grommet/Grommet';
import { grommet } from '../../themes';

class SimpleRangeInput extends Component {
  state = { value: 5 }

  onChange = event => this.setState({ value: event.target.value })

  render() {
    const { value } = this.state;
    return (
      <Grommet theme={grommet}>
        <RangeInput value={value} onChange={this.onChange} />
      </Grommet>
    );
  }
}

storiesOf('RangeInput', module)
  .add('Simple RangeInput', () => <SimpleRangeInput />);
