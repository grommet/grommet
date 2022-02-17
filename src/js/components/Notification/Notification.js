import React, {
  useCallback,
  useContext,
  useEffect,
  useState,
  useMemo,
  Fragment,
} from 'react';
import { ThemeContext } from 'styled-components';
import { defaultProps } from '../../default-props';

import { Box } from '../Box';
import { Button } from '../Button';
import { Layer } from '../Layer';
import { Paragraph } from '../Paragraph';
import { Text } from '../Text';

import { NotificationType } from './propTypes';

const IconTextContainer = ({ href, onClick, ...rest }) =>
  href || onClick ? (
    <Box flex>
      <Button href={href} onClick={onClick} {...rest} />
    </Box>
  ) : (
    <Fragment {...rest} />
  );

const adaptThemeStyle = (value, theme) => {
  let textStyle = value;
  let closeButtonStyle = value;

  if (typeof value === 'string' && theme.global.edgeSize[value]) {
    textStyle = {
      vertical: value,
      left: value,
      right: undefined,
    };
    closeButtonStyle = { vertical: value, right: value };
  } else if (typeof pad === 'object') {
    const { left, right, top, bottom, horizontal, vertical } = value;
    textStyle = {
      top: top || vertical,
      bottom: bottom || vertical,
      left: left || horizontal,
      right: undefined,
    };
    closeButtonStyle = {
      top: top || vertical,
      bottom: bottom || vertical,
      right: right || horizontal,
    };
  }

  return [textStyle, closeButtonStyle];
};

const Notification = ({
  message: messageProp,
  href,
  onClick,
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

  const { direction, truncate } = toast
    ? theme.notification.toast
    : theme.notification;

  const TextWrapper = direction === 'row' ? Text : Fragment;
  const textWrapperProps = direction === 'row' ? { truncate } : {};

  // notification is built with two child boxes that contain:
  // 1. icon + text (wrapped in button when clickable)
  // 2. close button
  // pad needs to be applied to the child boxes to ensure pad is included
  // in the clickable region, but we don't want to apply extra padding
  // between the icon + text and the button.
  const { pad } = theme.notification.container;
  let textPad;
  let closeButtonPad;
  if (onClose) [textPad, closeButtonPad] = adaptThemeStyle(pad, theme);
  else textPad = pad;

  let message;
  if (messageProp && !truncate && direction !== 'row')
    message = (
      <Paragraph {...theme.notification.message}>{messageProp}</Paragraph>
    );
  else if (messageProp)
    message = (
      <Text {...theme.notification.message} truncate={truncate}>
        {messageProp}
      </Text>
    );

  let content = (
    <Box
      {...theme.notification.container}
      {...(toast ? { ...theme.notification.toast.container } : {})}
      background={
        !toast && background
          ? background
          : theme.notification.container.background
      }
      // let internal box control pad so clickable region includes pad
      pad={undefined}
      direction="row"
      gap="medium"
    >
      {/* separate from onClose button to avoid nested interactive elements */}
      <IconTextContainer href={href} onClick={onClick}>
        <Box direction="row" pad={textPad} flex>
          <Box {...theme.notification.iconContainer}>
            <StatusIcon color={color} />
          </Box>
          <Box {...theme.notification.textContainer}>
            <TextWrapper {...textWrapperProps}>
              {title && <Text {...theme.notification.title}>{title}</Text>}
              {/* space between title and message */}
              {message && title && direction === 'row' && <Text> </Text>}
              {message}
            </TextWrapper>
          </Box>
        </Box>
      </IconTextContainer>
      {onClose && (
        // theme.notification.container and textContainer may both have pad,
        // account for both
        <Box pad={closeButtonPad}>
          <Box {...theme.notification.textContainer}>
            <Button
              icon={<CloseIcon color={closeIconColor} />}
              onClick={close}
              hoverIndicator
              plain
            />
          </Box>
        </Box>
      )}
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
