import React, { useContext } from 'react';
import { ThemeContext } from 'styled-components';
import { defaultProps } from '../../default-props';

import { Layer } from '../Layer';
import { Box } from '../Box';
import { Button } from '../Button';
import { Text } from '../Text';

const Notification = ({ toast, title, message, status, onClose }) => {
  const theme = useContext(ThemeContext) || defaultProps.theme;

  const { icon: CloseIcon } = theme.notification.close;
  const { icon: StatusIcon, color } = theme.notification[status];
  const { color: closeIconColor } = theme.notification.close;

  let content = (
    <Box direction="row">
      <Box {...theme.notification.iconContainer}>
        <StatusIcon color={color} />
      </Box>
      <Box
        {...theme.notification.textContainer}
        align="start"
        direction="row"
        justify="between"
        flex
      >
        <Box>
          <Text {...theme.notification.title}>{title}</Text>
          {message && <Text {...theme.notification.message}>{message}</Text>}
        </Box>
        {onClose && (
          <Button
            icon={<CloseIcon color={closeIconColor} />}
            onClick={onClose}
            plain
          />
        )}
      </Box>
    </Box>
  );

  if (toast) {
    content = (
      <Layer
        role="log"
        aria-live="polite"
        animation="fadeIn"
        modal={false}
        onEsc={onClose}
        plain
      >
        <Box {...theme.notification.toast.container}>{content}</Box>
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
