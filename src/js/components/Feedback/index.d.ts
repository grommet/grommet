import * as React from 'react';
import { LayerProps } from '../Layer/index';
export interface FeedbackProps {
  children?: React.ReactNode;
  layerProps?: LayerProps;
  messages?: object;
  modal?: boolean;
  show?: boolean;
  title?: string;
}

declare const Feedback: React.FC<FeedbackProps>;

export { Feedback };
