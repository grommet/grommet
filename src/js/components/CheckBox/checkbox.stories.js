import React, { Component } from 'react';
import { storiesOf } from '@storybook/react';

import CheckBox from '../CheckBox/CheckBox';
import Grommet from '../Grommet/Grommet';
import { grommet } from '../../themes';

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
  .add('Toggle', () => <SimpleCheckBox toggle={true} />);
