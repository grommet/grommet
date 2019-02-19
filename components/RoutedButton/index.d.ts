import * as React from "react";

export interface RoutedButtonProps {
  path: string;
  method?: "push" | "replace";
}

declare const RoutedButton: React.ComponentClass<RoutedButtonProps & JSX.IntrinsicElements['button']>;

export { RoutedButton };
