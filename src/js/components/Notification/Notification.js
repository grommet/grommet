import React, { useContext } from 'react';
import { ThemeContext } from 'styled-components';
import { defaultProps } from '../../default-props';

import { Layer } from '../Layer';
import { Box } from '../Box';
import { Button } from '../Button';
import { Text } from '../Text';

const Notification = ({ toast, message, body, status, onClose }) => {
  const theme = useContext(ThemeContext) || defaultProps.theme;

  const {
    gap: containerGap,
    elevation: containerElevation,
    round: containerRound,
  } = theme.notification.container;

  const { pad: iconContainerPad, round: iconContainerRound } =
    theme.notification.iconContainer;

  const { pad: textContainerPad } = theme.notification.textContainer;

  const { size: messageTextSize, weight: messageTextWeight } =
    theme.notification.messageText;

  const { size: bodyTextSize } = theme.notification.bodyText;

  const { margin: buttonMargin } = theme.notification.button;

  const Icons = {
    StatusGood: theme.notification.icons.statusGood,
    StatusWarning: theme.notification.icons.statusWarning,
    StatusUnknown: theme.notification.icons.statusUnknown,
    FormClose: theme.notification.icons.closeButton,
  };

  const iconColor = theme.notification.icons.color;

  let icon;
  let color;
  switch (status) {
    case 'warning':
      color = theme.notification.status.warning.color;
      icon = <Icons.StatusWarning color={iconColor} />;
      break;
    case 'good':
      color = theme.notification.status.good.color;
      icon = <Icons.StatusGood color={iconColor} />;
      break;
    case 'unknown':
      color = theme.notification.status.unknown.color;
      icon = <Icons.StatusUnknown color={iconColor} />;
      break;
    default:
      color = theme.notification.status.unknown.color;
      icon = <Icons.StatusUnknown color={iconColor} />;
      break;
  }

  let content = (
    <>
      <Box
        round={iconContainerRound}
        background={color}
        pad={iconContainerPad}
        justify="center"
      >
        {icon}
      </Box>
      <Box
        align="start"
        direction="row"
        justify="between"
        pad={textContainerPad}
        fill
      >
        <Box>
          <Text size={messageTextSize} weight={messageTextWeight}>
            {message}
          </Text>
          {body && <Text size={bodyTextSize}>{body}</Text>}
        </Box>
        <Button
          margin={buttonMargin}
          icon={<Icons.FormClose color={iconColor} />}
          onClick={onClose}
          plain
        />
      </Box>
    </>
  );

  if (toast) {
    content = (
      <Layer animation="fadeIn" modal={false} onEsc={onClose}>
        <Box
          gap={containerGap}
          elevation={containerElevation}
          round={containerRound}
          direction="row"
        >
          {content}
        </Box>
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
