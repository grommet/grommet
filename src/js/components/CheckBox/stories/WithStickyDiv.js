import React, { Component } from 'react';
import { storiesOf } from '@storybook/react';

import { Box, Grommet, CheckBox } from 'grommet';
import { grommet } from 'grommet/themes';

class CheckBoxWithStickyDiv extends Component {
  state = {
    checked: [],
    checkboxes: Array(8)
      .fill()
      .map((_, i) => `item ${i + 1}`),
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
        <Box pad="large" align="center">
          <Box
            height="120px"
            width="120px"
            overflow="auto"
            style={{
              position: 'relative',
              display: 'block',
            }}
          >
            <Box
              background={{ color: 'neutral-1' }}
              style={{ position: 'sticky', top: 0 }}
            >
              Click &amp; Scroll
            </Box>
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

storiesOf('CheckBox', module).add('With Sticky Div', () => (
  <CheckBoxWithStickyDiv />
));
