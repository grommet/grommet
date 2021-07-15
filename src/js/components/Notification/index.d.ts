import * as React from 'react';
import {
  A11yTitleType,
  AlignSelfType,
  GridAreaType,
  JustifyContentType,
  MarginType,
} from '../../utils';

export interface NotificationProps {
  a11yTitle?: A11yTitleType;
  alignSelf?: AlignSelfType;
  gridArea?: GridAreaType;
  justifyContent?: JustifyContentType;
  margin?: MarginType;
  size?: 'small' | 'medium' | 'large' | 'xlarge' | string;
}

declare const Notification: React.FC<NotificationProps>;

export { Notification };
