import * as React from 'react';
import {
  A11yTitleType,
  AlignSelfType,
  ColorType,
  FillType,
  GridAreaType,
  MarginType,
} from '../../utils';

export interface WorldMapProps {
  a11yTitle?: A11yTitleType;
  alignSelf?: AlignSelfType;
  color?: ColorType;
  continents?: {
    color?: string | { dark?: string; light?: string };
    name:
      | 'Africa'
      | 'Asia'
      | 'Australia'
      | 'Europe'
      | 'North America'
      | 'South America';
    onClick?: (name: string) => void;
    onHover?: (hovered: boolean) => void;
  }[];
  fill?: FillType;
  gridArea?: GridAreaType;
  hoverColor?: string | { dark?: string; light?: string };
  margin?: MarginType;
  onSelectPlace?: (place: [number, number]) => void;
  places?: {
    color?: string | { dark?: string; light?: string };
    name?: string;
    location: number[];
    onClick?: (name: string) => void;
    onHover?: (hovered: boolean) => void;
  }[];
}

declare const WorldMap: React.ComponentClass<WorldMapProps &
  Omit<JSX.IntrinsicElements['svg'], 'color'>>;

export { WorldMap };
