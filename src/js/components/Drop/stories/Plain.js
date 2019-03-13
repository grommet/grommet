import React, { createRef, Component } from 'react';
import { storiesOf } from '@storybook/react';

import { Box, Drop, Grommet } from 'grommet';
import { grommet } from 'grommet/themes';

class PlainDrop extends Component {
  targetRef = createRef();

  componentDidMount() {
    this.forceUpdate();
  }

  render() {
    return (
      <Grommet theme={grommet} full>
        <Box background="brand" fill align="center" justify="center">
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
              plain
              align={{ top: 'bottom', left: 'left' }}
              target={this.targetRef.current}
            >
              <Box pad="large">No background no shadow</Box>
            </Drop>
          )}
        </Box>
      </Grommet>
    );
  }
}

storiesOf('Drop', module).add('Plain', () => <PlainDrop />);
