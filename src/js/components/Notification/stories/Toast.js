import React from 'react';
import { storiesOf } from '@storybook/react';

import { Add } from 'grommet-icons';

import { Box, Button, Text } from 'mnet-ui-base';

import { addToast } from '..';

const Toast = () => {
  const addToastDefault = () => {
    addToast({ msg: 'I am default toast' });
  };

  const addToastCritical = () => {
    addToast({ msg: 'I am critical error', type: 'critical' });
  };

  const addToastOk = () => {
    addToast({ msg: 'I am OK', type: 'ok' });
  };

  const addToastWarning = () => {
    addToast({ msg: 'I am just a warning', type: 'warning' });
  };

  return (
    <div style={{ width: '100vw', height: '100vh', overflow: 'auto' }}>
      <Box fill align="center" justify="center">
        <Button
          icon={<Add color="brand" />}
          label={
            <Text>
              <strong>Add Default</strong>
            </Text>
          }
          onClick={addToastDefault}
          plain
        />
        <Button
          icon={<Add color="brand" />}
          label={
            <Text>
              <strong>Add Critical</strong>
            </Text>
          }
          onClick={addToastCritical}
          plain
        />
        <Button
          icon={<Add color="brand" />}
          label={
            <Text>
              <strong>Add OK</strong>
            </Text>
          }
          onClick={addToastOk}
          plain
        />
        <Button
          icon={<Add color="brand" />}
          label={
            <Text>
              <strong>Add Warning</strong>
            </Text>
          }
          onClick={addToastWarning}
          plain
        />
      </Box>
    </div>
  );
};

storiesOf('Notifications', module).add('Toast', () => <Toast />);
