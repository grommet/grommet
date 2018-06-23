import React, { Component } from 'react';
import { storiesOf } from '@storybook/react';

import {
  Add,
  FormClose,
  StatusGood,
  Trash,
} from 'grommet-icons';

import {
  Box,
  Button,
  Grommet,
  Heading,
  Layer,
  Text,
} from '../';

class CenterLayer extends Component {
  state = {}

  onOpen = () => this.setState({ open: true })

  onClose = () => this.setState({ open: undefined })

  onOpen2 = () => this.setState({ open2: true })

  onClose2 = () => this.setState({ open2: undefined })

  render() {
    const { open, open2 } = this.state;
    return (
      <Grommet>
        <Button
          icon={<Trash />}
          label={<Text><strong>Remove</strong></Text>}
          onClick={this.onOpen}
          plain={true}
        />
        {open && (
          <Layer
            position='center'
            modal={true}
            onClickOutside={this.onClose}
            onEsc={this.onClose}
          >
            <Box pad='medium' gap='small' width='medium'>
              <Heading level={3} margin='none'>Confirm</Heading>
              <Text>Are you sure you want to delete?</Text>
              <Box
                tag='footer'
                gap='small'
                direction='row'
                align='center'
                justify='end'
                pad={{ top: 'medium', bottom: 'small' }}
              >
                <Button
                  label='Open 2'
                  onClick={this.onOpen2}
                  color='dark-6'
                />
                <Button
                  label={
                    <Text color='white'>
                      <strong>Delete</strong>
                    </Text>
                  }
                  onClick={this.onClose}
                  primary={true}
                  color='status-critical'
                />
              </Box>
            </Box>
          </Layer>
        )}
        {open2 && (
          <Layer
            position='top'
            modal={true}
            onClickOutside={this.onClose2}
            onEsc={this.onClose2}
          >
            <Box pad='medium' gap='small' width='medium'>
              <Heading level={3} margin='none'>Confirm 2</Heading>
              <Box
                tag='footer'
                gap='small'
                direction='row'
                align='center'
                justify='end'
                pad={{ top: 'medium', bottom: 'small' }}
              >
                <Button
                  label='Close'
                  onClick={this.onClose2}
                  color='dark-6'
                />
              </Box>
            </Box>
          </Layer>
        )}
      </Grommet>
    );
  }
}

class NotificationLayer extends Component {
  state = {}

  onOpen = () => this.setState({ open: true })

  onClose = () => this.setState({ open: undefined })

  render() {
    const { open } = this.state;
    return (
      <Grommet>
        <Button
          icon={<Add color='brand' />}
          label={<Text><strong>Add</strong></Text>}
          onClick={this.onOpen}
          plain={true}
        />
        {open && (
          <Layer
            position='bottom'
            full='horizontal'
            modal={false}
            responsive={false}
          >
            <Box align='start' pad={{ vertical: 'medium', horizontal: 'small' }}>
              <Box
                align='center'
                direction='row'
                gap='small'
                round='medium'
                elevation='medium'
                pad={{ vertical: 'xsmall', horizontal: 'small' }}
                background='status-ok'
              >
                <Box align='center' direction='row' gap='xsmall'>
                  <StatusGood />
                  <Text>
                    A new virtual machine has been successfully added
                  </Text>
                </Box>
                <Button icon={<FormClose />} onClick={this.onClose} plain={true} />
              </Box>
            </Box>
          </Layer>
        )}
      </Grommet>
    );
  }
}

storiesOf('Layer', module)
  .add('Center', () => <CenterLayer />)
  .add('Notification', () => <NotificationLayer />);
