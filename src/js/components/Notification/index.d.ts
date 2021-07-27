import * as React from 'react';

export type StatusType = 'critical' | 'warning' | 'good' | 'unknown';

export interface NotificationProps {
  message: string;
  body?: string;
  status?: StatusType;
  toast?: boolean;
  onClose?: (...args: any[]) => any;
}

declare const Notification: React.FC<NotificationProps>;

export { Notification };
