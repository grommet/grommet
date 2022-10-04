import * as React from 'react';
import { Icon } from 'grommet-icons';

export type StatusType = 'critical' | 'warning' | 'normal' | 'unknown';

export interface NotificationProps {
  title: string;
  message?: string;
  status?: StatusType;
  toast?: boolean;
  onClose?: (...args: any[]) => any;
  icon?: Icon;
}

declare const Notification: React.FC<NotificationProps>;

export { Notification };
