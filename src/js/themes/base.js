import { rgba } from 'polished';
import { css } from 'styled-components';

import {
  Actions,
  ClosedCaption,
  Expand,
  FormDown,
  FormNext,
  FormPrevious,
  FormUp,
  Next,
  Pause,
  Play,
  Previous,
  Subtract,
  Volume,
  VolumeLow,
} from 'grommet-icons';

import { colorForName, deepFreeze } from '../utils';

const brandColor = '#7D4CDB';
const accentColors = ['#FD6FFF', '#61EC9F', '#60EBE1', '#FFCA58'];
const neutralColors = ['#3D138D', '#BE60EB', '#00C781', '#6194EB', '#FFB202'];
const statusColors = {
  critical: '#EB6060',
  error: '#EB6060',
  warning: '#F7E463',
  ok: '#7CD992',
  unknown: '#a8a8a8',
  disabled: '#a8a8a8',
};
const darkColors = ['#333333', '#444444', '#555555', '#666666', '#777777', '#999999'];
const lightColors = ['#F6F6F6', '#EEEEEE', '#DDDDDD', '#CCCCCC', '#BBBBBB', '#AAAAAA'];
const textColor = '#444444';
const borderColor = 'rgba(0, 0, 0, 0.33)';
const borderColorDark = 'rgba(255, 255, 255, 0.33)';
const focusColor = accentColors[0];
const activeColor = rgba('#DDDDDD', 0.5);

const colors = {
  'active': activeColor,
  'black': '#000000',
  'border-light': borderColor,
  'border-dark': borderColorDark,
  'brand': brandColor,
  'focus': focusColor,
  'placeholder': '#AAAAAA',
  'text': textColor,
  'white': '#FFFFFF',
};

const colorArray = (array, prefix) =>
  array.forEach((color, index) => {
    colors[`${prefix}-${index + 1}`] = color;
  });

colorArray(accentColors, 'accent');
colorArray(darkColors, 'dark');
colorArray(lightColors, 'light');
colorArray(neutralColors, 'neutral');
Object.keys(statusColors).forEach((color) => {
  colors[`status-${color}`] = statusColors[color];
});

export const generate = (baseSpacing = 24, scale = 6) => { // 24
  const baseFontSize = baseSpacing * 0.75; // 18
  const fontScale = baseSpacing / scale; // 4

  const fontSizing = factor => ({
    size: `${baseFontSize + (factor * fontScale)}px`,
    height: `${baseSpacing + (factor * fontScale)}px`,
    // maxWidth chosen to be ~50 characters wide
    // see: https://ux.stackexchange.com/a/34125
    maxWidth: `${baseSpacing * (baseFontSize + (factor * fontScale))}px`,
  });

  const borderWidth = 2;

  const result = {
    global: {
      animation: {
        duration: '1s',
        jiggle: {
          duration: '0.1s',
        },
      },
      borderSize: {
        xsmall: '1px',
        small: '2px',
        medium: `${baseSpacing / 6}px`, // 4
        large: `${baseSpacing / 2}px`, // 12
        xlarge: `${baseSpacing}px`, // 24
        narrow: {
          xsmall: '1px',
          small: '2px',
          medium: `${baseSpacing / 6}px`, // 4
          large: `${baseSpacing / 4}px`, // 6
          xlarge: `${baseSpacing / 2}px`, // 12
        },
      },
      breakpoints: {
        narrow: 699,
      },
      colors,
      control: {
        border: {
          width: '1px',
          radius: '4px',
          color: {
            dark: css`${props => props.theme.global.colors['border-dark']}`,
            light: css`${props => props.theme.global.colors['border-light']}`,
          },
        },
        color: {
          dark: css`${props => props.theme.global.colors['accent-1']}`,
          light: css`${props => props.theme.global.colors.brand}`,
        },
      },
      drop: {
        background: '#ffffff',
        border: {
          width: '0px',
          radius: '0px',
        },
        shadow: {
          light: '0px 3px 8px rgba(100, 100, 100, 0.50)',
          dark: '0px 3px 8px rgba(255, 255, 255, 0.40)',
        },
      },
      edgeSize: {
        none: '0px',
        hair: '1px', // for Chart
        xxsmall: `${baseSpacing / 8}px`, // 3
        xsmall: `${baseSpacing / 4}px`, // 6
        small: `${baseSpacing / 2}px`, // 12
        medium: `${baseSpacing}px`, // 24
        large: `${baseSpacing * 2}px`, // 48
        xlarge: `${baseSpacing * 4}px`, // 96
        narrow: {
          none: '0px',
          hair: '1px', // for Chart
          xxsmall: '2px',
          xsmall: `${baseSpacing / 8}px`, // 3
          small: `${baseSpacing / 4}px`, // 6
          medium: `${baseSpacing / 2}px`, // 12
          large: `${baseSpacing}px`, // 24
          xlarge: `${baseSpacing * 2}px`, // 48
        },
      },
      elevation: {
        light: {
          none: 'none',
          xsmall: '0px 1px 2px rgba(100, 100, 100, 0.50)',
          small: '0px 2px 4px rgba(100, 100, 100, 0.50)',
          medium: '0px 3px 8px rgba(100, 100, 100, 0.50)',
          large: '0px 6px 12px rgba(100, 100, 100, 0.50)',
          xlarge: '0px 8px 16px rgba(100, 100, 100, 0.50)',
        },
        dark: {
          none: 'none',
          xsmall: '0px 2px 2px rgba(255, 255, 255, 0.40)',
          small: '0px 4px 4px rgba(255, 255, 255, 0.40)',
          medium: '0px 6px 8px rgba(255, 255, 255, 0.40)',
          large: '0px 8px 16px rgba(255, 255, 255, 0.40)',
          xlarge: '0px 10px 24px rgba(255, 255, 255, 0.40)',
        },
      },
      focus: {
        border: {
          color: css`${props => colorForName('focus', props.theme)}`,
          width: '2px',
        },
      },
      font: { ...fontSizing(0) },
      hover: {
        background: {
          dark: {
            color: 'active',
            opacity: 'medium',
          },
          light: {
            color: 'active',
            opacity: 'medium',
          },
        },
        color: {
          dark: 'white',
          light: 'black',
        },
      },
      input: {
        weight: 600,
      },
      opacity: {
        strong: '0.8',
        medium: '0.4',
        weak: '0.1',
      },
      spacing: `${baseSpacing}px`,
      size: {
        xxsmall: `${baseSpacing * 2}px`, // 48
        xsmall: `${baseSpacing * 4}px`, // 96
        small: `${baseSpacing * 8}px`, // 192
        medium: `${baseSpacing * 16}px`, // 384
        large: `${baseSpacing * 32}px`, // 768
        xlarge: `${baseSpacing * 48}px`, // 1152
        full: '100%',
        narrow: {
          xxsmall: `${baseSpacing}px`, // 24
          xsmall: `${baseSpacing * 2}px`, // 48
          small: `${baseSpacing * 4}px`, // 96
          medium: `${baseSpacing * 8}px`, // 192
          large: `${baseSpacing * 16}px`, // 384
          xlarge: `${baseSpacing * 32}px`, // 768
          full: '100%',
        },
      },
      text: {
        color: {
          dark: '#f8f8f8',
          light: textColor,
        },
      },
    },
    accordion: {
      icons: {
        collapse: FormUp,
        expand: FormDown,
        // color: { dark: undefined, light: undefined },
      },
    },
    anchor: {
      textDecoration: 'none',
      fontWeight: 600,
      color: {
        dark: '#6194EB',
        light: '#6194EB',
      },
    },
    button: {
      border: {
        // color: { dark: undefined, light: undefined }
        width: `${borderWidth}px`,
        radius: `${baseSpacing * 0.75}px`,
      },
      // color: { dark: undefined, light: undefined }
      primary: {
        // color: { dark: undefined, light: undefined }
      },
      disabled: {
        opacity: 0.3,
      },
      minWidth: `${baseSpacing * 4}px`,
      maxWidth: `${baseSpacing * 16}px`,
      padding: {
        vertical: `${(baseSpacing / 4) - borderWidth}px`,
        horizontal: `${baseSpacing - borderWidth}px`,
      },
    },
    calendar: {
      // daySize must align with global.size
      small: {
        fontSize: `${baseFontSize - fontScale}px`,
        lineHeight: 1.375,
        daySize: `${(baseSpacing * 8) / 7}px`,
        slideDuration: '0.2s',
      },
      medium: {
        fontSize: `${baseFontSize}px`,
        lineHeight: 1.45,
        daySize: `${(baseSpacing * 16) / 7}px`,
        slideDuration: '0.5s',
      },
      large: {
        fontSize: `${baseFontSize + fontScale}px`,
        lineHeight: 1.11,
        daySize: `${(baseSpacing * 32) / 7}px`,
        slideDuration: '0.8s',
      },
      icons: {
        previous: Previous,
        next: Next,
        small: {
          previous: FormPrevious,
          next: FormNext,
        },
      },
    },
    carousel: {
      icons: {
        current: Subtract,
        next: Next,
        previous: Previous,
        // color: undefined,
      },
    },
    checkBox: {
      border: {
        color: {
          dark: 'rgba(255, 255, 255, 0.5)',
          light: 'rgba(0, 0, 0, 0.15)',
        },
        radius: '4px',
        width: '2px',
      },
      check: {
        // color: { dark: undefined, light: undefined },
        width: '4px',
      },
      icons: {
        // checked: undefined,
      },
      hover: {
        border: {
          color: {
            dark: css`${props => colorForName('white', props.theme)}`,
            light: css`${props => colorForName('black', props.theme)}`,
          },
        },
      },
      size: `${baseSpacing}px`,
      toggle: {
        color: {
          dark: '#d9d9d9',
          light: '#d9d9d9',
        },
        radius: `${baseSpacing}px`,
        size: `${baseSpacing * 2}px`,
      },
    },
    clock: {
      analog: {
        hour: {
          color: {
            dark: css`${props => colorForName('light-3', props.theme)}`,
            light: css`${props => colorForName('dark-3', props.theme)}`,
          },
          width: `${baseSpacing / 3}px`,
          size: `${baseSpacing}px`,
          shape: 'round',
        },
        minute: {
          color: {
            dark: css`${props => colorForName('light-5', props.theme)}`,
            light: css`${props => colorForName('dark-5', props.theme)}`,
          },
          width: `${baseSpacing / 6}px`,
          size: `${Math.round(baseSpacing / 2)}px`,
          shape: 'round',
        },
        second: {
          color: {
            dark: css`${props => colorForName('accent-1', props.theme)}`,
            light: css`${props => colorForName('accent-1', props.theme)}`,
          },
          width: `${baseSpacing / 8}px`,
          size: `${Math.round(baseSpacing / 2.666)}px`,
          shape: 'round',
        },
        size: {
          small: `${baseSpacing * 3}px`,
          medium: `${baseSpacing * 4}px`,
          large: `${baseSpacing * 6}px`,
          xlarge: `${baseSpacing * 9}px`,
          huge: `${baseSpacing * 12}px`,
        },
      },
      digital: {
        text: {
          xsmall: { size: `${baseFontSize - (2 * fontScale)}px`, height: 1.5 },
          small: { size: `${baseFontSize - fontScale}px`, height: 1.43 },
          medium: { size: `${baseFontSize}px`, height: 1.375 },
          large: { size: `${baseFontSize + fontScale}px`, height: 1.167 },
          xlarge: { size: `${baseFontSize + (2 * fontScale)}px`, height: 1.1875 },
          xxlarge: { size: `${baseFontSize + (4 * fontScale)}px`, height: 1.125 },
        },
      },
    },
    collapsible: {
      minSpeed: 200,
      baseHeight: 500,
    },
    dataTable: {
      body: {
        pad: { horizontal: 'small', vertical: 'xsmall' },
      },
      footer: {
        border: { side: 'top', size: 'small' },
        pad: { horizontal: 'small', vertical: 'xsmall' },
      },
      groupHeader: {
        border: { side: 'bottom', size: 'xsmall' },
        pad: { horizontal: 'small', vertical: 'xsmall' },
        background: {
          dark: 'dark-2',
          light: 'light-2',
        },
      },
      header: {
        border: { side: 'bottom', size: 'small' },
        pad: { horizontal: 'small', vertical: 'xsmall' },
        background: {
          dark: 'dark-1',
          light: 'light-1',
        },
      },
      icons: {
        ascending: FormDown,
        contract: FormUp,
        descending: FormUp,
        expand: FormDown,
      },
      resize: {
        border: {
          side: 'right',
          color: {
            dark: 'border-dark',
            light: 'border-light',
          },
        },
      },
    },
    // drop: {
    //   maxHeight: undefined,
    // },
    formField: {
      border: {
        color: {
          dark: 'border-dark',
          light: 'border-light',
        },
        position: 'inner',
        side: 'bottom',
        error: {
          color: {
            dark: 'white',
            light: 'status-critical',
          },
        },
      },
      error: {
        color: {
          dark: 'status-critical',
          light: 'status-critical',
        },
      },
      help: {
        color: {
          dark: 'dark-5',
          light: 'dark-5',
        },
      },
      label: {},
    },
    grommet: {},
    heading: {
      font: {
        // family: undefined
      },
      level: {
        1: {
          small: { ...fontSizing(4) },
          medium: { ...fontSizing(8) },
          large: { ...fontSizing(16) },
        },
        2: {
          small: { ...fontSizing(2) },
          medium: { ...fontSizing(4) },
          large: { ...fontSizing(8) },
        },
        3: {
          small: { ...fontSizing(1) },
          medium: { ...fontSizing(1) },
          large: { ...fontSizing(4) },
        },
        4: {
          small: { ...fontSizing(0) },
          medium: { ...fontSizing(0) },
          large: { ...fontSizing(0) },
        },
      },
      weight: 600,
    },
    icon: {
      colors,
    },
    iconThemes: {},
    layer: {
      background: 'white',
      border: {
        radius: '4px',
      },
      overlay: {
        background: 'rgba(0, 0, 0, 0.5)',
      },
    },
    menu: {
      icons: {
        down: FormDown,
      },
    },
    paragraph: {
      small: { ...fontSizing(-1) },
      medium: { ...fontSizing(0) },
      large: { ...fontSizing(1) },
      xlarge: { ...fontSizing(2) },
    },
    radioButton: {
      check: {
        // color: { dark: undefined, light: undefined },
      },
      border: {
        color: {
          dark: 'rgba(255, 255, 255, 0.5)',
          light: 'rgba(0, 0, 0, 0.15)',
        },
        radius: '100%',
        width: '2px',
      },
      size: `${baseSpacing}px`,
    },
    rangeInput: {
      track: {
        height: '4px',
        color: {
          dark: css`${props => rgba(props.theme.global.colors['border-dark'], 0.2)}`,
          light: css`${props => rgba(props.theme.global.colors['border-light'], 0.2)}`,
        },
      },
      thumb: {
        // color: { dark: undefined, light: undefined },
      },
    },
    select: {
      // background: undefined,
      icons: {
        // color: { dark: undefined, light: undefined },
        down: FormDown,
      },
      // searchInput: undefined,
      step: 20,
      control: {
        // extend: undefined,
      },
    },
    text: {
      xsmall: { ...fontSizing(-1.5) },
      small: { ...fontSizing(-1) },
      medium: { ...fontSizing(0) },
      large: { ...fontSizing(1) },
      xlarge: { ...fontSizing(2) },
      xxlarge: { ...fontSizing(4) },
    },
    // textInput: {
    //   extend: undefined,
    // },
    video: {
      captions: {
        background: 'rgba(0, 0, 0, 0.7)',
      },
      // controls: { background: undefined },
      icons: {
        closedCaption: ClosedCaption,
        configure: Actions,
        fullScreen: Expand,
        pause: Pause,
        play: Play,
        reduceVolume: VolumeLow,
        volume: Volume,
        // color: { dark: undefined, light: undefined },
      },
      // scrubber: { track: { color: undefined } },
    },
    worldMap: {
      continent: {
        active: '8px',
        base: '6px',
      },
      place: {
        active: '20px',
        base: '8px',
      },
    },
  };

  return deepFreeze(result);
};

export const base = generate(24);
