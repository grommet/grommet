import React, { forwardRef, useContext } from 'react';

import { ThemeContext } from 'styled-components';
import { defaultProps } from '../../default-props';

const Notification = forwardRef(() => {
  const theme = useContext(ThemeContext) || defaultProps.theme;
  return (
    <ThemeContext.Provider value={theme}>Notification</ThemeContext.Provider>
  );
});

Notification.displayName = 'Notification';

let NotificationDoc;
if (process.env.NODE_ENV !== 'production') {
  NotificationDoc = require('./doc').doc(Notification); // eslint-disable-line global-require
}
const NotificationWrapper = NotificationDoc || Notification;

export { NotificationWrapper as Notification };
