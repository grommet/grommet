import * as React from 'react';
import {
  A11yTitleType,
  AlignSelfType,
  GridAreaType,
  MarginType,
  PadType,
} from '../../utils';
import { BoxTypes } from '../Box';
import { GridSizeType } from '../Grid';
import { PaginationType } from '../Pagination';

export interface CardsProps<CardType> {
  a11yTitle?: A11yTitleType;
  alignSelf?: AlignSelfType;
  as?: string;
  children?: React.ReactNode;
  data?: CardType[];
  gridArea?: GridAreaType;
  onMore?: () => void;
  paginate?: boolean | PaginationType;
  show?: number | { page?: number };
  size?: GridSizeType,
  step?: number;
}

type ulProps = JSX.IntrinsicElements['ul'];

export interface CardsExtendedProps<CardType>
  extends CardsProps<CardType>,
    ulProps {}

declare const Cards: <CardType = string | {}>(
  p: React.PropsWithChildren<CardsExtendedProps<CardType>>,
) => React.ReactElement<CardsExtendedProps<CardType>>;

export { Cards };
