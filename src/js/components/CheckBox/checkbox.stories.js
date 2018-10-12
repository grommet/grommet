import React, { Component } from 'react';
import { storiesOf } from '@storybook/react';

import { Grommet, CheckBox } from 'grommet';
import { grommet } from 'grommet/themes';

class SimpleCheckBox extends Component {
  state = { checked: false }

  onChange = event => this.setState({ checked: event.target.checked })

  render() {
    const { checked } = this.state;
    return (
      <Grommet theme={grommet}>
        <CheckBox
          {...this.props}
          label='Choice'
          checked={checked}
          onChange={this.onChange}
        />
      </Grommet>
    );
  }
}

storiesOf('CheckBox', module)
  .add('Simple', () => <SimpleCheckBox />)
  .add('Toggle', () => <SimpleCheckBox toggle />);
