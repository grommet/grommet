// SPDX-FileCopyrightText: © Hewlett Packard Enterprise Development LP
// SPDX-License-Identifier: Apache-2.0
import { css } from 'styled-components';
import {
  backgroundStyle,
  borderStyle,
  edgeStyle,
  elevationStyle,
  normalizeColor,
} from '../../utils';
import { roundStyle } from '../../utils/styles';

const baseKeys = [
  'background',
  'border',
  'elevation',
  'height',
  'margin',
  'pad',
  'round',
  'width',
];
const stateKeys = ['background', 'border', 'elevation', 'pad', 'round'];
const states = ['error', 'disabled', 'readOnly'];

export const owns = (object, key) =>
  object != null && Object.prototype.hasOwnProperty.call(object, key);

const isPlainObject = (value) =>
  value != null &&
  typeof value === 'object' &&
  Object.getPrototypeOf(value) === Object.prototype;

// Preserve legacy opt-outs: own undefined replaces an inherited value.
// Arrays and scalar values replace. Never mutate consumer theme values.
export const mergePart = (base, override) => {
  const result = { ...base };
  Object.keys(override || {}).forEach((key) => {
    const value = override[key];
    result[key] =
      isPlainObject(value) && isPlainObject(result[key])
        ? mergePart(result[key], value)
        : value;
  });
  return result;
};

const filterDefined = (value) => {
  if (Array.isArray(value))
    return value.filter((item) => item !== undefined).map(filterDefined);
  if (!isPlainObject(value)) return value;
  const result = {};
  Object.keys(value).forEach((key) => {
    if (value[key] !== undefined) result[key] = filterDefined(value[key]);
  });
  return result;
};

// Named parts inherit available fallbacks for missing/undefined values, even
// nested ones. This cannot recover values erased by an upstream deepMerge.
export const mergeDefinedPart = (base, override) =>
  mergePart(filterDefined(base), filterDefined(override));

export const getPartStyleProps = (part, keys = baseKeys) => {
  const result = {};
  keys.forEach((key) => {
    if (owns(part, key)) result[key] = part[key];
  });
  return result;
};

const getPartTheme = (part) => {
  const result = getPartStyleProps(part);
  if (part?.hover !== undefined)
    result.hover =
      part.hover === false ? false : getPartStyleProps(part.hover, stateKeys);
  states.forEach((state) => {
    if (part?.[state] !== undefined) {
      result[state] = getPartStyleProps(part[state], stateKeys);
      if (state === 'error' && part[state]?.hover !== undefined)
        result[state].hover =
          part[state].hover === false
            ? false
            : getPartStyleProps(part[state].hover, stateKeys);
    }
  });
  return filterDefined(result);
};

export const resolvePart = (base, input, state) => {
  const part = mergeDefinedPart(getPartTheme(base), getPartTheme(input));
  const selected = part[state];
  const props = mergeDefinedPart(
    getPartStyleProps(part),
    getPartStyleProps(selected, stateKeys),
  );
  let { hover } = part;
  const hasHover = hover !== undefined || selected?.hover !== undefined;
  if (selected?.hover !== undefined)
    hover =
      selected.hover === false
        ? false
        : mergeDefinedPart(hover, selected.hover);
  return { props, hover, hasHover, hasStatePad: selected?.pad !== undefined };
};

// Hover uses the same Box translators as ordinary part props. Unresolved
// undefined values emit no declaration; resolved fallbacks still apply.
// Border false/empty arrays reset borders; geometry changes reset old sides.
export const partHoverStyle = (hover, base, responsive, theme) => {
  const styles = [];
  if (hover.background !== undefined)
    styles.push(backgroundStyle(hover.background, theme, false));
  if (
    hover.border !== undefined &&
    hover.border !== 'between' &&
    hover.border?.side !== 'between'
  ) {
    if (hover.border === false || Array.isArray(hover.border)) {
      styles.push('border: none;');
      if (Array.isArray(hover.border) && hover.border.length)
        styles.push(borderStyle(hover.border, responsive, theme));
    } else if (
      isPlainObject(hover.border) &&
      Object.keys(hover.border).every((key) => key === 'color') &&
      base.border
    ) {
      // Keep the legacy color-only output stable, including border arrays.
      if (hover.border.color !== undefined)
        styles.push(css`
          border-color: ${normalizeColor(hover.border.color, theme)};
        `);
    } else {
      const border =
        isPlainObject(hover.border) && isPlainObject(base.border)
          ? mergePart(base.border, hover.border)
          : hover.border;
      styles.push('border: none;');
      styles.push(borderStyle(border, responsive, theme));
    }
  }
  if (hover.elevation !== undefined)
    styles.push(elevationStyle(hover.elevation));
  if (hover.pad !== undefined)
    styles.push(
      edgeStyle(
        'padding',
        hover.pad,
        responsive,
        theme.box.responsiveBreakpoint,
        theme,
      ),
    );
  if (hover.round !== undefined)
    styles.push(
      hover.round === false
        ? 'border-radius: 0;'
        : roundStyle(hover.round, responsive, theme),
    );
  return styles;
};
