import * as React from "react";

export interface RoutedButtonProps {
  path: string;
  method?: "push" | "replace";
}

declare const RoutedButton: React.ComponentType<RoutedButtonProps>;

export { RoutedButton };
