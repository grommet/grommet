import * as React from 'react';
// import { Omit } from "../../utils";
import { DropProps } from '../Drop';

export interface TipProps {
  content?: React.ReactNode;
  dropProps?: DropProps;
}

// TODO polish after resolving Box wrapper
// declare const Tip: React.ComponentClass<TipProps & Omit<JSX.IntrinsicElements['TODO'], 'title'>>;
declare const Tip: React.ComponentClass<TipProps>;

export { Tip };
