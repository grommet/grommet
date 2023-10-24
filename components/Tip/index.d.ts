import * as React from 'react';
import { DropType } from '../Drop';

export interface TipProps {
  children?: React.ReactNode;
  content?: React.ReactNode;
  dropProps?: DropType;
  plain?: boolean;
}

declare const Tip: React.FC<TipProps>;

export { Tip };
