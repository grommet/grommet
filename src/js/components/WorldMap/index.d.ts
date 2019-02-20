import * as React from "react";

export interface WorldMapProps {
  a11yTitle?: string;
  alignSelf?: "start" | "center" | "end" | "stretch";
  gridArea?: string;
  margin?: "none" | "xxsmall" | "xsmall" | "small" | "medium" | "large" | "xlarge" | {bottom?: "xxsmall" | "xsmall" | "small" | "medium" | "large" | "xlarge" | string,horizontal?: "xxsmall" | "xsmall" | "small" | "medium" | "large" | "xlarge" | string,left?: "xxsmall" | "xsmall" | "small" | "medium" | "large" | "xlarge" | string,right?: "xxsmall" | "xsmall" | "small" | "medium" | "large" | "xlarge" | string,top?: "xxsmall" | "xsmall" | "small" | "medium" | "large" | "xlarge" | string,vertical?: "xxsmall" | "xsmall" | "small" | "medium" | "large" | "xlarge" | string} | string;
  color?: string | {dark?: string,light?: string};
  continents?: {color?: string | {dark?: string,light?: string},name: "Africa" | "Asia" | "Australia" | "Europe" | "North America" | "South America",onClick?: ((...args: any[]) => any),onHover?: ((...args: any[]) => any)}[];
  onSelectPlace?: ((...args: any[]) => any);
  places?: {color?: string | {dark?: string,light?: string},name?: string,location: number[],onClick?: ((...args: any[]) => any),onHover?: ((...args: any[]) => any)}[];
  hoverColor?: string | {dark?: string,light?: string};
}

declare const WorldMap: React.ComponentClass<WorldMapProps & JSX.IntrinsicElements['svg']>;

export { WorldMap };
