// SPDX-FileCopyrightText: © Hewlett Packard Enterprise Development LP
// SPDX-License-Identifier: Apache-2.0
export var LEGACY_COLOR_IS_DARK = Symbol('legacyColorIsDark');

// Brightness weights documented by Had2Know's legacy contrast calculator.
// https://www.had2know.org/technology/color-contrast-calculator-web-design.html
var RED_BRIGHTNESS_COEFFICIENT = 299;
var GREEN_BRIGHTNESS_COEFFICIENT = 587;
var BLUE_BRIGHTNESS_COEFFICIENT = 114;
var BRIGHTNESS_COEFFICIENT_DIVISOR = 1000;

// Legacy cutoff; the source's 125 threshold is for color-pair difference.
var DARK_BRIGHTNESS_THRESHOLD = 125;
export var legacyColorIsDark = function legacyColorIsDark(red, green, blue) {
  var brightness = (RED_BRIGHTNESS_COEFFICIENT * red + GREEN_BRIGHTNESS_COEFFICIENT * green + BLUE_BRIGHTNESS_COEFFICIENT * blue) / BRIGHTNESS_COEFFICIENT_DIVISOR;
  return brightness < DARK_BRIGHTNESS_THRESHOLD;
};