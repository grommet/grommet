import React, { Component } from 'react';
import { storiesOf } from '@storybook/react';

import { grommet, Box, FormField, Select, Grommet } from 'grommet';

const allOptions = Array(100)
  .fill()
  .map((_, i) => `option ${i + 1}`);

class FormFieldSelect extends Component {
  state = { value: '', options: allOptions };

  render() {
    const { value, options } = this.state;
    return (
      <Grommet theme={grommet}>
        <Box align="center" pad="large">
          <FormField label="Label" htmlFor="select" {...this.props}>
            <Select
              id="select"
              placeholder="placeholder"
              options={options}
              value={value}
              onChange={({ option }) => this.setState({ value: option })}
            />
          </FormField>
        </Box>
      </Grommet>
    );
  }
}

storiesOf('FormField', module).add('Select', () => <FormFieldSelect />);
