import React, { Component } from 'react';
import { storiesOf } from '@storybook/react';

import { Box, Drop, Grommet } from '../';

class SimpleDrop extends Component {
  componentDidMount() {
    this.forceUpdate();
  }
  render() {
    return (
      <Grommet>
        <Box align='start'>
          <Box
            background='dark-4'
            pad='medium'
            align='center'
            justify='start'
            ref={(ref) => {
              this.targetRef = ref;
            }}
          >
            Target
          </Box>
          <Drop
            align={{ top: 'bottom', left: 'left' }}
            target={this.targetRef}
          >
            <Box pad='large'>
              Drop Contents
            </Box>
          </Drop>
        </Box>
      </Grommet>
    );
  }
}

storiesOf('Drop', module)
  .add('Default', () => <SimpleDrop />);
