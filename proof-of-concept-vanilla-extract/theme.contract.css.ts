/**
 * Grommet Theme Contract for Vanilla Extract
 *
 * This defines the type-safe structure of the Grommet theme.
 * All theme implementations must conform to this contract.
 */

import { createThemeContract } from '@vanilla-extract/css';

/**
 * Theme contract defines the shape of theme variables
 * Values are null - actual values provided in theme implementations
 */
export const themeVars = createThemeContract({
  // Global colors
  color: {
    brand: null,
    text: null,
    textStrong: null,
    textWeak: null,
    background: null,
    backgroundFront: null,
    backgroundBack: null,
    border: null,
    focus: null,
    active: null,
    activeBackground: null,
    activeText: null,
    control: null,
    placeholder: null,
    selected: null,
    selectedBackground: null,
    selectedText: null,
    white: null,
    black: null,
    // Status colors
    statusCritical: null,
    statusError: null,
    statusWarning: null,
    statusOk: null,
    statusUnknown: null,
    statusDisabled: null,
    // Accent colors
    accent1: null,
    accent2: null,
    accent3: null,
    accent4: null,
  },

  // Global sizing
  edgeSize: {
    none: null,
    hair: null,
    xxsmall: null,
    xsmall: null,
    small: null,
    medium: null,
    large: null,
    xlarge: null,
  },

  // Global spacing
  spacing: {
    none: null,
    xxsmall: null,
    xsmall: null,
    small: null,
    medium: null,
    large: null,
    xlarge: null,
    xxlarge: null,
  },

  // Typography
  text: {
    small: {
      size: null,
      height: null,
      maxWidth: null,
    },
    medium: {
      size: null,
      height: null,
      maxWidth: null,
    },
    large: {
      size: null,
      height: null,
      maxWidth: null,
    },
    xlarge: {
      size: null,
      height: null,
      maxWidth: null,
    },
    xxlarge: {
      size: null,
      height: null,
      maxWidth: null,
    },
  },

  // Font
  font: {
    family: null,
    size: null,
    height: null,
  },

  // Button-specific theme
  button: {
    // Padding
    padding: {
      vertical: null,
      horizontal: null,
    },

    // Border
    border: {
      width: null,
      radius: null,
      color: null,
    },

    // Sizes
    size: {
      small: {
        border: {
          radius: null,
        },
        pad: {
          vertical: null,
          horizontal: null,
        },
        iconOnly: {
          pad: null,
        },
      },
      medium: {
        border: {
          radius: null,
        },
        pad: {
          vertical: null,
          horizontal: null,
        },
        iconOnly: {
          pad: null,
        },
      },
      large: {
        border: {
          radius: null,
        },
        pad: {
          vertical: null,
          horizontal: null,
        },
        iconOnly: {
          pad: null,
        },
      },
    },

    // Default button
    default: {
      background: null,
      borderColor: null,
      color: null,
    },

    // Primary button
    primary: {
      background: null,
      borderColor: null,
      color: null,
      fontWeight: null,
    },

    // Secondary button
    secondary: {
      background: null,
      borderColor: null,
      color: null,
    },

    // Hover states
    hover: {
      default: {
        background: null,
        borderColor: null,
        color: null,
      },
      primary: {
        background: null,
        borderColor: null,
        color: null,
      },
      secondary: {
        background: null,
        borderColor: null,
        color: null,
      },
    },

    // Active state
    active: {
      background: null,
      color: null,
    },

    // Disabled state
    disabled: {
      opacity: null,
    },

    // Transition
    transition: {
      duration: null,
      timing: null,
    },
  },

  // Focus
  focus: {
    border: {
      color: null,
    },
    shadow: {
      color: null,
      size: null,
    },
  },

  // Hover
  hover: {
    background: null,
  },
});

/**
 * Type helper to extract theme type from contract
 * This ensures type safety when creating themes
 */
export type GrommetTheme = typeof themeVars;
