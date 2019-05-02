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

class ObjectMultiSelect extends Component {
  state = {
    options: objectOptions,
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
            closeOnChange={false}
            disabledKey="dis"
            labelKey="lab"
            valueKey="val"
            value={value}
            options={options}
            onChange={({ value: nextValue }) =>
              this.setState({ value: nextValue })
            }
            onClose={() => this.setState({ options: objectOptions })}
            onSearch={text => {
              const exp = new RegExp(text, 'i');
              this.setState({
                options: objectOptions.filter(o => exp.test(o.lab)),
              });
            }}
          />
        </Box>
      </Grommet>
    );
  }
}

storiesOf('Select', module).add('Object Multiple', () => <ObjectMultiSelect />);
