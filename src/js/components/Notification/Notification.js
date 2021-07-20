import React, { forwardRef } from 'react';

import { Layer } from '../Layer';
import { Box } from '../Box';

const Notification = forwardRef(({ message, onClose, ...rest }, ref) => (
  <>
    <Layer
      position="center"
      animation="slide"
      modal={false}
      ref={ref}
      onEsc={onClose}
      onClickOutside={onClose}
      {...rest}
    >
      <Box>{message}</Box>
    </Layer>
  </>
));

Notification.displayName = 'Notification';

let NotificationDoc;
if (process.env.NODE_ENV !== 'production') {
  NotificationDoc = require('./doc').doc(Notification); // eslint-disable-line global-require
}
const NotificationWrapper = NotificationDoc || Notification;

export { NotificationWrapper as Notification };
