import React, { useCallback, useContext, useEffect, useState } from 'react';
import { ThemeContext } from 'styled-components';
import { defaultProps } from '../../default-props';

import { Box } from '../Box';
import { Button } from '../Button';
import { Layer } from '../Layer';
import { Paragraph } from '../Paragraph';
import { Text } from '../Text';

import { NotificationType } from './propTypes';

const Notification = ({
  message,
  onClose,
  id,
  position = 'top',
  status,
  title,
  toast,
}) => {
  const theme = useContext(ThemeContext) || defaultProps.theme;
  const [visible, setVisible] = useState(true);

  const close = useCallback(() => {
    setVisible(false);
    if (onClose) onClose();
  }, [onClose]);

  useEffect(() => {
    const timer = setTimeout(
      close,
      theme.notification.toast.time || theme.notification.time,
    );

    return () => clearTimeout(timer);
  }, [close, theme.notification.toast.time, theme.notification.time]);

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
          {message && (
            <Paragraph {...theme.notification.message}>{message}</Paragraph>
          )}
        </Box>
        {onClose && (
          <Button
            icon={<CloseIcon color={closeIconColor} />}
            onClick={close}
            plain
          />
        )}
      </Box>
    </Box>
  );

  if (toast) {
    content = visible && (
      <Layer
        {...theme.notification.toast.layer}
        role="log"
        modal={false}
        onEsc={onClose}
        id={id}
        responsive
        plain
        position={position}
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
