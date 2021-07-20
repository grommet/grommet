import * as React from 'react';

export type StatusType = 'critical' | 'warning' | 'success' | 'unknown';

export interface NotificationProps {
  message: string;
  status?: StatusType;
  toast?: object | boolean;
  onClose?: void;
}

declare const Notification: React.FC<NotificationProps>;

export { Notification };
