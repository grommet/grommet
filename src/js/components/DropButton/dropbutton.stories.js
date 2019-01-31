import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { storiesOf } from '@storybook/react';
import { Close, FormDown } from 'grommet-icons';

import {
  Grommet,
  Box,
  Button,
  Calendar,
  DropButton,
  Heading,
  Text,
} from '..';
import { grommet } from '../../themes';

const DropContent = ({ onClose }) => (
  <Box pad="small">
    <Box direction="row" justify="between" align="center">
      <Heading level={3} margin="small">
        Heading
      </Heading>
      <Button icon={<Close />} onClick={onClose} />
    </Box>
    <Text>Content</Text>
  </Box>
);

DropContent.propTypes = {
  onClose: PropTypes.func.isRequired,
};

class SimpleDropButton extends Component {
  state = {};

  onClose = () => {
    this.setState({ open: false });
    setTimeout(() => this.setState({ open: undefined }), 1);
  };

  render() {
    const { open } = this.state;
    return (
      <Grommet theme={grommet}>
        <Box align="center" pad="large">
          <DropButton
            label="Open"
            open={open}
            onClose={() => this.setState({ open: undefined })}
            dropContent={<DropContent onClose={this.onClose} />}
          />
        </Box>
      </Grommet>
    );
  }
}

class CalendarDropButton extends Component {
  state = { date: undefined };

  onClose = () => {
    this.setState({ open: false });
    setTimeout(() => this.setState({ open: undefined }), 1);
  };

  onSelect = date => this.setState({ date, open: false });

  render() {
    const { date, open } = this.state;
    return (
      <Grommet theme={grommet}>
        <Box align="center" pad="large">
          <DropButton
            open={open}
            onClose={() => this.setState({ open: false })}
            onOpen={() => this.setState({ open: true })}
            dropContent={<Calendar date={date} onSelect={this.onSelect} />}
          >
            <Box direction="row" gap="medium" align="center" pad="small">
              <Text>
                {date ? new Date(date).toLocaleDateString() : 'Select date'}
              </Text>
              <FormDown color="brand" />
            </Box>
          </DropButton>
        </Box>
      </Grommet>
    );
  }
}

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
              dropAlign={{ bottom: 'top' }}
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

storiesOf('DropButton', module)
  .add('Simple', () => <SimpleDropButton />)
  .add('Calendar', () => <CalendarDropButton />)
  .add('UserMenu', () => <UserMenuDropButton />);
