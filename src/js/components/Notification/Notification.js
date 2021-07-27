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

  const iconColor = theme.notification.icon.color;

  const Icons = {
    StatusGood: theme.notification.good.icon,
    StatusWarning: theme.notification.warning.icon,
    StatusCritical: theme.notification.critical.icon,
    StatusUnknown: theme.notification.unknown.icon,
    FormClose: theme.notification.button.icon,
  };

  let icon;
  let color;
  switch (status) {
    case 'critical':
      color = theme.notification.critical;
      icon = <Icons.StatusCritical color={iconColor} />;
      break;
    case 'warning':
      color = theme.notification.warning;
      icon = <Icons.StatusWarning color={iconColor} />;
      break;
    case 'good':
      color = theme.notification.good;
      icon = <Icons.StatusGood color={iconColor} />;
      break;
    case 'unknown':
      color = theme.notification.unknown;
      icon = <Icons.StatusUnknown color={iconColor} />;
      break;
    default:
      color = theme.notification.unknown;
      icon = <Icons.StatusUnknown color={iconColor} />;
      break;
  }

  let content = (
    <Box direction="row">
      <Box
        {...theme.notification.iconContainer}
        background={color}
        justify="center"
      >
        {icon}
      </Box>
      <Box
        {...theme.notification.textContainer}
        align="start"
        direction="row"
        justify="between"
        flex="grow"
      >
        <Box>
          <Text {...theme.notification.messageText}>{message}</Text>
          {body && (
            <Paragraph {...theme.notification.bodyText}>{body}</Paragraph>
          )}
        </Box>
        <Button
          {...theme.notification.button}
          icon={<Icons.FormClose color={iconColor} />}
          onClick={onClose}
          plain
        />
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
