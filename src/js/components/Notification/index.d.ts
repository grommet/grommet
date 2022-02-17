import * as React from 'react';
import { LayerPositionType } from '../Layer';

export type StatusType = 'critical' | 'warning' | 'normal' | 'unknown';

export interface NotificationProps {
  href?: string;
  title?: string;
  message?: string;
  onClick?: (...args: any[]) => any;
  status?: StatusType;
  toast?:
    | boolean
    | {
        autoClose?: boolean;
        position?: LayerPositionType;
      };
  onClose?: (...args: any[]) => any;
}

declare const Notification: React.FC<NotificationProps>;

export { Notification };
