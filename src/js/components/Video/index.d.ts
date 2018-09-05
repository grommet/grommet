import * as React from "react";

export interface VideoProps {
  autoPlay?: boolean;
  controls?: "false" | "over" | "below";
  fit?: "cover" | "contain";
  loop?: boolean;
  mute?: boolean;
}

declare const Video: React.StatelessComponent<VideoProps>;

export { Video };
