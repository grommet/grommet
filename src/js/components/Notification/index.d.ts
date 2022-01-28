import * as React from 'react';

export type StatusType = 'critical' | 'warning' | 'normal' | 'unknown';
export type NotificationPositionType =
  | 'bottom'
  | 'bottom-left'
  | 'bottom-right'
  | 'center'
  | 'hidden'
  | 'left'
  | 'right'
  | 'top'
  | 'top-left'
  | 'top-right';

export interface NotificationProps {
  title: string;
  message?: string;
  position?: NotificationPositionType;
  status?: StatusType;
  toast?: boolean;
  onClose?: (...args: any[]) => any;
}

declare const Notification: React.FC<NotificationProps>;

export { Notification };
