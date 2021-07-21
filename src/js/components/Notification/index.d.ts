import * as React from 'react';

export type StatusType = 'warning' | 'ok' | 'unknown';
export type NotificationSize = 'medium' | 'large';

export interface NotificationProps {
  message: string;
  body?: string;
  status?: StatusType;
  toast?: object | boolean;
  onClose?: void;
  size?: NotificationSize;
}

declare const Notification: React.FC<NotificationProps>;

export { Notification };
