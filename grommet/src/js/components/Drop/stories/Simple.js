import React, { createRef, Component } from 'react';
import { storiesOf } from '@storybook/react';

import { Box, Drop, Grommet } from 'grommet';
import { grommet } from 'grommet/themes';

class SimpleDrop extends Component {
  targetRef = createRef();

  componentDidMount() {
    this.forceUpdate();
  }

  render() {
    return (
      <Grommet theme={grommet} full>
        <Box fill align="center" justify="center">
          <Box
            background="dark-3"
            pad="medium"
            align="center"
            justify="start"
            ref={this.targetRef}
          >
            Target
          </Box>
          {this.targetRef.current && (
            <Drop
              align={{ top: 'bottom', left: 'left' }}
              target={this.targetRef.current}
            >
              <Box pad="large">Drop Contents</Box>
            </Drop>
          )}
        </Box>
      </Grommet>
    );
  }
}

storiesOf('Drop', module).add('Simple', () => <SimpleDrop />);
