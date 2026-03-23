import { createThemeContract } from '@vanilla-extract/css';

import { generate } from './base';

const isPlainObject = (value: unknown): value is Record<string, unknown> =>
  Boolean(value) && typeof value === 'object' && !Array.isArray(value);

const toThemeContract = (value: unknown): Record<string, unknown> | null | undefined => {
  if (isPlainObject(value)) {
    const entries = Object.entries(value)
      .map(([key, child]) => [key, toThemeContract(child)] as const)
      .filter(([, child]) => child !== undefined);

    return entries.length ? Object.fromEntries(entries) : undefined;
  }

  if (
    Array.isArray(value) ||
    typeof value === 'string' ||
    typeof value === 'number' ||
    typeof value === 'boolean'
  ) {
    return null;
  }

  return undefined;
};

// Static VE contract generated from the default generate(24, 6) theme shape.
// Runtime-only values such as icon components are intentionally omitted.
const themeContractValues = toThemeContract(generate(24, 6));

if (!themeContractValues || themeContractValues === null) {
  throw new Error('Failed to derive Vanilla Extract theme contract from generate(24, 6).');
}

export const vars = createThemeContract(themeContractValues);
