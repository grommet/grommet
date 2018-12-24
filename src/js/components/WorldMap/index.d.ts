import * as React from 'react';
import {
  AnyFunction,
  GrommetAlignSelfOrJustify,
  GrommetMargin,
} from '../../types/common';

export interface WorldMapProps {
  a11yTitle?: string;
  alignSelf?: GrommetAlignSelfOrJustify;
  gridArea?: string;
  margin?: GrommetMargin;
  color?: string | {dark?: string,light?: string};
  continents?: {
    color: string  | {dark?: string,light?: string},
    name: 'Africa' | 'Asia' | 'Australia' | 'Europe' | 'North America' | 'South America',
    onClick: AnyFunction,
    onHover: AnyFunction,
  }[];
  onSelectPlace?: AnyFunction;
  places?: {color: string  | {dark?: string,light?: string}, name: string, location: number[], onClick: AnyFunction, onHover: AnyFunction}[];
  hoverColor?: string;
}

declare const WorldMap: React.ComponentType<WorldMapProps>;

export { WorldMap };
