import React, { Component } from 'react';
import { storiesOf } from '@storybook/react';

import { Box, Grommet, RadioButtonGroup, TextInput } from 'grommet';
import { grommet } from 'grommet/themes';

class SimpleRadioButtonGroup extends Component {
  constructor(props) {
    super(props);
    this.state = { value: props.value };
  }

  onChange = event => this.setState({ value: event.target.value });

  render() {
    const { value } = this.state;
    return (
      <Grommet theme={grommet}>
        <Box align="center" pad="large">
          <TextInput />
          <RadioButtonGroup
            name="radio"
            options={[
              { label: 'Choice 1', value: 'c1' },
              { label: 'Choice 2', value: 'c2' },
              { label: 'Choice 3', value: 'c3' },
            ]}
            value={value}
            onChange={this.onChange}
            {...this.props}
          />
          <TextInput />
        </Box>
      </Grommet>
    );
  }
}

storiesOf('RadioButtonGroup', module).add('Simple', () => (
  <SimpleRadioButtonGroup />
));
