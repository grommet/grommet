import * as React from 'react';

export type StatusType = 'critical' | 'warning' | 'normal' | 'unknown';
export type PositionType =
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
  status?: StatusType;
  toast?:
    | boolean
    | {
        position?: PositionType;
      };
  onClose?: (...args: any[]) => any;
}

declare const Notification: React.FC<NotificationProps>;

export { Notification };
