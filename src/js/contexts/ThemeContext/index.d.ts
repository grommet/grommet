import * as React from 'react';

export type ThemeValue = object;

export interface ThemeContextI extends React.Context<ThemeValue> {
  Extend: React.FC<{
    value: ThemeValue;
    children: React.ReactNode;
  }>;
}

declare const ThemeContext: ThemeContextI;

export { ThemeContext };
