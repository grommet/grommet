import React, { Component } from 'react';
import { Layer, Box, Button, DropButton, TextInput, Heading } from 'grommet';
import { MailOption } from 'grommet-icons';

const DropContent = ({ onClose }) => (
  <Box pad="small">
    <Box align="center">
      <Heading level={3} margin="small">
        Send us your feedback
      </Heading>
      <TextInput />
    </Box>
  </Box>
);

export class Overlay extends Component {
  state = {};

  onClose = () => {
    this.setState({ open: false });
    setTimeout(() => this.setState({ open: undefined }), 1);
  };

  render() {
    const { open } = this.state;
    return (
      <Layer
        position="top-right"
        margin={{ horizontal: 'small', vertical: 'medium' }}
        responsive={false}
        plain
        modal={false}
        onClickOutside={this.onClose}
      >
        <Box elevation="large" background="neutral-3" round="full">
          <DropButton
            alignSelf="center"
            open={open}
            onClose={() => this.setState({ open: undefined })}
            dropContent={<DropContent onClose={this.onClose} />}
          >
            <Button
              plain
              icon={<MailOption size="medium" />}
              onClick={() => console.log('Do something')}
            />
          </DropButton>
        </Box>
      </Layer>
    );
  }
}
