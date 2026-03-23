import { createTheme } from '@vanilla-extract/css';

import { normalizeColor } from '../utils/colors';
import { generate } from './base';
import { vars } from './theme.contract.css';

const isPlainObject = (value: unknown): value is Record<string, unknown> =>
  Boolean(value) && typeof value === 'object' && !Array.isArray(value);

const toSerializableValue = (value: unknown, theme: Record<string, unknown>): unknown => {
  if (Array.isArray(value)) {
    return value.map((item) => toSerializableValue(item, theme));
  }

  if (isPlainObject(value)) {
    const entries = Object.entries(value)
      .map(([key, child]) => [key, toSerializableValue(child, theme)] as const)
      .filter(([, child]) => child !== undefined);

    return entries.length ? Object.fromEntries(entries) : undefined;
  }

  if (typeof value === 'string') {
    return normalizeColor(value, theme as never) || value;
  }

  if (typeof value === 'number' || typeof value === 'boolean') {
    return value;
  }

  return undefined;
};

const stringifyThemeValues = (
  value: unknown,
): Record<string, unknown> | string | undefined => {
  if (isPlainObject(value)) {
    const entries = Object.entries(value)
      .map(([key, child]) => [key, stringifyThemeValues(child)] as const)
      .filter(([, child]) => child !== undefined);

    return entries.length ? Object.fromEntries(entries) : undefined;
  }

  if (Array.isArray(value)) return JSON.stringify(value);
  if (typeof value === 'string') return value;
  if (typeof value === 'number' || typeof value === 'boolean') {
    return String(value);
  }

  return undefined;
};

// Pre-computed VE theme values derived from generate(24, 6).
// Color aliases are resolved to concrete CSS values for the default theme.
const baseTheme = generate(24, 6);
const serializedThemeValues = stringifyThemeValues(
  toSerializableValue(baseTheme, baseTheme),
);

if (!serializedThemeValues || typeof serializedThemeValues === 'string') {
  throw new Error('Failed to derive Vanilla Extract theme values from generate(24, 6).');
}

export const grommetTheme = createTheme(vars, serializedThemeValues);