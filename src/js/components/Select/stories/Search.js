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

class SearchSelect extends Component {
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
            value={value}
            options={options}
            onChange={({ option }) => this.setState({ value: option })}
            onClose={() => this.setState({ options: defaultOptions })}
            onSearch={text => {
              // The line below escapes regular expression special characters:
              // [ \ ^ $ . | ? * + ( )
              const escapedText = text.replace(/[-\\^$*+?.()|[\]{}]/g, '\\$&');

              // Create the regular expression with modified value which
              // handles escaping special characters. Without escaping special
              // characters, errors will appear in the console
              const exp = new RegExp(escapedText, 'i');
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

storiesOf('Select', module).add('Search', () => <SearchSelect />);
