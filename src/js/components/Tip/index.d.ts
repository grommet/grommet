import * as React from 'react';
// import { Omit } from "../../utils";
import { DropProps } from '../Drop';

export interface TipProps {
  content?: React.ReactNode;
  dropProps?: DropProps;
  plain?: boolean;
}

declare const Tip: React.FC<TipProps>;

export { Tip };
