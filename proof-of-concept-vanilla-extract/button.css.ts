/**
 * Button Styles - Vanilla Extract Implementation
 *
 * This replaces StyledButtonKind.js with zero-runtime Vanilla Extract styles.
 * All styles are type-safe and extracted at build time.
 */

import {
  style,
  styleVariants,
  globalStyle,
  createVar,
} from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';
import { themeVars } from './theme.contract.css';

/**
 * Base button styles
 * Applied to all buttons
 */
export const baseButton = style({
  display: 'inline-block',
  boxSizing: 'border-box',
  cursor: 'pointer',
  font: 'inherit',
  textDecoration: 'none',
  margin: 0,
  background: 'transparent',
  overflow: 'visible',
  textTransform: 'none',
  border: 'none',

  // Default padding and border from theme
  padding: `${themeVars.button.padding.vertical} ${themeVars.button.padding.horizontal}`,
  borderRadius: themeVars.button.border.radius,
  borderWidth: themeVars.button.border.width,
  borderStyle: 'solid',

  // Typography
  fontSize: themeVars.text.medium.size,
  lineHeight: themeVars.text.medium.height,
  fontFamily: themeVars.font.family,

  // Transitions
  transitionProperty: 'color, background-color, border-color, box-shadow',
  transitionDuration: themeVars.button.transition.duration,
  transitionTimingFunction: themeVars.button.transition.timing,
});

/**
 * Icon alignment
 */
globalStyle(`${baseButton} > svg`, {
  display: 'flex',
  alignSelf: 'center',
  verticalAlign: 'middle',
});

/**
 * Size variants
 * Matches theme.button.size.{small|medium|large}
 */
export const sizeVariants = styleVariants({
  small: {
    borderRadius: themeVars.button.size.small.border.radius,
    padding: `${themeVars.button.size.small.pad.vertical} ${themeVars.button.size.small.pad.horizontal}`,
    fontSize: themeVars.text.small.size,
    lineHeight: themeVars.text.small.height,
  },

  medium: {
    borderRadius: themeVars.button.size.medium.border.radius,
    padding: `${themeVars.button.size.medium.pad.vertical} ${themeVars.button.size.medium.pad.horizontal}`,
    fontSize: themeVars.text.medium.size,
    lineHeight: themeVars.text.medium.height,
  },

  large: {
    borderRadius: themeVars.button.size.large.border.radius,
    padding: `${themeVars.button.size.large.pad.vertical} ${themeVars.button.size.large.pad.horizontal}`,
    fontSize: themeVars.text.large.size,
    lineHeight: themeVars.text.large.height,
  },
});

/**
 * Icon-only button variants
 * When button has icon but no label
 */
export const iconOnlyVariants = styleVariants({
  small: {
    padding: themeVars.button.size.small.iconOnly.pad,
    lineHeight: 0,
  },

  medium: {
    padding: themeVars.button.size.medium.iconOnly.pad,
    lineHeight: 0,
  },

  large: {
    padding: themeVars.button.size.large.iconOnly.pad,
    lineHeight: 0,
  },
});

/**
 * Button kind variants
 * default, primary, secondary
 */
export const kindVariants = styleVariants({
  default: {
    background: themeVars.button.default.background,
    borderColor: themeVars.button.default.borderColor,
    color: themeVars.button.default.color,

    ':hover:not(:disabled)': {
      background: themeVars.button.hover.default.background,
      borderColor: themeVars.button.hover.default.borderColor,
      color: themeVars.button.hover.default.color,
    },
  },

  primary: {
    background: themeVars.button.primary.background,
    borderColor: themeVars.button.primary.borderColor,
    color: themeVars.button.primary.color,
    fontWeight: themeVars.button.primary.fontWeight,

    ':hover:not(:disabled)': {
      background: themeVars.button.hover.primary.background,
      borderColor: themeVars.button.hover.primary.borderColor,
      color: themeVars.button.hover.primary.color,
    },
  },

  secondary: {
    background: themeVars.button.secondary.background,
    borderColor: themeVars.button.secondary.borderColor,
    color: themeVars.button.secondary.color,

    ':hover:not(:disabled)': {
      background: themeVars.button.hover.secondary.background,
      borderColor: themeVars.button.hover.secondary.borderColor,
      color: themeVars.button.hover.secondary.color,
    },
  },
});

/**
 * Plain button style
 * Minimal styling
 */
export const plainButton = style({
  outline: 'none',
  border: 'none',
  padding: 0,
  textAlign: 'inherit',
  color: 'inherit',
  background: 'transparent',
  transition: 'none',
});

globalStyle(`${plainButton} > svg`, {
  display: 'flex',
  alignSelf: 'center',
  verticalAlign: 'middle',
});

/**
 * State styles
 */
export const activeButton = style({
  background: themeVars.button.active.background,
  color: themeVars.button.active.color,
});

export const disabledButton = style({
  opacity: themeVars.button.disabled.opacity,
  cursor: 'default',
});

export const busyButton = style({
  cursor: 'default',
});

/**
 * Focus styles
 */
export const focusStyle = style({
  ':focus': {
    outline: 'none',
    boxShadow: `0 0 0 ${themeVars.focus.shadow.size} ${themeVars.focus.shadow.color}`,
  },

  ':focus:not(:focus-visible)': {
    boxShadow: 'none',
  },
});

export const focusInsetStyle = style({
  ':focus': {
    outline: 'none',
    boxShadow: `inset 0 0 0 ${themeVars.focus.shadow.size} ${themeVars.focus.shadow.color}`,
  },
});

/**
 * Hover indicator
 */
export const hoverIndicator = style({
  ':hover:not(:disabled)': {
    background: themeVars.hover.background,
  },
});

/**
 * Fill container variants
 */
export const fillVariants = styleVariants({
  horizontal: {
    width: '100%',
  },

  vertical: {
    height: '100%',
  },

  both: {
    width: '100%',
    height: '100%',
    maxWidth: 'none',
    flex: '1 0 auto',
  },
});

/**
 * Text alignment variants
 */
export const alignVariants = styleVariants({
  start: {
    textAlign: 'start',
  },

  center: {
    textAlign: 'center',
  },

  end: {
    textAlign: 'end',
  },
});

/**
 * Gap between icon and label
 */
export const withGap = style({
  display: 'inline-flex',
  alignItems: 'center',
  gap: themeVars.spacing.small,
});

/**
 * Reverse direction (icon after label)
 */
export const reverseDirection = style({
  flexDirection: 'row-reverse',
});

/**
 * Button Recipe
 * Combines all variants into a single composable recipe
 * This is the recommended way to use Vanilla Extract for components
 */
export const buttonRecipe = recipe({
  base: baseButton,

  variants: {
    // Size variant
    size: sizeVariants,

    // Kind variant
    kind: kindVariants,

    // Icon only
    iconOnly: {
      true: {
        lineHeight: 0,
      },
    },

    // Plain style
    plain: {
      true: plainButton,
    },

    // Active state
    active: {
      true: activeButton,
    },

    // Disabled state
    disabled: {
      true: disabledButton,
    },

    // Busy state
    busy: {
      true: busyButton,
    },

    // Focus indicator
    focusIndicator: {
      true: focusStyle,
      inset: focusInsetStyle,
    },

    // Hover indicator
    hoverIndicator: {
      true: hoverIndicator,
    },

    // Fill container
    fill: fillVariants,

    // Text alignment
    align: alignVariants,

    // Has gap (icon + label)
    hasGap: {
      true: withGap,
    },

    // Reverse direction
    reverse: {
      true: reverseDirection,
    },
  },

  // Compound variants
  // Special handling when multiple variants are combined
  compoundVariants: [
    {
      variants: {
        size: 'small',
        iconOnly: true,
      },
      style: iconOnlyVariants.small,
    },
    {
      variants: {
        size: 'medium',
        iconOnly: true,
      },
      style: iconOnlyVariants.medium,
    },
    {
      variants: {
        size: 'large',
        iconOnly: true,
      },
      style: iconOnlyVariants.large,
    },
  ],

  defaultVariants: {
    size: 'medium',
    kind: 'default',
  },
});

/**
 * Type helper for button recipe variants
 * Provides autocomplete and type checking
 */
export type ButtonVariants = Parameters<typeof buttonRecipe>[0];
