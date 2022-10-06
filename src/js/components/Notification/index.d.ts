import * as React from 'react';
import { LayerPositionType } from '../Layer';
import { AnchorType } from '..';
export type StatusType = 'critical' | 'warning' | 'normal' | 'info' | 'unknown';

export interface NotificationProps {
  actions?: AnchorType[];
  global?: boolean;
  title?: string;
  message?: string | React.ReactNode;
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
