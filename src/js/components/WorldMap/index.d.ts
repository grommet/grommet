import * as React from "react";

export interface WorldMapProps {
  color?: string;
  continents?: {color: string,name: "Africa" | "Asia" | "Australia" | "Europe" | "North America" | "South America",onClick: (...args: any[]) => any,onHover: (...args: any[]) => any}[];
  onSelectPlace?: (...args: any[]) => any;
  places?: {color: string,name: string,location: number[],onClick: (...args: any[]) => any,onHover: (...args: any[]) => any}[];
  hoverColor?: string;
}

declare const WorldMap: React.StatelessComponent<WorldMapProps>;

export { WorldMap };
