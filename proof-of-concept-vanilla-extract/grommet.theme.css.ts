/**
 * Grommet Base Theme - Vanilla Extract Implementation
 *
 * This implements the Grommet base theme using Vanilla Extract's createTheme.
 * It provides concrete values for all theme variables defined in the contract.
 */

import { createTheme } from '@vanilla-extract/css';
import { themeVars } from './theme.contract.css';

/**
 * Light theme (default)
 * Maps to Grommet's base theme values
 */
export const lightTheme = createTheme(themeVars, {
  // Global colors
  color: {
    brand: '#7D4CDB',
    text: '#444444',
    textStrong: '#000000',
    textWeak: '#555555',
    background: '#FFFFFF',
    backgroundFront: '#FFFFFF',
    backgroundBack: '#EDEDED',
    border: 'rgba(0, 0, 0, 0.33)',
    focus: '#6FFFB0',
    active: 'rgba(221, 221, 221, 0.5)',
    activeBackground: 'rgba(51, 51, 51, 0.1)',
    activeText: '#000000',
    control: '#7D4CDB',
    placeholder: '#AAAAAA',
    selected: '#7D4CDB',
    selectedBackground: '#7D4CDB',
    selectedText: '#FFFFFF',
    white: '#FFFFFF',
    black: '#000000',
    // Status colors
    statusCritical: '#EB0000',
    statusError: '#B30000',
    statusWarning: '#C27B00',
    statusOk: '#009E67',
    statusUnknown: '#919191',
    statusDisabled: '#CCCCCC',
    // Accent colors
    accent1: '#6FFFB0',
    accent2: '#FD6FFF',
    accent3: '#81FCED',
    accent4: '#FFCA58',
  },

  // Global sizing
  edgeSize: {
    none: '0px',
    hair: '1px',
    xxsmall: '3px',
    xsmall: '6px',
    small: '12px',
    medium: '24px',
    large: '48px',
    xlarge: '96px',
  },

  // Global spacing
  spacing: {
    none: '0px',
    xxsmall: '3px',
    xsmall: '6px',
    small: '12px',
    medium: '24px',
    large: '48px',
    xlarge: '96px',
    xxlarge: '192px',
  },

  // Typography
  text: {
    small: {
      size: '14px',
      height: '20px',
      maxWidth: '336px',
    },
    medium: {
      size: '18px',
      height: '24px',
      maxWidth: '432px',
    },
    large: {
      size: '22px',
      height: '28px',
      maxWidth: '528px',
    },
    xlarge: {
      size: '26px',
      height: '32px',
      maxWidth: '624px',
    },
    xxlarge: {
      size: '34px',
      height: '40px',
      maxWidth: '816px',
    },
  },

  // Font
  font: {
    family: `-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Fira Sans", "Droid Sans", "Helvetica Neue", Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"`,
    size: '18px',
    height: '24px',
  },

  // Button-specific theme
  button: {
    // Padding
    padding: {
      vertical: '4px',
      horizontal: '22px',
    },

    // Border
    border: {
      width: '2px',
      radius: '18px',
      color: 'rgba(0, 0, 0, 0.33)',
    },

    // Sizes
    size: {
      small: {
        border: {
          radius: '18px',
        },
        pad: {
          vertical: '4px',
          horizontal: '20px',
        },
        iconOnly: {
          pad: '4px',
        },
      },
      medium: {
        border: {
          radius: '18px',
        },
        pad: {
          vertical: '4px',
          horizontal: '22px',
        },
        iconOnly: {
          pad: '4px',
        },
      },
      large: {
        border: {
          radius: '24px',
        },
        pad: {
          vertical: '8px',
          horizontal: '32px',
        },
        iconOnly: {
          pad: '8px',
        },
      },
    },

    // Default button
    default: {
      background: 'transparent',
      borderColor: 'rgba(0, 0, 0, 0.33)',
      color: '#444444',
    },

    // Primary button
    primary: {
      background: '#7D4CDB',
      borderColor: '#7D4CDB',
      color: '#FFFFFF',
      fontWeight: 'bold',
    },

    // Secondary button
    secondary: {
      background: 'transparent',
      borderColor: '#7D4CDB',
      color: '#7D4CDB',
    },

    // Hover states
    hover: {
      default: {
        background: 'rgba(51, 51, 51, 0.1)',
        borderColor: 'rgba(0, 0, 0, 0.33)',
        color: '#444444',
      },
      primary: {
        background: '#6D3CCC',
        borderColor: '#6D3CCC',
        color: '#FFFFFF',
      },
      secondary: {
        background: 'rgba(125, 76, 219, 0.1)',
        borderColor: '#7D4CDB',
        color: '#7D4CDB',
      },
    },

    // Active state
    active: {
      background: 'rgba(51, 51, 51, 0.1)',
      color: '#000000',
    },

    // Disabled state
    disabled: {
      opacity: '0.3',
    },

    // Transition
    transition: {
      duration: '0.1s',
      timing: 'ease-in-out',
    },
  },

  // Focus
  focus: {
    border: {
      color: '#6FFFB0',
    },
    shadow: {
      color: '#6FFFB0',
      size: '2px',
    },
  },

  // Hover
  hover: {
    background: 'rgba(0, 0, 0, 0.05)',
  },
});

/**
 * Dark theme
 * Alternative theme for dark mode
 */
export const darkTheme = createTheme(themeVars, {
  // Global colors
  color: {
    brand: '#7D4CDB',
    text: '#f8f8f8',
    textStrong: '#FFFFFF',
    textWeak: '#CCCCCC',
    background: '#000000',
    backgroundFront: '#444444',
    backgroundBack: 'rgba(51, 51, 51, 0.08)',
    border: 'rgba(255, 255, 255, 0.33)',
    focus: '#6FFFB0',
    active: 'rgba(221, 221, 221, 0.5)',
    activeBackground: 'rgba(255, 255, 255, 0.18)',
    activeText: '#FFFFFF',
    control: '#6FFFB0',
    placeholder: '#AAAAAA',
    selected: '#7D4CDB',
    selectedBackground: '#7D4CDB',
    selectedText: '#FFFFFF',
    white: '#FFFFFF',
    black: '#000000',
    // Status colors (same as light)
    statusCritical: '#EB0000',
    statusError: '#B30000',
    statusWarning: '#C27B00',
    statusOk: '#009E67',
    statusUnknown: '#919191',
    statusDisabled: '#CCCCCC',
    // Accent colors (same as light)
    accent1: '#6FFFB0',
    accent2: '#FD6FFF',
    accent3: '#81FCED',
    accent4: '#FFCA58',
  },

  // Rest of the values (same as light theme for now)
  edgeSize: lightTheme.edgeSize,
  spacing: lightTheme.spacing,
  text: lightTheme.text,
  font: lightTheme.font,
  button: {
    ...lightTheme.button,
    default: {
      background: 'transparent',
      borderColor: 'rgba(255, 255, 255, 0.33)',
      color: '#f8f8f8',
    },
    hover: {
      default: {
        background: 'rgba(255, 255, 255, 0.18)',
        borderColor: 'rgba(255, 255, 255, 0.33)',
        color: '#f8f8f8',
      },
      primary: lightTheme.button.hover.primary,
      secondary: {
        background: 'rgba(125, 76, 219, 0.2)',
        borderColor: '#7D4CDB',
        color: '#7D4CDB',
      },
    },
  },
  focus: lightTheme.focus,
  hover: {
    background: 'rgba(255, 255, 255, 0.1)',
  },
});

/**
 * Export theme class names
 * Apply these to the root element to activate a theme
 */
export const themes = {
  light: lightTheme,
  dark: darkTheme,
};
