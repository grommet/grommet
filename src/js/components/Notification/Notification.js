import React, {
  useCallback,
  useContext,
  useEffect,
  useState,
  useMemo,
} from 'react';
import { ThemeContext } from 'styled-components';
import { defaultProps } from '../../default-props';

import { Box } from '../Box';
import { Button } from '../Button';
import { Layer } from '../Layer';
import { Paragraph } from '../Paragraph';
import { Text } from '../Text';

import { NotificationType } from './propTypes';

const Notification = ({
  banner,
  message,
  onClose,
  id,
  status,
  title,
  toast,
}) => {
  let autoClose = toast?.autoClose === undefined ? true : toast.autoClose;
  if (banner) autoClose = false;
  const theme = useContext(ThemeContext) || defaultProps.theme;
  const [visible, setVisible] = useState(true);
  const position = useMemo(() => (toast && toast?.position) || 'top', [toast]);

  const close = useCallback(() => {
    setVisible(false);
    if (onClose) onClose();
  }, [onClose]);

  useEffect(() => {
    if (autoClose) {
      const timer = setTimeout(
        close,
        theme.notification.toast.time || theme.notification.time,
      );

      return () => clearTimeout(timer);
    }
    return undefined;
  }, [
    autoClose,
    close,
    theme.notification.toast.time,
    theme.notification.time,
  ]);

  const { icon: CloseIcon } = theme.notification.close;
  const { icon: StatusIcon, background, color } = theme.notification[status];
  const { color: closeIconColor } = theme.notification.close;

  let textContent = (
    <>
      <Text {...theme.notification.title}>{title}</Text>
      {message && (
        <Paragraph {...theme.notification.message}>{message}</Paragraph>
      )}
    </>
  );

  if (banner)
    textContent = (
      // need to figure out text theming here feels weird to automatically
      // apply message styling
      <Paragraph {...theme.notification.message} fill>
        {title}
        {theme.notification.banner.separator}
        {message}
      </Paragraph>
    );

  let content = (
    <Box
      {...theme.notification.container}
      {...(banner ? { ...theme.notification.banner.container } : {})}
      {...(toast ? { ...theme.notification.toast.container } : {})}
      background={banner ? background : theme.notification.container.background}
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
        <Box>{textContent}</Box>
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
