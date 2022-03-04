import * as React from 'react';
import { LayerPositionType } from '../Layer';
import { AnchorType } from '..';
export type StatusType = 'critical' | 'warning' | 'normal' | 'unknown';

export interface NotificationProps {
  actions?: AnchorType[];
  title?: string;
  message?: string;
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
