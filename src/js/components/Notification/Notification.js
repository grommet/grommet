import React, { useContext } from 'react';
import { ThemeContext } from 'styled-components';
import { defaultProps } from '../../default-props';

import { Layer } from '../Layer';
import { Box } from '../Box';
import { Button } from '../Button';
import { Text } from '../Text';
import { Paragraph } from '../Paragraph';

const Notification = ({ toast, message, body, status, onClose }) => {
  const theme = useContext(ThemeContext) || defaultProps.theme;

  const { icon: CloseIcon } = theme.notification.button;
  const { icon: StatusIcon, color } = theme.notification[status];
  const iconColor = theme.notification.icon.color;

  let content = (
    <Box direction="row">
      <Box
        {...theme.notification.iconContainer}
        background={color}
        justify="center"
      >
        <StatusIcon color={iconColor} />
      </Box>
      <Box
        {...theme.notification.textContainer}
        align="start"
        direction="row"
        justify="between"
        fill
      >
        <Box>
          <Text {...theme.notification.messageText}>{message}</Text>
          {body && (
            <Paragraph {...theme.notification.bodyText}>{body}</Paragraph>
          )}
        </Box>
        {onClose && (
          <Button
            {...theme.notification.button}
            icon={<CloseIcon color={iconColor} />}
            onClick={onClose}
            plain
          />
        )}
      </Box>
    </Box>
  );

  if (toast) {
    content = (
      <Layer animation="fadeIn" modal={false} onEsc={onClose}>
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
