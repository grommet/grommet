import { styleVariants } from '@vanilla-extract/css';

import { vars } from '../themes/theme.contract.css';
import { normalizeColor } from './colors';

const themeVars = vars as any;
const sides = {
  all: {
    borderStyle: 'solid' as const,
    borderWidth: themeVars.global.borderSize.xsmall,
    borderColor: themeVars.global.colors.border,
  },
  top: {
    borderTopStyle: 'solid' as const,
    borderTopWidth: themeVars.global.borderSize.xsmall,
    borderTopColor: themeVars.global.colors.border,
  },
  bottom: {
    borderBottomStyle: 'solid' as const,
    borderBottomWidth: themeVars.global.borderSize.xsmall,
    borderBottomColor: themeVars.global.colors.border,
  },
  left: {
    borderLeftStyle: 'solid' as const,
    borderLeftWidth: themeVars.global.borderSize.xsmall,
    borderLeftColor: themeVars.global.colors.border,
  },
  right: {
    borderRightStyle: 'solid' as const,
    borderRightWidth: themeVars.global.borderSize.xsmall,
    borderRightColor: themeVars.global.colors.border,
  },
  start: {
    borderInlineStartStyle: 'solid' as const,
    borderInlineStartWidth: themeVars.global.borderSize.xsmall,
    borderInlineStartColor: themeVars.global.colors.border,
  },
  end: {
    borderInlineEndStyle: 'solid' as const,
    borderInlineEndWidth: themeVars.global.borderSize.xsmall,
    borderInlineEndColor: themeVars.global.colors.border,
  },
  vertical: {
    borderLeftStyle: 'solid' as const,
    borderLeftWidth: themeVars.global.borderSize.xsmall,
    borderLeftColor: themeVars.global.colors.border,
    borderRightStyle: 'solid' as const,
    borderRightWidth: themeVars.global.borderSize.xsmall,
    borderRightColor: themeVars.global.colors.border,
  },
  horizontal: {
    borderTopStyle: 'solid' as const,
    borderTopWidth: themeVars.global.borderSize.xsmall,
    borderTopColor: themeVars.global.colors.border,
    borderBottomStyle: 'solid' as const,
    borderBottomWidth: themeVars.global.borderSize.xsmall,
    borderBottomColor: themeVars.global.colors.border,
  },
};

export const borderSideStyle = styleVariants(sides);

const resolveBorderValue = (data, theme) => {
  const color = normalizeColor(data.color || 'border', theme);
  const borderSize = data.size || 'xsmall';
  const borderStyle = data.style || 'solid';

  return `${borderStyle} ${
    theme.global.borderSize[borderSize] || borderSize
  } ${color}`;
};

export const resolveBorderStyle = (borderData, theme) => {
  if (!borderData) return undefined;

  const styleObject: Record<string, string> = {};

  (Array.isArray(borderData) ? borderData : [borderData]).forEach((data) => {
    const borderValue = resolveBorderValue(data, theme);
    const side = typeof data === 'string' ? data : data.side || 'all';

    if (side === 'between') return;
    if (side === 'top') styleObject.borderTop = borderValue;
    else if (side === 'bottom') styleObject.borderBottom = borderValue;
    else if (side === 'left') styleObject.borderLeft = borderValue;
    else if (side === 'right') styleObject.borderRight = borderValue;
    else if (side === 'start') styleObject.borderInlineStart = borderValue;
    else if (side === 'end') styleObject.borderInlineEnd = borderValue;
    else if (side === 'vertical') {
      styleObject.borderLeft = borderValue;
      styleObject.borderRight = borderValue;
    } else if (side === 'horizontal') {
      styleObject.borderTop = borderValue;
      styleObject.borderBottom = borderValue;
    } else styleObject.border = borderValue;
  });

  return Object.keys(styleObject).length ? styleObject : undefined;
};
