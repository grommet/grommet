import * as React from "react";
import { LinkProps } from "../Link";
import { Omit } from "../../utils";

export interface RoutedAnchorProps {
  method?: "push" | "replace";
  path: string;
}

declare const RoutedAnchor: React.ComponentClass<RoutedAnchorProps & Omit<LinkProps, "href">>;

export { RoutedAnchor };
