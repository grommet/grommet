import * as React from 'react';
import {
  A11yTitleType,
  AlignSelfType,
  GridAreaType,
  MarginType,
} from '../../utils';

export interface TableProps {
  a11yTitle?: A11yTitleType;
  alignSelf?: AlignSelfType;
  caption?: string;
  gridArea?: GridAreaType;
  margin?: MarginType;
}

type htmlTableProps = JSX.IntrinsicElements['table'];

export interface TableExtendedProps extends TableProps, htmlTableProps {}

declare const Table: React.FC<TableExtendedProps>;

export { Table };
