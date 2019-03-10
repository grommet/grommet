import * as React from "react";
import { AnchorProps } from "../Anchor";
import { Omit } from "../../utils";

export interface RoutedAnchorProps {
  path: string;
  method?: "push" | "replace";
}

declare const RoutedAnchor: React.ComponentClass<RoutedAnchorProps & Omit<AnchorProps, "href">>;

export { RoutedAnchor };
