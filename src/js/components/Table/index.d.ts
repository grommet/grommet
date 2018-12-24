import * as React from 'react';
import { GrommetAlignSelfOrJustify, GrommetMargin } from '../../types/common';

export interface TableProps {
  a11yTitle?: string;
  alignSelf?: GrommetAlignSelfOrJustify;
  gridArea?: string;
  margin?: GrommetMargin;
  caption?: string;
}

declare const Table: React.ComponentType<TableProps & JSX.IntrinsicElements['table']>;

export { Table };
