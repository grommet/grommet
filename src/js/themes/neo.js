import { rgba } from 'polished';
import { css } from 'styled-components';

import { normalizeColor } from '../utils/colors';
import { parseMetricToNum } from '../utils/mixins';
import { deepFreeze } from '../utils/object';

const brandColor = '#E15151';
const accentColors = ['#38C18B', '#8F94A6', '#739FFC', '#439ADC'];
const neutralColors = ['#519bff', '#99742E', '#00739D', '#A2423D'];
const statusColors = {
  critical: '#e35e59',
  error: '#e35e59',
  warning: '#FFAA15',
  ok: '#44b88d',
  unknown: '#CCCCCC',
  disabled: '#CCCCCC',
};
const darkColors = [
  '#29313D',
  '#2F3A4A',
  '#575F7D',
  '#898EA2',
  '#BABDCA',
  '#DEDEDE',
];
const lightColors = [
  '#fbfbfb',
  '#f5f6f8',
  '#E7EAF1',
  '#e1e3ef',
  '#dfdfdf',
  '#DADADA',
  '#F5F7FD',
];
const focusColor = '#B1C2FE';

const colors = {
  active: '#FFFDE3',
  'background-back': {
    dark: '#33333308',
    light: '#F8FAFE',
  },
  'background-front': {
    dark: '#444444',
    light: '#FFFFFF',
  },
  'background-contrast': {
    dark: '#33333308',
    light: '#EEEEEE',
  },
  'active-background': 'background-contrast',
  'active-text': 'text-strong',
  black: '#000000',
  border: {
    dark: rgba(255, 255, 255, 0.33),
    light: '#DEDEDE',
  },
  brand: brandColor,
  control: {
    dark: 'accent-3',
    light: 'accent-3',
  },
  focus: focusColor,
  'graph-0': 'accent-1',
  'graph-1': 'neutral-1',
  'graph-2': 'neutral-2',
  'graph-3': 'neutral-3',
  'graph-4': 'neutral-4',
  placeholder: 'dark-5',
  selected: 'light-7',
  text: {
    dark: '#f8f8f8',
    light: '#898EA2',
  },
  'text-strong': {
    dark: '#FFFFFF',
    light: '#575F7D',
  },
  'text-weak': {
    dark: '#CCCCCC',
    light: '#898EA2',
  },
  'text-xweak': {
    dark: '#BBBBBB',
    light: '#BABDCA',
  },
  icon: {
    dark: '#f8f8f8',
    light: '#8F94A6',
  },
  'selected-background': 'brand',
  'selected-text': 'text-strong',
  white: '#FFFFFF',
};

const colorArray = (array, prefix) => array.forEach((color, index) => {
  colors[`${prefix}-${index + 1}`] = color;
});

colorArray(accentColors, 'accent');
colorArray(darkColors, 'dark');
colorArray(lightColors, 'light');
colorArray(neutralColors, 'neutral');
Object.keys(statusColors).forEach((color) => {
  colors[`status-${color}`] = statusColors[color];
});

export const generate = (baseSpacing = 24, scale = 6) => {
  // 24
  const baseFontSize = baseSpacing * 0.75; // 12
  const fontScale = baseSpacing / scale; // 16

  const fontSizing = factor => ({
    size: `${baseFontSize + factor * fontScale}px`,
    height: `${baseSpacing + factor * fontScale}px`,
    // maxWidth chosen to be ~50 characters wide
    // see: https://ux.stackexchange.com/a/34125
    maxWidth: `${baseSpacing * (baseFontSize + factor * fontScale)}px`,
  });

  const borderWidth = 0;
  const controlBorderWidth = 1;

  const result = {
    global: {
      active: {
        background: {
          color: 'active',
          opacity: 'medium',
        },
        color: {
          dark: 'white',
          light: '#898EA2',
        },
      },
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
          width: `${controlBorderWidth}px`,
          radius: '4px',
          color: 'border',
        },
        disabled: {
          opacity: 0.3,
        },
      },
      // The time to wait after the user stopped typing, measured in ms.
      debounceDelay: 300,
      drop: {
        background: '#ffffff',
        border: {
          radius: '4px',
        },
        zIndex: '20',
        extend: {
          'box-shadow': '0 1px 7px 3px rgba(0,0,0,0.15)',
        },
      },
      edgeSize: {
        none: '0px',
        hair: '1px', // for Chart
        xxsmall: `${baseSpacing / (1.618 * 8)}px`, // 3
        xsmall: `${baseSpacing / (1.618 * 4)}px`, // 6
        small: `${baseSpacing / (1.618 * 2)}px`, // 12
        medium: `${baseSpacing / 1.618}px`, // 24
        large: `${baseSpacing}px`, // 48
        xlarge: `${baseSpacing * 1.618}px`, // 96
        responsiveBreakpoint: 'small',
      },
      elevation: {
        light: {
          none: 'none',
          xsmall: '0px 1px 2px rgba(0, 0, 0, 0.02)',
          small: '0px 1px 5px 0px rgba(217,217,217,1)',
          medium: '0px 4px 8px rgba(0, 0, 0, 0.02)',
          large: '0px 8px 16px rgba(0, 0, 0, 0.02)',
          xlarge: '0px 12px 24px rgba(0, 0, 0, 0.02)',
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
        // shadow or outline are required for accessibility
        border: {
          // remove to only have shadow
          color: 'focus',
        },
        // outline: { color: undefined, size: undefined },
        shadow: {
          color: 'focus',
          size: '2px',
        },
      },
      font: {
        ...fontSizing(0),
        // face: undefined,
        family: "'Open Sans', sans-serif",
      },
      hover: {
        background: {
          color: 'active',
          opacity: 'medium',
        },
        color: {
          dark: 'white',
          light: 'black',
        },
      },
      input: {
        padding: {
          horizontal: `${
            parseMetricToNum(`${baseSpacing / 2}px`)
            - parseMetricToNum(`${controlBorderWidth}px`)
          }px`,
          vertical: `${
            parseMetricToNum(`${baseSpacing / 1.618}px`)
            - parseMetricToNum(`${controlBorderWidth}px`)
          }px`,
        },
        font: {
          // size: undefined,
          // height: undefined,
          weight: 600,
        },
        // deprecate in v3
        // weight: undefined,
      },
      opacity: {
        strong: 0.8,
        medium: 0.4,
        weak: 0.1,
      },
      selected: {
        background: 'light-7',
        color: 'dark-3',
      },
      spacing: `${baseSpacing}px`,
      size: {
        xxsmall: `${baseSpacing * 2.2}px`, // 48
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
      panel: {
        // border: {
        //   side: 'bottom',
        //   color: 'border',
        // },
      },
      border: {
        side: 'bottom',
        color: 'border',
      },
      heading: {
        level: '4', // level ranges from 1-6
        // margin: undefined
      },
      hover: {
        color: { dark: 'light-4', light: 'dark-3' }, // deprecated
        heading: {
          color: { dark: 'light-4', light: 'dark-3' },
        },
      },
    },
    anchor: {
      textDecoration: 'none',
      fontWeight: 600,
      color: {
        dark: 'brand',
        light: 'brand',
      },
      hover: {
        textDecoration: 'underline',
        // fontWeight: undefined,
        // extend: undefined,
      },
      // extend: undefined,
    },
    avatar: {
      // extend: undefined,
      size: {
        xsmall: `${baseSpacing * 0.75}px`,
        small: `${baseSpacing}px`,
        medium: `${baseSpacing * 2}px`, // default 48
        large: `${baseSpacing * 3}px`,
        xlarge: `${baseSpacing * 4}px`,
      },
      text: {
        // fontWeight: undefined,
        // extend: undefined
      },
    },
    box: {
      responsiveBreakpoint: 'small', // when we switch rows to columns
      // extend: undefined,
    },
    button: {
      size: {
        small: {
          border: {
            radius: `${baseSpacing * 0.25}px`, // 4px
          },
          // pad: {
          //   vertical: `${baseSpacing / (1.618 * 2) - borderWidth}px`, // 4px
          //   horizontal: `${baseSpacing - borderWidth * 2}px`, // 20px,
          // },
        },
        medium: {
          border: {
            radius: `${baseSpacing * 0.312}px`, // 5px
          },
          // pad: {
          //   vertical: `${baseSpacing / 1.618 - borderWidth}px`,
          //   horizontal: `${baseSpacing - borderWidth * 1.4}px`,
          // },
        },
        large: {
          border: {
            radius: `${baseSpacing * 0.4}px`, // 24px
          },
          // pad: {
          //   vertical: `${baseSpacing / (1.618 / 2) + borderWidth}px`, // 8px
          //   horizontal: `${baseSpacing * 2.8 - borderWidth}px`, // 32px,
          // },
        },
      },
      border: {
        // color: { dark: undefined, light: undefined }
        width: `${borderWidth}px`,
        radius: `${baseSpacing * 0.312}px`,
      },
      color: { dark: undefined, light: undefined },
      default: {
        background: 'transparent',
        border: 'none',
        // color: undefined,
        padding: {
          vertical: '0',
          horizontal: '0',
        },
        // extend: undefined,
      },
      primary: {
        background: 'accent-1',
        border: {
          color: { dark: 'accent-1', light: 'accent-1' },
        },
        color: 'white',
        // padding: {
        //   vertical: undefined,
        //   horizontal: undefined,
        // },
        // extend: undefined,
      },
      secondary: {
        background: 'accent-2',
        border: {
          color: { dark: 'accent-2', light: 'accent-2' },
        },
        color: 'white',
        // padding: {
        //   vertical: undefined,
        //   horizontal: undefined,
        // },
        // extend: undefined,
      },
      tertiary: {
        background: 'light-3',
        border: {
          color: { dark: 'light-3', light: 'light-3' },
        },
        // color: 'white',
        // padding: {
        //   vertical: undefined,
        //   horizontal: undefined,
        // },
        // extend: undefined,
      },
      active: {
        background: undefined,
        border: {
          color: { dark: 'accent-3', light: 'accent-3' },
          width: `${borderWidth}px`,
          radius: `${baseSpacing * 0.2}px`,
        },
        color: undefined,
        //   extend: undefined,
        //   default: {},
        //   primary: {},
        //   secondary: {},
      },
      disabled: {
        background: undefined,
        border: undefined,
        color: undefined,
        opacity: 0.6,
        //   extend: undefined,
        //   default: {},
        //   primary: {},
        //   secondary: {},
      },
      // hover: {
      //   background: undefined,
      //   border: undefined,
      //   color: undefined},
      //   extend: undefined,
      //   default: {},
      //   primary: {},
      //   secondary: {},
      // },
      padding: {
        vertical: `${baseSpacing / 1.618 - borderWidth}px`,
        horizontal: `${baseSpacing - borderWidth * 1.4}px`,
      },
      transition: {
        timing: 'ease-in-out',
        duration: 0.1,
        properties: ['color', 'background-color', 'border-color', 'box-shadow'],
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
      heading: { level: '4' }, // level ranges from 1-6
    },
    carousel: {
      animation: {
        duration: 1000,
      },
      disabled: {
        icons: {
          // color: { dark: undefined, light: undefined },
        },
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
        // extend: undefined,
        radius: '4px',
        thickness: '4px',
      },
      // color: { dark: undefined, light: undefined },
      // extend: undefined,
      // gap: undefined
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
        // checked: undefined,
        // indeterminate: undefined,
      },
      size: `${baseSpacing}px`,
      toggle: {
        background: { light: 'accent-2' },
        size: `${baseSpacing * 2.3125}px`,
        color: {
          dark: '#d9d9d9',
          light: 'white',
        },
        knob: {
          background: { light: 'white' },
          color: { light: 'white' },
          extend: {
            top: '2px',
            left: '2px',
            width: `${baseSpacing * 0.937}px`,
            height: `${baseSpacing * 0.937}px`,
            background: colors.white,
          },
        },
        radius: `${baseSpacing}px`,
        extend: ({ checked }) => ({
          height: `${baseSpacing * 1.187}px`,
          border: 'none',
          background: checked ? accentColors[0] : accentColors[1],
        }),
      },
    },
    clock: {
      analog: {
        // extend: undefined,
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
            dark: 'light-4',
            light: 'dark-3',
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
      groupHeader: {
        background: {
          dark: 'dark-2',
          light: 'light-2',
        },
        border: { side: 'bottom', size: 'xsmall' },
        pad: { horizontal: 'small', vertical: 'xsmall' },
      },
      groupEnd: {
        border: { side: 'bottom', size: 'xsmall' },
      },
      header: {},
      primary: {
        weight: 'bold',
      },
      resize: {
        border: {
          color: 'border',
          side: 'end',
        },
      },
    },
    diagram: {
      // extend: undefined,
      line: {
        color: 'graph-0',
      },
    },
    // drop: {
    //   extend: undefined,
    //   maxHeight: undefined,
    // },
    formField: {
      border: {
        color: 'none',
        error: {
          color: {
            dark: 'white',
            light: 'status-critical',
          },
        },
        position: 'inner',
        side: 'all',
        size: 'xsmall',
      },
      content: {
        pad: 'small',
      },
      disabled: {
        background: {
          color: 'status-disabled',
          opacity: 'medium',
        },
        // border: {
        //   color: undefined,
        // },
        // label: {
        //   color: undefined,
        // },
      },
      // focus: {
      //   background: {
      //     color: undefined,
      //   },
      //   border: {
      //     color: undefined,
      //   },
      // },
      error: {
        color: 'status-critical',
        margin: { vertical: 'xsmall', horizontal: 'small' },
        // background: undefined,
      },
      // extend: undefined,
      help: {
        color: 'dark-3',
        margin: {
          start: 'small',
        },
      },
      info: {
        color: 'text-xweak',
        margin: { vertical: 'xsmall', horizontal: 'small' },
      },
      label: {
        margin: { vertical: 'large', horizontal: '0' },
      },
      margin: { bottom: 'small' },
      // round: undefined,
      extend: ({ direction, align }) => ({
        'flex-direction': direction,
        'align-items': align,
        label: {
          'min-width': `${baseSpacing * 10}px`,
        },
      }),
      round: 'small',
    },
    mnet: {
      global: css`
        :focus {
          outline: none;
        }
      `,
    },
    heading: {
      font: {
        // family: undefined
      },
      level: {
        1: {
          font: {
            // family: undefined,
            // weight: undefined,
          },
          xsmall: { ...fontSizing(2) },
          small: { ...fontSizing(4) },
          medium: { ...fontSizing(8) },
          large: { ...fontSizing(16) },
          xlarge: { ...fontSizing(24) },
        },
        2: {
          font: {
            // family: undefined,
            // weight: undefined,
          },
          small: { ...fontSizing(2) },
          medium: { ...fontSizing(4) },
          large: { ...fontSizing(8) },
          xlarge: { ...fontSizing(12) },
        },
        3: {
          font: {
            // family: undefined,
            // weight: undefined,
          },
          small: { ...fontSizing(1) },
          medium: { ...fontSizing(2) },
          large: { ...fontSizing(4) },
          xlarge: { ...fontSizing(6) },
        },
        4: {
          font: {
            // family: undefined,
            // weight: undefined,
          },
          small: { ...fontSizing(0) },
          medium: { ...fontSizing(0) },
          large: { ...fontSizing(0) },
          xlarge: { ...fontSizing(0) },
        },
        5: {
          font: {
            // family: undefined,
            // weight: undefined,
          },
          small: { ...fontSizing(-0.5) },
          medium: { ...fontSizing(-0.5) },
          large: { ...fontSizing(-0.5) },
          xlarge: { ...fontSizing(-0.5) },
        },
        6: {
          font: {
            // family: undefined,
            // weight: undefined,
          },
          small: { ...fontSizing(-1) },
          medium: { ...fontSizing(-1) },
          large: { ...fontSizing(-1) },
          xlarge: { ...fontSizing(-1) },
        },
      },
      responsiveBreakpoint: 'small', // when we scale the font size down
      weight: 700,
    },
    layer: {
      background: 'white',
      border: {
        radius: '4px',
      },
      container: {
        zIndex: '15',
      },
      // extend: undefined,
      overlay: {
        background: 'rgba(0, 0, 0, 0.5)',
      },
      responsiveBreakpoint: 'small', // when Layer takes over the full screen
      zIndex: '10',
    },
    list: {
      item: {
        // background: undefined,
        border: 'horizontal',
        pad: { horizontal: 'medium', vertical: 'small' },
        // extend: undefined,
      },
      // extend: undefined,
    },
    maskedInput: {
      // extend: undefined,
      // disabled: { opacity: undefined },
    },
    menu: {
      // background: undefined,
      // extend: undefined,
    },
    meter: {
      color: 'graph-0',
      // colors: [] || colors: ['graph-0', 'graph-1', 'graph-2', 'graph-3'],
      // extend: undefined,
    },
    multiselect: {
      checkbox: {
        box: {
          margin: {
            horizontal: 'medium',
            // extend: undefined,
          },
        },
        checkmark: {
          size: `${baseSpacing}px`,
          color: 'white',
        },
        check: {
          height: `${baseSpacing}px`,
          width: `${baseSpacing}px`,
          margin: 'auto',
          round: 'xsmall',
          align: 'center',
          active: {
            background: 'accent-3',
            border: 'light-6',
          },
        },
      },
      chips: {
        wrapper: {
          pad: 'medium',
          direction: 'row',
          // extend: undefined,
        },
        option: {
          background: 'light-3',
          round: 'small',
          pad: {
            vertical: 'small',
            horizontal: 'medium',
          },
          margin: 'small',
          direction: 'row',
          align: 'center',
        },
        label: {
          color: 'dark-3',
          size: 'medium',
          weight: 600,
          margin: {
            right: 'small',
          },
        },
        icon: {
          size: 'small',
          color: 'dark-3',
        },
        clear: {
          color: 'accent-2',
          size: 'small',
        },
      },
      controls: {
        wrapper: {
          pad: 'medium',
          direction: 'row',
          // extend: undefined,
        },
        button: {
          margin: 'small',
        },
      },
      searchbox: {
        container: {
          height: 'xxsmall',
          direction: 'row',
          align: 'center',
          background: 'light-2',
          pad: { right: 'medium', vertical: 'small' },
        },
        placeholder: {
          color: 'dark-5',
          size: 'medium',
        },
        icon: {
          size: 'small',
          color: 'dark-3',
        },
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
    rangeSelector: {
      background: {
        invert: {
          color: 'light-4',
        },
      },
      // edge: {
      //   type: undefined,
      // },
    },
    select: {
      background: 'white',
      container: {
        extend: props => ({
          borderColor: normalizeColor('border', props.theme),
        }),
      },
      control: {
        // open: undefined,
        extend: {
          border: '1px solid #DEDEDE',
        },
      },
      options: {
        container: {
          align: 'start',
          pad: 'small',
          round: 'false',
          border: {
            side: 'bottom',
            color: '#D9DBE5',
          },
        },
        text: {
          margin: 'small',
        },
      },
      icons: {
        color: 'icon',
        margin: 'none',
        pad: 'small',
        background: 'background-contrast',
        // extend: {},
      },
      // searchInput: undefined,
      step: 20,
    },
    tab: {
      active: {
        color: 'dark-3',
        weight: 600,
        // background: undefined,
      },
      // background: undefined,
      border: {
        side: 'bottom',
        size: 'medium',
        color: {
          dark: 'brand',
          light: 'white',
        },
        active: {
          color: {
            dark: 'white',
            light: 'accent-3',
          },
        },
        hover: {
          color: {
            dark: 'white',
            light: 'white',
          },
          // extend: undefined,
        },
      },
      color: 'dark-4',
      // extend: undefined,
      hover: {
        // background: undefined,
        // extend: undefined,
        color: {
          dark: 'white',
          light: 'dark-3',
        },
      },
      margin: {
        top: 'large',
        horizontal: 'small',
        bottom: 'none',
      },
      pad: {
        bottom: 'large',
      },
    },
    tabs: {
      // background: undefined,
      // extend: undefined,
      gap: 'large',
      header: {
        // background: undefined,
        extend: {
          'padding-left': `${baseSpacing * 1.2}px`,
          'border-bottom': '1px solid #E8E7E7 ',
        },
      },
      panel: {
        extend: {},
      },
    },
    table: {
      header: {
        align: 'start',
        pad: { horizontal: 'small', vertical: 'xsmall' },
        border: 'bottom',
        // verticalAlign: undefined,
        // background: undefined,
        // extend: undefined,
      },
      body: {
        align: 'start',
        pad: { horizontal: 'small', vertical: 'xsmall' },
        // background: undefined,
        // border: undefined,
        // extend: undefined,
      },
      // row: {
      //   hover: {
      //     background: undefined,
      //     color: undefined,
      //   },
      // },
      footer: {
        align: 'start',
        pad: { horizontal: 'small', vertical: 'xsmall' },
        border: 'top',
        // verticalAlign: undefined,
        // background: undefined,
        // extend: undefined,
      },
    },
    text: {
      xsmall: { ...fontSizing(-1.5) },
      small: { ...fontSizing(-1) },
      medium: { ...fontSizing(0) }, // 18px
      large: { ...fontSizing(1) }, // 22px
      xlarge: { ...fontSizing(2) },
      xxlarge: { ...fontSizing(4) },
    },
    textArea: {
      // extend: undefined,
      // disabled: { opacity: undefined },
    },
    textInput: {
      // disabled: { opacity: undefined },
      extend: {
        'padding-left': `${baseSpacing}px`,
        'box-shadow': 'none',
      },
    },
  };

  return deepFreeze(result);
};

export const neo = generate(16);
