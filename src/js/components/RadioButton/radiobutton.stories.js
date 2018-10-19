import React, { Component } from 'react';
import { storiesOf } from '@storybook/react';

import { Grommet, RadioButton } from 'grommet';
import { grommet } from 'grommet/themes';

class SimpleRadioButton extends Component {
  state = { selected: undefined }

  onChange = event => this.setState({ selected: event.target.value })

  render() {
    const { selected } = this.state;
    return (
      <Grommet theme={grommet}>
        <RadioButton
          label='Choice 1'
          name='radio'
          value='c1'
          checked={selected === 'c1'}
          onChange={this.onChange}
        />
        <RadioButton
          label='Choice 2'
          name='radio'
          value='c2'
          checked={selected === 'c2'}
          onChange={this.onChange}
        />
      </Grommet>
    );
  }
}

storiesOf('RadioButton', module)
  .add('Simple RadioButton', () => <SimpleRadioButton />);
