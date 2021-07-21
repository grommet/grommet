import React from 'react';

import { FormClose, StatusGood } from 'grommet-icons';
import { Layer } from '../Layer';
import { Box } from '../Box';
import { Button } from '../Button';
import { Text } from '../Text';

const Notification = ({ toast, message, onClose }) => {
  let content = (
    <Box
      gap="small"
      elevation="medium"
      width="medium"
      round="small"
      direction="row"
      å
    >
      <Box
        round={{ size: 'small', corner: 'left' }}
        background="status-ok"
        pad="small"
        justify="center"
      >
        <StatusGood color="plain" />
      </Box>
      <Box
        align="start"
        direction="row"
        justify="between"
        pad={{ right: 'medium', vertical: 'small' }}
        fill
      >
        <Text size="large" weight="bold">
          {message}
        </Text>
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
      <Layer position="center" modal={false} onEsc={onClose}>
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
