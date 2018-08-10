import React, { Component } from 'react';
import { storiesOf } from '@storybook/react';
import { Close, FormDown } from 'grommet-icons';

import DropButton from '../DropButton/DropButton';
import Grommet from '../Grommet/Grommet';
import Box from '../Box/Box';
import Heading from '../Heading/Heading';
import Button from '../Button/Button';
import Text from '../Text/Text';
import Calendar from '../Calendar/Calendar';
import { grommet } from '../../themes';

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
      <Grommet theme={grommet}>
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

class CalendarDropButton extends Component {
  state = { date: undefined }

  onClose = () => {
    this.setState({ open: false });
    setTimeout(() => this.setState({ open: undefined }), 1);
  }

  onSelect = date => this.setState({ date, open: false })

  render() {
    const { date, open } = this.state;
    return (
      <Grommet theme={grommet}>
        <DropButton
          open={open}
          onClose={() => this.setState({ open: false })}
          onOpen={() => this.setState({ open: true })}
          dropContent={(
            <Calendar date={date} onSelect={this.onSelect} />
          )}
        >
          <Box direction='row' gap='medium' align='center' pad='small'>
            <Text>{date ? (new Date(date)).toLocaleDateString() : 'Select date'}</Text>
            <FormDown color='brand' />
          </Box>
        </DropButton>
      </Grommet>
    );
  }
}

storiesOf('DropButton', module)
  .add('Simple', () => <SimpleDropButton />)
  .add('Calendar', () => <CalendarDropButton />);
