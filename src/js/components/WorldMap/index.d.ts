import * as React from "react";
import { A11yTitleType, AlignSelfType, GridAreaType, MarginType } from "../../utils";

export interface WorldMapProps {
  a11yTitle?: A11yTitleType;
  alignSelf?: AlignSelfType;
  gridArea?: GridAreaType;
  margin?: MarginType;
  color?: string | {dark?: string,light?: string};
  continents?: {color?: string | {dark?: string,light?: string},name: "Africa" | "Asia" | "Australia" | "Europe" | "North America" | "South America",onClick?: ((...args: any[]) => any),onHover?: ((...args: any[]) => any)}[];
  onSelectPlace?: ((...args: any[]) => any);
  places?: {color?: string | {dark?: string,light?: string},name?: string,location: number[],onClick?: ((...args: any[]) => any),onHover?: ((...args: any[]) => any)}[];
  hoverColor?: string | {dark?: string,light?: string};
}

declare const WorldMap: React.ComponentClass<WorldMapProps & JSX.IntrinsicElements['svg']>;

export { WorldMap };
