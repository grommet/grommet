import React, { createRef, Component } from 'react';
import { storiesOf } from '@storybook/react';

import { Box, Button, Drop, Grommet } from 'grommet';
import { grommet } from 'grommet/themes';

class ProgressiveDrop extends Component {
  boxRef = createRef();

  innerBoxRef = createRef();

  state = {
    openDrop: false,
    openInnerDrop: false,
    interactedWithInnerButton: false,
  };

  onCloseDrop = () => this.setState({ openDrop: false, openInnerDrop: false });

  onOpenDrop = () => this.setState({ openDrop: true, openInnerDrop: false });

  render() {
    const { openDrop, openInnerDrop, interactedWithInnerButton } = this.state;
    return (
      <Grommet theme={grommet} full>
        <Box fill align="center" justify="center">
          <Button
            ref={this.boxRef}
            primary
            label="Click me"
            onClick={this.onOpenDrop}
          />
          {openDrop && (
            <Drop
              target={this.boxRef.current}
              onClickOutside={this.onCloseDrop}
              onEsc={this.onCloseDrop}
            >
              <Box pad="large" ref={this.innerBoxRef}>
                <Button
                  primary
                  label="Click me again"
                  onClick={() => this.setState({ openInnerDrop: true })}
                />
              </Box>
              {openInnerDrop && (
                <Drop
                  target={this.innerBoxRef.current}
                  onClickOutside={() => this.setState({ openInnerDrop: false })}
                  onEsc={() => this.setState({ openInnerDrop: false })}
                  align={{ top: 'bottom', right: 'right' }}
                >
                  <Box pad="large">
                    <Button
                      primary
                      label={
                        interactedWithInnerButton
                          ? 'Good job!'
                          : 'You can interact with me'
                      }
                      onClick={() =>
                        this.setState({ interactedWithInnerButton: true })
                      }
                    />
                  </Box>
                </Drop>
              )}
            </Drop>
          )}
        </Box>
      </Grommet>
    );
  }
}

storiesOf('Drop', module).add('Progressive', () => <ProgressiveDrop />);
