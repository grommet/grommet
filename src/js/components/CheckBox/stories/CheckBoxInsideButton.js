import React, { Component } from 'react';
import { storiesOf } from '@storybook/react';

import { Box, Button, Grommet, CheckBox, Text } from 'grommet';
import { grommet } from 'grommet/themes';

class CheckBoxInsideButton extends Component {
  state = {
    checked: false,
  };

  render() {
    const { checked } = this.state;
    return (
      <Grommet theme={grommet}>
        <Box align="center" pad="large">
          <Button
            hoverIndicator="background"
            onClick={() => {
              this.setState({ checked: !checked });
            }}
          >
            <CheckBox
              tabIndex="-1"
              checked={checked}
              label={<Text>Hi</Text>}
              onChange={() => {}}
            />
          </Button>
        </Box>
      </Grommet>
    );
  }
}

storiesOf('CheckBox', module).add('Inside a Button', () => (
  <CheckBoxInsideButton />
));
