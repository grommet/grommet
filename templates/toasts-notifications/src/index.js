import React from 'react';
import { render } from 'react-dom';
import { Box, Grommet, Button, Heading, Paragraph } from 'grommet';
import { grommet } from 'grommet/themes';
import {
  AlertNotification,
  AccountCreated,
  Unsubscribe,
  Notice,
  StatusChange,
  Join,
  Overlay,
  Call,
} from './components';

class App extends React.Component {
  state = {
    statusChange: false,
    unsubscribe: false,
    account: false,
    notice: true,
    join: false,
    alert: false,
    overlay: false,
    call: false,
  };

  toggleStatus(item) {
    this.setState(state => ({
      [item]: !state[item],
    }));
  }

  render() {
    const {
      statusChange,
      unsubscribe,
      account,
      notice,
      join,
      alert,
      overlay,
      call,
    } = this.state;

    return (
      <Grommet theme={grommet} full>
        <Box margin="small" align="center" background="white">
          <Heading>Notifications and Popovers (Toasts)</Heading>
          {alert && (
            <AlertNotification
              message="You are approaching (93%) the limit of disk space allowance"
              onClose={() => this.toggleStatus('alert')}
            />
          )}
          <Box gap="medium" margin="large" direction="row-responsive">
            <Box>
              <Paragraph>
                Whether you want to display a notification that will be
                displayed for a short time, overlaying whatever the user is
                currently doing, or something more permanent like a persistent
                notification, here are some patterns to get you started
              </Paragraph>
            </Box>
            <Box gap="small">
              <Box gap="small" direction="row-responsive">
                <Button
                  primary
                  onClick={() => this.toggleStatus('unsubscribe')}
                  label="Unsubscribe"
                />
                <Button
                  primary
                  onClick={() => {
                    this.toggleStatus('account');
                  }}
                  label="Account creation"
                />
              </Box>
              <Box gap="small" direction="row-responsive">
                <Button
                  primary
                  onClick={() => this.toggleStatus('alert')}
                  label="Status alert"
                />
                <Button
                  primary
                  onClick={() => this.toggleStatus('notice')}
                  label="GDPR notice"
                />
              </Box>
              <Box gap="small" direction="row-responsive">
                <Button
                  primary
                  onClick={() => this.toggleStatus('call')}
                  label="Call invite"
                />
                <Button
                  primary
                  onClick={() => this.toggleStatus('join')}
                  label="Join our slack"
                />
              </Box>
              <Box gap="small" direction="row-responsive">
                <Button
                  primary
                  onClick={() => this.toggleStatus('statusChange')}
                  label="Status change"
                />
                <Button
                  primary
                  onClick={() => this.toggleStatus('overlay')}
                  label="Overlay button"
                />
              </Box>
            </Box>
          </Box>
        </Box>
        {join && <Join onClose={() => this.toggleStatus('join')} />}
        {statusChange && (
          <StatusChange onClose={() => this.toggleStatus('statusChange')} />
        )}
        {account && (
          <AccountCreated onClose={() => this.toggleStatus('account')} />
        )}
        {unsubscribe && (
          <Unsubscribe onClose={() => this.toggleStatus('unsubscribe')} />
        )}
        {notice && <Notice onClose={() => this.toggleStatus('notice')} />}
        {overlay && <Overlay />}
        {call && <Call onClose={() => this.toggleStatus('call')} />}
      </Grommet>
    );
  }
}

render(<App />, document.getElementById('app'));
