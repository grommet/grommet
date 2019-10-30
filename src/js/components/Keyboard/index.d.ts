import * as React from "react";
import { KeyboardType } from '../../utils';

export interface KeyboardProps {
  target?: "component" | "document";
  onBackspace?: KeyboardType;
  onComma?: KeyboardType;
  onDown?: KeyboardType;
  onEnter?: KeyboardType;
  onEsc?: KeyboardType;
  onKeyDown?: KeyboardType;
  onLeft?: KeyboardType;
  onRight?: KeyboardType;
  onShift?: KeyboardType;
  onSpace?: KeyboardType;
  onTab?: KeyboardType;
  onUp?: KeyboardType;
}

declare const Keyboard: React.FC<KeyboardProps>;

export { Keyboard };
