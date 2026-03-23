import { style, styleVariants } from '@vanilla-extract/css';

import { vars } from '../themes/theme.contract.css';

const themeVars = vars as any;
const toMetric = (value, theme) => theme.global.edgeSize?.[value] || value;

export const baseStyle = style({
  fontFamily: themeVars.global.font.family,
  fontSize: themeVars.global.font.size,
  lineHeight: themeVars.global.font.height,
  boxSizing: 'border-box',
  WebkitTextSizeAdjust: '100%',
  WebkitFontSmoothing: 'antialiased',
});

export const controlBorderStyle = style({
  borderStyle: 'solid',
  borderWidth: themeVars.global.control.border.width,
  borderColor: themeVars.global.control.border.color,
  borderRadius: themeVars.global.control.border.radius,
});

export const fillStyleVariants = styleVariants({
  horizontal: { width: '100%' },
  vertical: { height: '100%' },
  both: { width: '100%', height: '100%' },
});

export const focusStyle = style({
  selectors: {
    '&:focus': {
      outline: 'none',
      boxShadow: `0 0 ${themeVars.global.focus.shadow.size} ${themeVars.global.focus.shadow.size} ${themeVars.global.focus.shadow.color}`,
    },
    '&:focus:not(:focus-visible)': {
      boxShadow: 'none',
    },
  },
});

export const focusInsetStyle = style({
  selectors: {
    '&:focus': {
      outline: 'none',
      boxShadow: `inset 0 0 ${themeVars.global.focus.shadow.size} ${themeVars.global.focus.shadow.size} ${themeVars.global.focus.shadow.color}`,
    },
    '&:focus:not(:focus-visible)': {
      boxShadow: 'none',
    },
  },
});

export const genericStyle = style({
  boxSizing: 'border-box',
});

export const resolveEdgeStyle = (kind, data, theme) => {
  if (!data) return undefined;

  if (typeof data === 'string') {
    return { [kind]: toMetric(data, theme) };
  }

  const result = {};
  const { horizontal, vertical, top, bottom, left, right, start, end } = data;

  if (horizontal) {
    result[`${kind}Left`] = toMetric(horizontal, theme);
    result[`${kind}Right`] = toMetric(horizontal, theme);
  }
  if (vertical) {
    result[`${kind}Top`] = toMetric(vertical, theme);
    result[`${kind}Bottom`] = toMetric(vertical, theme);
  }
  if (top) result[`${kind}Top`] = toMetric(top, theme);
  if (bottom) result[`${kind}Bottom`] = toMetric(bottom, theme);
  if (left) result[`${kind}Left`] = toMetric(left, theme);
  if (right) result[`${kind}Right`] = toMetric(right, theme);
  if (start) result[`${kind}InlineStart`] = toMetric(start, theme);
  if (end) result[`${kind}InlineEnd`] = toMetric(end, theme);

  return Object.keys(result).length ? result : undefined;
};

export const resolveFillStyle = (fillProp) => {
  if (fillProp === 'horizontal') return { width: '100%' };
  if (fillProp === 'vertical') return { height: '100%' };
  if (fillProp) return { width: '100%', height: '100%' };
  return undefined;
};
