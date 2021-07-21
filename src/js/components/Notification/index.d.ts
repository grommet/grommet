import * as React from 'react';

export type StatusType = 'warning' | 'success' | 'unknown';
export type NotificationSize = 'short' | 'long';

export interface NotificationProps {
  message: string;
  status?: StatusType;
  toast?: object | boolean;
  onClose?: void;
  size?: NotificationSize;
}

declare const Notification: React.FC<NotificationProps>;

export { Notification };
