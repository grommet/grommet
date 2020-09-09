import React, { useState, useContext } from 'react';
import EventEmitter from 'event-emitter';
import { v1 as uuid } from 'uuid';
import { ThemeContext } from 'styled-components';

import { Layer } from '../Layer';
import { defaultProps } from '../../default-props';
import { Toast } from './Toast';

const emitter = new EventEmitter();

let timeoutId;

export const addNotification = (type, config) => {
  const id = uuid();
  emitter.emit('addNotification', id, type, config);
  return id;
};

export const addToast = config => {
  return addNotification('toast', config);
};

export const removeNotification = id => {
  emitter.emit('removeNotification', id);
};

export function Notification() {
  const theme = useContext(ThemeContext) || defaultProps.theme;

  const [notifications, setNotifications] = useState([]);

  const deleteNotification = deleteId => {
    setNotifications(notifications.filter(({ id }) => deleteId !== id));
  };

  const deleteLast = () => {
    if (notifications.length) {
      deleteNotification(notifications[0].id);
    }
  };

  const autoRemoveNotification = timeout => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => deleteLast(), timeout);
  };

  emitter.on('removeNotification', id => {
    deleteNotification(id);
  });

  emitter.on('addNotification', (id, type, config) => {
    setNotifications([...notifications, { id, type, config }]);
  });

  if (!notifications.length) {
    return null;
  }

  if (notifications.length)
    autoRemoveNotification(theme.notification.toast.timeout || 2000);

  return (
    <Layer
      position={theme.notification.toast.position}
      modal={false}
      margin={{ vertical: 'medium', horizontal: 'small' }}
      onEsc={deleteLast}
      responsive={false}
      style={{
        zIndex: theme.notification.toast.zIndex,
        maxWidth: theme.notification.toast.width,
      }}
      plain
    >
      {notifications.map(({ id, config: { msg, type } }) => (
        <Toast id={id} msg={msg} type={type} onClose={deleteNotification} />
      ))}
    </Layer>
  );
}
