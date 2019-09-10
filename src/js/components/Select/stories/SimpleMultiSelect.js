import React, { Component } from 'react';
import { storiesOf } from '@storybook/react';

import { Box, Grommet, Select } from 'grommet';
import { grommet } from 'grommet/themes';

const defaultOptions = [];
const objectOptions = [];
for (let i = 1; i <= 200; i += 1) {
  defaultOptions.push(`option ${i}`);
  objectOptions.push({
    lab: `option ${i}`,
    val: i,
    dis: i % 5 === 0,
    sel: i % 13 === 0,
  });
}

class SimpleMultiSelect extends Component {
  state = {
    options: defaultOptions,
    value: '',
  };

  render() {
    const { options, value } = this.state;
    return (
      <Grommet full theme={grommet}>
        <Box fill align="center" justify="start" pad="large">
          <Select
            size="medium"
            placeholder="Select"
            multiple
            value={value}
            options={options}
            onChange={({ value: nextValue }) =>
              this.setState({ value: nextValue })
            }
            onClose={() => this.setState({ options: defaultOptions })}
            onSearch={text => {
              const exp = new RegExp(text, 'i');
              this.setState({
                options: defaultOptions.filter(o => exp.test(o)),
              });
            }}
          />
        </Box>
      </Grommet>
    );
  }
}

storiesOf('Select', module).add('Multiple', () => <SimpleMultiSelect />);
