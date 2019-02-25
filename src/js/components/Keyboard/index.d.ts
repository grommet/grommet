import * as React from "react";

export interface KeyboardProps {
  target?: "component" | "document";
  onBackspace?: ((...args: any[]) => any);
  onComma?: ((...args: any[]) => any);
  onDown?: ((...args: any[]) => any);
  onEnter?: ((...args: any[]) => any);
  onEsc?: ((...args: any[]) => any);
  onKeyDown?: ((...args: any[]) => any);
  onLeft?: ((...args: any[]) => any);
  onRight?: ((...args: any[]) => any);
  onShift?: ((...args: any[]) => any);
  onSpace?: ((...args: any[]) => any);
  onTab?: ((...args: any[]) => any);
  onUp?: ((...args: any[]) => any);
}

declare const Keyboard: React.ComponentClass<KeyboardProps>;

export { Keyboard };
