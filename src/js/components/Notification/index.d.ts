import * as React from 'react';

export type StatusType = 'critical' | 'warning' | 'normal' | 'unknown';
export type PositionType = 'top' | 'top-right';

export interface NotificationProps {
  title: string;
  message?: string;
  position?: PositionType;
  status?: StatusType;
  toast?: boolean;
  onClose?: (...args: any[]) => any;
}

declare const Notification: React.FC<NotificationProps>;

export { Notification };
