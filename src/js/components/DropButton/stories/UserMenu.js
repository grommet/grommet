import React, { Component } from 'react';
import { storiesOf } from '@storybook/react';

import { Grommet, Box, DropButton } from 'grommet';
import { grommet } from 'grommet/themes';

class UserMenuDropButton extends Component {
  componentDidMount() {
    this.forceUpdate();
  }

  renderItems = () => (
    <Box>
      <span>hi</span>
      <span>hi</span>
      <span>hi</span>
      <span>hi</span>
      <span>hi</span>
    </Box>
  );

  render() {
    return (
      <Grommet theme={grommet} full>
        <Box fill>
          <Box fill="vertical" width="60px" background="dark-2">
            <Box flex />
            <DropButton
              alignSelf="center"
              margin={{ vertical: 'small' }}
              dropContent={this.renderItems()}
              dropProps={{ align: { bottom: 'top' } }}
            >
              <Box
                height="36px"
                width="36px"
                round="full"
                background="url(//s.gravatar.com/avatar/b226da5c619b18b44eb95c30be393953?s=80)"
              />
            </DropButton>
          </Box>
        </Box>
      </Grommet>
    );
  }
}

storiesOf('DropButton', module).add('UserMenu', () => <UserMenuDropButton />);
