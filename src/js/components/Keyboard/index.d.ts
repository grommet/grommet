import * as React from 'react';
import { AnyFunction } from '../../types/common';

export interface KeyboardProps {
  target?: 'component' | 'document';
  onBackspace?: AnyFunction;
  onComma?: AnyFunction;
  onDown?: AnyFunction;
  onEnter?: AnyFunction;
  onEsc?: AnyFunction;
  onLeft?: AnyFunction;
  onRight?: AnyFunction;
  onShift?: AnyFunction;
  onSpace?: AnyFunction;
  onTab?: AnyFunction;
  onUp?: AnyFunction;
}

declare const Keyboard: React.ComponentType<KeyboardProps>;

export { Keyboard };
