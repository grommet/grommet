import React, { Component } from 'react';
import { storiesOf } from '@storybook/react';

import RangeInput from '../RangeInput/RangeInput';
import Grommet from '../Grommet/Grommet';

class SimpleRangeInput extends Component {
  state = { value: 5 }

  onChange = event => this.setState({ value: event.target.value })

  render() {
    const { value } = this.state;
    return (
      <Grommet>
        <RangeInput value={value} onChange={this.onChange} />
      </Grommet>
    );
  }
}

class FocusedRangeInput extends Component {
  state = { value: 5 }
  ref = React.createRef()

  componentDidMount() {
    setTimeout(() => { this.ref.current.focus(); }, 0);
  }

  onChange = event => this.setState({ value: event.target.value })

  render() {
    const { value } = this.state;
    return (
      <Grommet>
        <RangeInput ref={this.ref} value={value} onChange={this.onChange} />
      </Grommet>
    );
  }
}

storiesOf('RangeInput', module)
  .add('Simple RangeInput', () => <SimpleRangeInput />)
  .add('Focused RangeInput', () => <FocusedRangeInput />);
