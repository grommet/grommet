import React, { Component } from 'react';
import { storiesOf } from '@storybook/react';

import RangeSelector from '../RangeSelector/RangeSelector';
import Grommet from '../Grommet/Grommet';

class SimpleRangeSelector extends Component {
  state = { values: [5, 10] }

  onChange = values => this.setState({ values })

  render() {
    const { values } = this.state;
    return (
      <Grommet>
        <RangeSelector values={values} onChange={this.onChange} />
      </Grommet>
    );
  }
}

class FocusedRangeSelector extends Component {
  state = { values: [5, 10] }
  ref = React.createRef()

  componentDidMount() {
    setTimeout(() => { this.ref.current.focus(); }, 0);
  }

  onChange = values => this.setState({ values })

  render() {
    const { values } = this.state;
    return (
      <Grommet>
        <RangeSelector ref={this.ref} values={values} onChange={this.onChange} />
      </Grommet>
    );
  }
}

storiesOf('RangeSelector', module)
  .add('Simple RangeSelector', () => <SimpleRangeSelector />)
  .add('Focused RangeSelector', () => <FocusedRangeSelector />);
