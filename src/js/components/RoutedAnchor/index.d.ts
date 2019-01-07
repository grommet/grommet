import * as React from "react";

export interface RoutedAnchorProps {
  path: string;
  method?: "push" | "replace";
}

declare const RoutedAnchor: React.ComponentType<RoutedAnchorProps & JSX.IntrinsicElements['a']>;

export { RoutedAnchor };
