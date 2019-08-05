import * as React from "react";
import { Omit, MarginType } from "../../utils";

export interface VideoProps {
  a11yTitle?: string;
  alignSelf?: "start" | "center" | "end" | "stretch";
  gridArea?: string;
  margin?: MarginType;
  autoPlay?: boolean;
  controls?: "false" | "over" | "below";
  fit?: "cover" | "contain";
  loop?: boolean;
  mute?: boolean;
}

declare const Video: React.ComponentClass<VideoProps & JSX.IntrinsicElements['video'] & Omit<JSX.IntrinsicElements['video'], 'controls'>>;

export { Video };
