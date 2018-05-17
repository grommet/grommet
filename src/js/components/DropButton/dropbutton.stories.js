import React, { Component } from 'react';
import { storiesOf } from '@storybook/react';
import { Close } from 'grommet-icons';

import DropButton from '../DropButton/DropButton';
import Grommet from '../Grommet/Grommet';
import Box from '../Box/Box';
import Heading from '../Heading/Heading';
import Button from '../Button/Button';
import Text from '../Text/Text';

const DropContent = ({ onClose }) => (
  <Box pad='small'>
    <Box direction='row' justify='between' align='center'>
      <Heading level={3} margin='small' >Heading</Heading>
      <Button icon={<Close />} onClick={onClose} />
    </Box>
    <Text>Content</Text>
  </Box>
);

class SimpleDropButton extends Component {
  state = {}

  onClose = () => {
    this.setState({ open: false });
    setTimeout(() => this.setState({ open: undefined }), 1);
  }

  render() {
    const { open } = this.state;
    return (
      <Grommet>
        <DropButton
          label='Open'
          open={open}
          onClose={() => this.setState({ open: undefined })}
          dropContent={<DropContent onClose={this.onClose} />}
        />
      </Grommet>
    );
  }
}

class FocusedDropButton extends Component {
  ref = React.createRef()

  state = {}

  componentDidMount() {
    this.ref.current.focus();
  }

  onClose = () => {
    this.setState({ open: false });
    setTimeout(() => this.setState({ open: undefined }), 1);
  }

  render() {
    const { open } = this.state;
    return (
      <Grommet>
        <DropButton
          ref={this.ref}
          label='Open'
          open={open}
          onClose={() => this.setState({ open: undefined })}
          dropContent={<DropContent onClose={this.onClose} />}
        />
      </Grommet>
    );
  }
}

storiesOf('DropButton', module)
  .add('Simple DropButton', () => <SimpleDropButton />)
  .add('Focused DropButton', () => <FocusedDropButton />);
