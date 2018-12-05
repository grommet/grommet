import { rgba } from 'polished';
import { css } from 'styled-components';

import {
  base as iconBase,
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

import { deepMerge, deepFreeze, normalizeColor } from '../utils';

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
const darkColors = [
  '#333333',
  '#444444',
  '#555555',
  '#666666',
  '#777777',
  '#999999',
];
const lightColors = [
  '#F6F6F6',
  '#EEEEEE',
  '#DDDDDD',
  '#CCCCCC',
  '#BBBBBB',
  '#AAAAAA',
];
const focusColor = accentColors[0];

const colors = {
  active: rgba(221, 221, 221, 0.5),
  black: '#000000',
  border: {
    dark: rgba(255, 255, 255, 0.33),
    light: rgba(0, 0, 0, 0.33),
  },
  brand: brandColor,
  control: {
    dark: 'accent-1',
    light: 'brand',
  },
  focus: focusColor,
  placeholder: '#AAAAAA',
  text: {
    dark: '#f8f8f8',
    light: '#444444',
  },
  icon: {
    dark: '#f8f8f8',
    light: '#666666',
  },
  white: '#FFFFFF',
};

const colorArray = (array, prefix) =>
  array.forEach((color, index) => {
    colors[`${prefix}-${index + 1}`] = color;
  });

colorArray(accentColors, 'accent');
colorArray(darkColors, 'dark');
colorArray(lightColors, 'light');
colorArray(neutralColors, 'neutral');
Object.keys(statusColors).forEach(color => {
  colors[`status-${color}`] = statusColors[color];
});

export const generate = (baseSpacing = 24, scale = 6) => {
  // 24
  const baseFontSize = baseSpacing * 0.75; // 18
  const fontScale = baseSpacing / scale; // 4

  const fontSizing = factor => ({
    size: `${baseFontSize + factor * fontScale}px`,
    height: `${baseSpacing + factor * fontScale}px`,
    // maxWidth chosen to be ~50 characters wide
    // see: https://ux.stackexchange.com/a/34125
    maxWidth: `${baseSpacing * (baseFontSize + factor * fontScale)}px`,
  });

  const borderWidth = 2;

  const result = deepMerge(iconBase, {
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
      },
      breakpoints: {
        small: {
          value: baseSpacing * 32, // 768
          borderSize: {
            xsmall: '1px',
            small: '2px',
            medium: `${baseSpacing / 6}px`, // 4
            large: `${baseSpacing / 4}px`, // 6
            xlarge: `${baseSpacing / 2}px`, // 12
          },
          edgeSize: {
            none: '0px',
            hair: '1px', // for Chart
            xxsmall: '2px',
            xsmall: `${baseSpacing / 8}px`, // 3
            small: `${baseSpacing / 4}px`, // 6
            medium: `${baseSpacing / 2}px`, // 12
            large: `${baseSpacing}px`, // 24
            xlarge: `${baseSpacing * 2}px`, // 48
          },
          size: {
            xxsmall: `${baseSpacing}px`, // 24
            xsmall: `${baseSpacing * 2}px`, // 48
            small: `${baseSpacing * 4}px`, // 96
            medium: `${baseSpacing * 8}px`, // 192
            large: `${baseSpacing * 16}px`, // 384
            xlarge: `${baseSpacing * 32}px`, // 768
            full: '100%',
          },
        },
        medium: {
          value: baseSpacing * 64, // 1536
        },
        large: {}, // anything above 'medium'
      },
      // Breakpoints used at Server Side Rendering for the initial rendering
      // These values correspond to the theme breakpoints
      deviceBreakpoints: {
        phone: 'small',
        tablet: 'medium',
        computer: 'large',
      },
      colors,
      control: {
        border: {
          width: '1px',
          radius: '4px',
          color: 'border',
        },
      },
      debounceDelay: 300, // The time to wait after the user stopped typing, measured in ms.
      drop: {
        background: '#ffffff',
        border: {
          width: '0px',
          radius: '0px',
        },
        shadowSize: 'small',
        zIndex: '20',
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
        responsiveBreakpoint: 'small',
      },
      elevation: {
        light: {
          none: 'none',
          xsmall: '0px 1px 2px rgba(0, 0, 0, 0.20)',
          small: '0px 2px 4px rgba(0, 0, 0, 0.20)',
          medium: '0px 4px 8px rgba(0, 0, 0, 0.20)',
          large: '0px 8px 16px rgba(0, 0, 0, 0.20)',
          xlarge: '0px 12px 24px rgba(0, 0, 0, 0.20)',
        },
        dark: {
          none: 'none',
          xsmall: '0px 2px 2px rgba(255, 255, 255, 0.40)',
          small: '0px 4px 4px rgba(255, 255, 255, 0.40)',
          medium: '0px 6px 8px rgba(255, 255, 255, 0.40)',
          large: '0px 8px 16px rgba(255, 255, 255, 0.40)',
          xlarge: '0px 12px 24px rgba(255, 255, 255, 0.40)',
        },
      },
      focus: {
        border: {
          color: 'focus',
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
        padding: `${baseSpacing / 2}px`,
        weight: 600,
      },
      opacity: {
        strong: 0.8,
        medium: 0.4,
        weak: 0.1,
      },
      spacing: `${baseSpacing}px`,
      size: {
        xxsmall: `${baseSpacing * 2}px`, // 48
        xsmall: `${baseSpacing * 4}px`, // 96
        small: `${baseSpacing * 8}px`, // 192
        medium: `${baseSpacing * 16}px`, // 384
        large: `${baseSpacing * 32}px`, // 768
        xlarge: `${baseSpacing * 48}px`, // 1152
        xxlarge: `${baseSpacing * 64}px`, // 1536
        full: '100%',
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
        light: '#1D67E3',
      },
      hover: {
        textDecoration: 'underline',
        // fontWeight: undefined,
        // extend: undefined,
      },
      // extend: undefined,
    },
    box: {
      responsiveBreakpoint: 'small', // when we switch rows to columns
      // extend: undefined,
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
        vertical: `${baseSpacing / 4 - borderWidth}px`,
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
        fontSize: `${baseFontSize + 3 * fontScale}px`,
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
        width: '2px',
      },
      check: {
        radius: '4px',
        thickness: '4px',
        // extend: undefined,
      },
      icon: {
        // size: undefined,
        // extend: undefined,
      },
      icons: {
        // checked: undefined,
        // indeterminate: undefined,
      },
      hover: {
        border: {
          color: {
            dark: 'white',
            light: 'black',
          },
        },
      },
      size: `${baseSpacing}px`,
      // color: { dark: undefined, light: undefined },
      toggle: {
        color: {
          dark: '#d9d9d9',
          light: '#d9d9d9',
        },
        radius: `${baseSpacing}px`,
        size: `${baseSpacing * 2}px`,
        // extend: undefined,
        knob: {
          // extend: undefined,
        },
      },
      // extend: undefined,
    },
    clock: {
      analog: {
        hour: {
          color: {
            dark: 'light-2',
            light: 'dark-3',
          },
          width: `${baseSpacing / 3}px`,
          size: `${baseSpacing}px`,
          shape: 'round',
        },
        minute: {
          color: {
            dark: 'light-5',
            light: 'dark-5',
          },
          width: `${baseSpacing / 6}px`,
          size: `${Math.round(baseSpacing / 2)}px`,
          shape: 'round',
        },
        second: {
          color: {
            dark: 'accent-1',
            light: 'accent-1',
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
          xsmall: { size: `${baseFontSize - 2 * fontScale}px`, height: 1.5 },
          small: { size: `${baseFontSize - fontScale}px`, height: 1.43 },
          medium: { size: `${baseFontSize}px`, height: 1.375 },
          large: { size: `${baseFontSize + fontScale}px`, height: 1.167 },
          xlarge: { size: `${baseFontSize + 2 * fontScale}px`, height: 1.1875 },
          xxlarge: { size: `${baseFontSize + 4 * fontScale}px`, height: 1.125 },
        },
      },
    },
    collapsible: {
      minSpeed: 200,
      baseline: 500,
    },
    dataTable: {
      header: {},
      groupHeader: {
        border: { side: 'bottom', size: 'xsmall' },
        fill: 'vertical',
        pad: { horizontal: 'small', vertical: 'xsmall' },
        background: {
          dark: 'dark-2',
          light: 'light-2',
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
          color: 'border',
        },
      },
      primary: {
        weight: 'bold',
      },
    },
    // drop: {
    //   maxHeight: undefined,
    // },
    formField: {
      border: {
        color: 'border',
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
          font: {
            // family: undefined,
          },
          small: { ...fontSizing(4) },
          medium: { ...fontSizing(8) },
          large: { ...fontSizing(16) },
          xlarge: { ...fontSizing(24) },
        },
        2: {
          font: {
            // family: undefined,
          },
          small: { ...fontSizing(2) },
          medium: { ...fontSizing(4) },
          large: { ...fontSizing(8) },
          xlarge: { ...fontSizing(12) },
        },
        3: {
          font: {
            // family: undefined,
          },
          small: { ...fontSizing(1) },
          medium: { ...fontSizing(1) },
          large: { ...fontSizing(4) },
          xlarge: { ...fontSizing(6) },
        },
        4: {
          font: {
            // family: undefined,
          },
          small: { ...fontSizing(0) },
          medium: { ...fontSizing(0) },
          large: { ...fontSizing(0) },
          xlarge: { ...fontSizing(0) },
        },
      },
      responsiveBreakpoint: 'small', // when we scale the font size down
      weight: 600,
    },
    layer: {
      background: 'white',
      border: {
        radius: '4px',
      },
      container: {
        zIndex: '15',
      },
      overlay: {
        background: 'rgba(0, 0, 0, 0.5)',
      },
      responsiveBreakpoint: 'small', // when Layer takes over the full screen
      zIndex: '10',
    },
    menu: {
      // background: undefined,
      // extend: undefined,
      icons: {
        down: FormDown,
      },
    },
    paragraph: {
      small: { ...fontSizing(-1) },
      medium: { ...fontSizing(0) },
      large: { ...fontSizing(1) },
      xlarge: { ...fontSizing(2) },
      xxlarge: { ...fontSizing(4) },
    },
    radioButton: {
      border: {
        color: {
          dark: 'rgba(255, 255, 255, 0.5)',
          light: 'rgba(0, 0, 0, 0.15)',
        },
        width: '2px',
      },
      check: {
        radius: '100%',
        // color: { dark: undefined, light: undefined },
        // extend: undefined,
      },
      hover: {
        border: {
          color: {
            dark: 'white',
            light: 'black',
          },
        },
      },
      icon: {
        // size: undefined,
        // extend: undefined,
      },
      icons: {
        // circle: undefined,
      },
      gap: 'small',
      size: `${baseSpacing}px`,
    },
    rangeInput: {
      track: {
        height: '4px',
        color: css`
          ${props => rgba(normalizeColor('border', props.theme), 0.2)};
        `,
      },
      thumb: {
        // color: { dark: undefined, light: undefined },
      },
    },
    select: {
      // background: undefined,
      container: {
        // extend: undefined,
      },
      control: {
        // extend: undefined,
      },
      icons: {
        // color: { dark: undefined, light: undefined },
        down: FormDown,
      },
      // searchInput: undefined,
      step: 20,
    },
    tab: {
      active: {
        color: 'text',
        // background: undefined,
      },
      // background: undefined,
      border: {
        side: 'bottom',
        size: 'small',
        color: {
          dark: 'accent-1',
          light: 'brand',
        },
        active: {
          color: {
            dark: 'white',
            light: 'black',
          },
        },
        hover: {
          color: {
            dark: 'white',
            light: 'black',
          },
        },
      },
      color: 'control',
      // extend: undefined,
      hover: {
        // background: undefined,
        // extend: undefined,
        color: {
          dark: 'white',
          light: 'black',
        },
      },
      margin: {
        vertical: 'xxsmall',
        horizontal: 'small',
      },
      pad: {
        bottom: 'xsmall',
      },
    },
    tabs: {
      // background: undefined,
      // extend: undefined,
      header: {
        // background: undefined,
        // extend: undefined,
      },
      panel: {
        // extend: undefined,
      },
      // gap: undefined,
    },
    table: {
      header: {
        align: 'start',
        pad: { horizontal: 'small', vertical: 'xsmall' },
        border: 'bottom',
        verticalAlign: 'bottom',
        fill: 'vertical',
        // background: undefined,
        // extend: undefined,
      },
      body: {
        align: 'start',
        pad: { horizontal: 'small', vertical: 'xsmall' },
        // border: undefined,
        // extend: undefined,
      },
      footer: {
        align: 'start',
        pad: { horizontal: 'small', vertical: 'xsmall' },
        border: 'top',
        verticalAlign: 'top',
        fill: 'vertical',
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
      color: 'light-3',
      continent: {
        active: '8px',
        base: '6px',
      },
      hover: {
        color: 'light-4',
      },
      place: {
        active: '20px',
        base: '8px',
      },
    },
  });

  return deepFreeze(result);
};

export const base = generate(24);
