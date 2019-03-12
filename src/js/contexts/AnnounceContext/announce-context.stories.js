import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { storiesOf } from '@storybook/react';
import { grommet } from 'grommet/themes';
import { Box, Grommet, Text, AnnounceContext } from 'grommet';

class Announcer extends Component {
  static propTypes = {
    announce: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);
    const { message, role, politenessSetting } = this.props;
    this.state = {
      message:
        message || 'Here is a simple announcement. This will soon disappear',
      politenessSetting: politenessSetting || 'polite',
      role: role || 'log',
    };
  }

  componentDidMount() {
    const { announce } = this.props;
    const { message, politenessSetting } = this.state;
    const timeout = 3000;
    announce(message, politenessSetting, timeout);
  }

  render() {
    const { message, politenessSetting, role } = this.state;
    return (
      <Text align="center" role={role} aria-live={politenessSetting}>
        {message}
      </Text>
    );
  }
}

const AnnounceContextComponent = props => (
  <Grommet theme={grommet} full>
    <Box
      justify="center"
      align="center"
      pad="xlarge"
      background="linear-gradient(102.77deg, #865ED6 -9.18%, #18BAB9 209.09%)"
      round="large"
      fill
    >
      <Text color="white">Welcome to announcement section</Text>
      <AnnounceContext.Consumer>
        {announce => <Announcer announce={announce} {...props} />}
      </AnnounceContext.Consumer>
    </Box>
  </Grommet>
);

storiesOf('AnnounceContext', module)
  .add('Polite', () => <AnnounceContextComponent />)
  .add('Assertive', () => (
    <AnnounceContextComponent
      politenessSetting="assertive"
      role="alert"
      message="Turn on Accessibility feature to listen to this announcement. This will soon disappear"
    />
  ));
