import * as React from "react";
import { A11yTitleType, AlignSelfType, ColorType, GridAreaType, MarginType } from "../../utils";

export interface WorldMapProps {
  a11yTitle?: A11yTitleType;
  alignSelf?: AlignSelfType;
  color?: ColorType;
  continents?: {color?: string | {dark?: string,light?: string},name: "Africa" | "Asia" | "Australia" | "Europe" | "North America" | "South America",onClick?: ((event: React.MouseEvent<HTMLAnchorElement | HTMLButtonElement>) => void),onHover?: ((...args: any[]) => any)}[];
  gridArea?: GridAreaType;
  hoverColor?: string | {dark?: string,light?: string};
  margin?: MarginType;
  onSelectPlace?: ((...args: any[]) => any);
  places?: {color?: string | {dark?: string,light?: string},name?: string,location: number[],onClick?: ((event: React.MouseEvent<HTMLAnchorElement | HTMLButtonElement>) => void),onHover?: ((...args: any[]) => any)}[];
}

declare const WorldMap: React.ComponentClass<WorldMapProps & JSX.IntrinsicElements['svg']>;

export { WorldMap };
