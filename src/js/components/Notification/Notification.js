import React from 'react';

import { Layer } from '../Layer';
import { Box } from '../Box';
import { Paragraph } from '../Paragraph';

const Notification = ({ toast, message, onClose }) => {
  let content = (
    <Box elevation="medium" round="small" pad="small">
      <Paragraph margin="none">{message}</Paragraph>
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
