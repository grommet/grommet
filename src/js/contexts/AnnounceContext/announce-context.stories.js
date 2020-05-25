import React from 'react';
import PropTypes from 'prop-types';
import { storiesOf } from '@storybook/react';
import { AnnounceContext, Box, Heading, Text } from 'mnet-ui-base';

const Announcer = ({ announce, message, mode, role }) => {
  React.useEffect(() => {
    const timeout = 3000;
    announce(message, mode, timeout);
  }, [announce, message, mode]);

  return (
    <Text align="center" role={role} aria-live={mode}>
      {message}
    </Text>
  );
};

Announcer.propTypes = {
  announce: PropTypes.func.isRequired,
  message: PropTypes.string,
  mode: PropTypes.string,
  role: PropTypes.string,
};

Announcer.defaultProps = {
  message: 'Here is a simple announcement. This will soon disappear',
  mode: 'polite',
  role: 'log',
};

const AnnounceContextComponent = props => (
  <div style={{ width: '100vw', height: '100vh', overflow: 'auto' }}>
    <Box justify="center" align="center" background="brand" fill>
      <Heading>Welcome to announcement section</Heading>
      <AnnounceContext.Consumer>
        {announce => <Announcer announce={announce} {...props} />}
      </AnnounceContext.Consumer>
    </Box>
  </div>
);

storiesOf('AnnounceContext', module)
  .add('Polite', () => <AnnounceContextComponent />)
  .add('Assertive', () => (
    <AnnounceContextComponent
      message="Turn on Accessibility feature to listen to this announcement.
      This will soon disappear"
      mode="assertive"
      role="alert"
    />
  ));
