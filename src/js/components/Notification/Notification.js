import React, { useContext } from 'react';
import { ThemeContext } from 'styled-components';
import { defaultProps } from '../../default-props';

import { Box } from '../Box';
import { Button } from '../Button';
import { Layer } from '../Layer';
import { Text } from '../Text';

import { NotificationType } from './propTypes';

const Notification = ({ message, onClose, status, title, toast }) => {
  const theme = useContext(ThemeContext) || defaultProps.theme;

  const { icon: CloseIcon } = theme.notification.close;
  const { icon: StatusIcon, color } = theme.notification[status];
  const { color: closeIconColor } = theme.notification.close;

  let content = (
    <Box
      {...theme.notification.container}
      {...(toast ? { ...theme.notification.toast.container } : {})}
      direction="row"
    >
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
        {...theme.notification.toast.layer}
        role="log"
        modal={false}
        onEsc={onClose}
        responsive
        plain
      >
        {content}
      </Layer>
    );
  }

  return content;
};

Notification.defaultProps = {
  status: 'unknown',
  toast: false,
};

Object.setPrototypeOf(Notification.defaultProps, defaultProps);
Notification.displayName = 'Notification';

Notification.propTypes = NotificationType;

export { Notification };
