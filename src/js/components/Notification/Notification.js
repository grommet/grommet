import React, {
  Fragment,
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
  message: messageProp,
  onClose,
  id,
  status,
  title,
  toast,
}) => {
  const autoClose =
    toast && toast?.autoClose === undefined ? true : toast.autoClose;
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
  const { separator, truncate: themeTruncate } = theme.notification;

  const truncate = themeTruncate && !toast;
  // log for toast, info (anything that isn't critical)
  // alert for critical / warning

  const TextWrapper = truncate ? Text : Fragment;
  // don't pass truncate to Fragment, unsupported prop
  const textWrapperProps = truncate ? { truncate } : undefined;

  const MessageWrapper = truncate ? Text : Paragraph;
  const messageProps = {
    ...theme.notification.message,
    ...(toast ? { ...theme.notification.toast.message } : {}),
    // don't pass truncate to Paragraph, unsupported prop
    truncate: truncate || undefined,
  };

  const message = messageProp ? (
    <MessageWrapper {...messageProps}>{messageProp}</MessageWrapper>
  ) : null;

  let content = (
    <Box
      {...theme.notification.container}
      {...(toast ? { ...theme.notification.toast.container } : {})}
      background={
        !toast && background
          ? background
          : theme.notification.container.background
      }
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
          <TextWrapper {...textWrapperProps}>
            <Text
              {...theme.notification.title}
              {...(toast ? { ...theme.notification.toast.title } : {})}
            >
              {title}
            </Text>
            {message && separator && !toast && <Text>{separator}</Text>}
            {message}
          </TextWrapper>
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
