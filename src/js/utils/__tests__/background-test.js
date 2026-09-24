// SPDX-FileCopyrightText: © Hewlett Packard Enterprise Development LP
// SPDX-License-Identifier: Apache-2.0
import { backgroundAndTextColors } from '..';
import { base } from '../../themes/base';

describe('backgroundAndTextColors', () => {
  // https://github.com/grommet/grommet/issues/8151
  // opacity 'medium' (0.4 alpha) makes colorIsDark() return undefined
  // (can't tell). That unknown shade must fall back to the ambient
  // theme.dark, not be coerced to false and force the light-mode text.
  test('undetermined shade falls back to theme.dark on dark theme', () => {
    const theme = { ...base, dark: true };
    const [, textColor] = backgroundAndTextColors(
      { color: 'white', opacity: 'medium' },
      undefined,
      theme,
    );
    expect(textColor).toBe(theme.global.colors.text.dark);
  });

  test('undetermined shade falls back to theme.dark on light theme', () => {
    const theme = { ...base, dark: false };
    const [, textColor] = backgroundAndTextColors(
      { color: 'white', opacity: 'medium' },
      undefined,
      theme,
    );
    expect(textColor).toBe(theme.global.colors.text.light);
  });
});
