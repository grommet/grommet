import React from 'react';
import { FormNextLink } from 'grommet-icons';

export const buttonKindTheme = {
  button: {
    default: {
      color: 'text',
      border: undefined,
      padding: {
        horizontal: '12px',
        vertical: '6px',
      },
      font: {
        weight: 700,
      },
    },
    primary: {
      background: {
        color: 'green',
      },
      border: undefined,
      color: 'text-strong',
      padding: {
        horizontal: '12px',
        vertical: '6px',
      },
      icon: <FormNextLink />,
    },
    secondary: {
      border: {
        color: 'green',
        width: '2px',
      },
      color: 'text',
      padding: {
        horizontal: '10px',
        vertical: '4px',
      },
    },
    option: {
      color: 'text',
      border: {
        radius: '0px',
      },
      padding: {
        horizontal: '12px',
        vertical: '6px',
      },
      font: {
        weight: 400,
      },
    },
    active: {
      background: {
        color: 'background-contrast',
      },
      color: 'text',
      secondary: {
        border: {
          color: 'transparent',
        },
      },
      option: {
        background: {
          color: 'active-background',
        },
      },
    },
    selected: {
      option: {
        background: 'selected-background',
        color: 'selected-text',
      },
    },
    disabled: {
      background: {
        color: 'transparent',
      },
      color: 'text-weak',
      primary: {
        border: {
          color: 'text-weak',
          width: '2px',
        },
        padding: {
          horizontal: '10px',
          vertical: '4px',
        },
        icon: <FormNextLink color="red" />,
      },
      secondary: {
        border: {
          color: 'text-weak',
        },
      },
      opacity: 1.0,
    },
    hover: {
      default: {
        background: {
          color: 'background-contrast',
        },
        color: undefined,
      },
      secondary: {
        border: {
          width: '3px',
        },
        padding: {
          horizontal: '9px',
          vertical: '3px',
        },
      },
      option: {
        background: 'active-background',
        color: 'active-text',
      },
    },
    size: {
      small: {
        border: {
          radius: '4px',
        },
        pad: {
          vertical: '4px',
          horizontal: '8px',
        },
      },
      medium: {
        border: {
          radius: '4px',
        },
        pad: {
          vertical: '4px',
          horizontal: '10px',
        },
      },
      large: {
        border: {
          radius: '6px',
        },
        pad: {
          vertical: '6px',
          horizontal: '16px',
        },
      },
    },
    border: {
      radius: '4px',
    },
    color: 'text-strong',
    padding: {
      vertical: '4px',
      horizontal: '10px',
    },
  },
};
