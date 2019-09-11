import * as React from "react";

export interface KeyboardProps {
  target?: "component" | "document";
  onBackspace?: ((event: React.KeyboardEvent<HTMLElement>) => void);
  onComma?: ((event: React.KeyboardEvent<HTMLElement>) => void);
  onDown?: ((event: React.KeyboardEvent<HTMLElement>) => void);
  onEnter?: ((event: React.KeyboardEvent<HTMLElement>) => void);
  onEsc?: ((event: React.KeyboardEvent<HTMLElement>) => void);
  onKeyDown?: ((event: React.KeyboardEvent<HTMLElement>) => void);
  onLeft?: ((event: React.KeyboardEvent<HTMLElement>) => void);
  onRight?: ((event: React.KeyboardEvent<HTMLElement>) => void);
  onShift?: ((event: React.KeyboardEvent<HTMLElement>) => void);
  onSpace?: ((event: React.KeyboardEvent<HTMLElement>) => void);
  onTab?: ((event: React.KeyboardEvent<HTMLElement>) => void);
  onUp?: ((event: React.KeyboardEvent<HTMLElement>) => void);
}

declare const Keyboard: React.ComponentClass<KeyboardProps>;

export { Keyboard };
