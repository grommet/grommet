import React, { Component } from 'react';
import { storiesOf } from '@storybook/react';

import { Box, Grommet, CheckBox } from 'grommet';
import { grommet } from 'grommet/themes';

class IndeterminateCheckBox extends Component {
  state = {
    checked: [],
    checkboxes: ['fruits', 'vegetables', 'olive oil'],
  };

  onCheckAll = event => {
    const { checkboxes } = this.state;
    if (event.target.checked) {
      this.setState({ checked: checkboxes });
    } else {
      this.setState({ checked: [] });
    }
  };

  onCheck = (event, value) => {
    const { checked } = this.state;
    if (event.target.checked) {
      checked.push(value);
      this.setState({ checked });
    } else {
      this.setState({ checked: checked.filter(item => item !== value) });
    }
  };

  render() {
    const { checked, checkboxes } = this.state;

    return (
      <Grommet theme={grommet}>
        <Box align="center" pad="large">
          <Box direction="row" gap="medium">
            <CheckBox
              checked={checked.length === 3}
              indeterminate={checked.length > 0 && checked.length < 3}
              label="All"
              onChange={this.onCheckAll}
            />
            {checkboxes.map(item => (
              <CheckBox
                key={item}
                checked={checked.indexOf(item) !== -1}
                label={item}
                onChange={e => this.onCheck(e, item)}
              />
            ))}
          </Box>
        </Box>
      </Grommet>
    );
  }
}

storiesOf('CheckBox', module).add('Interminate', () => (
  <IndeterminateCheckBox />
));
