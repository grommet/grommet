import React, { createRef, Component } from 'react';
import { storiesOf } from '@storybook/react';

import { Box, Button, Drop, Grommet } from 'grommet';
import { grommet } from 'grommet/themes';

class TooltipDrop extends Component {
  state = {};

  ref = createRef();

  render() {
    const { over } = this.state;
    return (
      <Grommet theme={grommet} full>
        <Box fill align="center" justify="center">
          <Button
            label="Button"
            ref={this.ref}
            onMouseOver={() => this.setState({ over: true })}
            onMouseOut={() => this.setState({ over: false })}
            onFocus={() => this.setState({ over: true })}
            onBlur={() => this.setState({ over: false })}
          />
          {this.ref.current && over && (
            <Drop align={{ left: 'right' }} target={this.ref.current} plain>
              <Box
                margin="xsmall"
                pad="small"
                background="dark-3"
                round={{ size: 'medium', corner: 'left' }}
              >
                tooltip contents
              </Box>
            </Drop>
          )}
        </Box>
      </Grommet>
    );
  }
}

storiesOf('Drop', module).add('Tooltip', () => <TooltipDrop />);
