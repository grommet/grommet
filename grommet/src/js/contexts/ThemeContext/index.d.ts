import * as React from 'react';

export type ThemeValue = object;

export interface ThemeContextI extends React.Context<ThemeValue> {
  Extend: React.ComponentType<{ value: ThemeValue }>;
}

declare const ThemeContext: ThemeContextI;

export { ThemeContext };
