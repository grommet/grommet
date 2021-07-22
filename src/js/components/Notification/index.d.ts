import * as React from 'react';

export type StatusType = 'warning' | 'good' | 'unknown';

export interface NotificationProps {
  message: string;
  body?: string;
  status?: StatusType;
  toast?: object | boolean;
  onClose?: void;
}

declare const Notification: React.FC<NotificationProps>;

export { Notification };
