import React from 'react';

import {
  FormClose,
  StatusGood,
  StatusUnknown,
  StatusWarning,
} from 'grommet-icons';
import { Layer } from '../Layer';
import { Box } from '../Box';
import { Button } from '../Button';
import { Text } from '../Text';

const Notification = ({ toast, message, body, size, status, onClose }) => {
  const getIcon = () => {
    switch (status) {
      case 'warning':
        return <StatusWarning color="plain" />;
      case 'ok':
        return <StatusGood color="plain" />;
      case 'unknown':
        return <StatusUnknown color="plain" />;
      default:
        return <StatusUnknown color="plain" />;
    }
  };

  let content = (
    <Box
      gap="small"
      elevation="medium"
      width={size || 'medium'}
      round="small"
      direction="row"
    >
      <Box
        round={{ size: 'small', corner: 'left' }}
        background={status ? `status-${status}` : 'status-unknown'}
        pad="small"
        justify="center"
      >
        {getIcon()}
      </Box>
      <Box
        align="start"
        direction="row"
        justify="between"
        pad={{ right: 'medium', vertical: 'small' }}
        fill
      >
        <Box height={{ max: '80px' }} overflow="hidden">
          <Text size="large" weight="bold">
            {message}
          </Text>
          {body && <Text size="medium">{body}</Text>}
        </Box>
        <Button
          margin={{ left: 'medium' }}
          icon={<FormClose color="plain" />}
          onClick={onClose}
          plain
        />
      </Box>
    </Box>
  );

  if (toast) {
    content = (
      <Layer modal={false} onEsc={onClose}>
        {content}
      </Layer>
    );
  }

  return content;
};

Notification.displayName = 'Notification';

let NotificationDoc;
if (process.env.NODE_ENV !== 'production') {
  NotificationDoc = require('./doc').doc(Notification); // eslint-disable-line global-require
}
const NotificationWrapper = NotificationDoc || Notification;

export { NotificationWrapper as Notification };
