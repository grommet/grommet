// SPDX-FileCopyrightText: © Hewlett Packard Enterprise Development LP
// SPDX-License-Identifier: Apache-2.0
export const LEGACY_COLOR_IS_DARK = Symbol('legacyColorIsDark');

// Brightness weights documented by Had2Know's legacy contrast calculator.
// https://www.had2know.org/technology/color-contrast-calculator-web-design.html
const RED_BRIGHTNESS_COEFFICIENT = 299;
const GREEN_BRIGHTNESS_COEFFICIENT = 587;
const BLUE_BRIGHTNESS_COEFFICIENT = 114;
const BRIGHTNESS_COEFFICIENT_DIVISOR = 1000;

// Legacy cutoff; the source's 125 threshold is for color-pair difference.
const DARK_BRIGHTNESS_THRESHOLD = 125;

export const legacyColorIsDark = (red, green, blue) => {
  const brightness =
    (RED_BRIGHTNESS_COEFFICIENT * red +
      GREEN_BRIGHTNESS_COEFFICIENT * green +
      BLUE_BRIGHTNESS_COEFFICIENT * blue) /
    BRIGHTNESS_COEFFICIENT_DIVISOR;
  return brightness < DARK_BRIGHTNESS_THRESHOLD;
};
