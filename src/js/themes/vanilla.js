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

const brandColor = '#865CD6';
const accentColors = ['#FD6FFF', '#60EB9F', '#60EBE1', '#FFCA58'];
const neutralColors = ['#EB6060', '#01C781', '#6095EB', '#FFB200'];
const statusColors = {
  critical: '#E1746A',
  error: '#E1746A',
  warning: '#F7E464',
  ok: '#7DD892',
  unknown: '#a8a8a8',
  disabled: '#a8a8a8',
};
const darkColors = ['#333333', '#444444', '#555555', '#666666', '#777777', '#999999'];
const lightColors = ['#F6F6F6', '#EEEEEE', '#DDDDDD', '#CCCCCC', '#BBBBBB', '#AAAAAA'];
const backgroundColor = '#FFFFFF';
const textColor = '#444444';
const borderColor = 'rgba(0, 0, 0, 0.33)';
const focusColor = accentColors[0];
const activeColor = rgba('#DDDDDD', 0.5);

const colors = {
  active: activeColor,
  accent: accentColors, // deprecated
  black: '#000000',
  border: borderColor,
  brand: brandColor,
  dark: darkColors, // deprecated
  darkBackground: {
    text: '#FFFFFF',
  },
  focus: focusColor,
  light: lightColors, // deprecated
  lightBackground: {
    text: textColor,
  },
  neutral: neutralColors, // deprecated
  placeholder: '#AAAAAA',
  status: statusColors, // deprecated
  text: textColor,
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
Object.keys(statusColors).forEach((color) => {
  colors[`status-${color}`] = statusColors[color];
});

const workSansPath = 'https://fonts.gstatic.com/s/worksans/v2';
const zillaSlabPath = 'https://fonts.gstatic.com/s/zillaslab/v3';

const baseSpacing = 24;

const borderWidth = 2;

export default deepFreeze({
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
      medium: `${baseSpacing / 6}px`,
      large: `${baseSpacing / 2}px`,
      xlarge: `${baseSpacing}px`,
      narrow: {
        xsmall: '1px',
        small: '2px',
        medium: `${baseSpacing / 6}px`,
        large: `${baseSpacing / 4}px`,
        xlarge: `${baseSpacing / 2}px`,
      },
    },
    breakpoints: {
      narrow: 699,
    },
    colors,
    control: {
      border: {
        width: '2px',
      },
      font: {
        weight: 600,
        size: '19px',
      },
    },
    drop: {
      backgroundColor: {
        light: '#f8f8f8',
        dark: '#222222',
      },
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
      none: '0',
      xsmall: `${baseSpacing / 4}px`,
      small: `${baseSpacing / 2}px`,
      medium: `${baseSpacing}px`,
      large: `${baseSpacing * 2}px`,
      xlarge: `${baseSpacing * 4}px`,
      narrow: {
        none: '0',
        xsmall: `${baseSpacing / 8}px`,
        small: `${baseSpacing / 4}px`,
        medium: `${baseSpacing / 2}px`,
        large: `${baseSpacing}px`,
        xlarge: `${baseSpacing * 2}px`,
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
    font: {
      family: "'Work Sans', Arial, sans-serif",
      face: `
        @font-face {
          font-family: 'Work Sans';
          font-style: normal;
          font-weight: 400;
          src:
            local('Work Sans'),
            local('WorkSans-Regular'),
            url("${workSansPath}/ElUAY9q6T0Ayx4zWzW63VJBw1xU1rKptJj_0jans920.woff2") format('woff2');
        }

        @font-face {
          font-family: 'Work Sans';
          font-style: normal;
          font-weight: 600;
          src:
            local('Work Sans SemiBold'),
            local('WorkSans-SemiBold'),
            url("${workSansPath}/z9rX03Xuz9ZNHTMg1_ghGRampu5_7CjHW5spxoeN3Vs.woff2") format('woff2');
        }

        @font-face {
          font-family: 'Zilla Slab';
          font-style: normal;
          font-weight: 400;
          src:
            local('Zilla Slab Regular'),
            local('ZillaSlab-Regular'),
            url("${zillaSlabPath}/dFa6ZfeM_74wlPZtksIFajo6_V6LVlA.woff2") format('woff2');
        }

        @font-face {
          font-family: 'Zilla Slab';
          font-style: normal;
          font-weight: 600;
          src:
            local('Zilla Slab SemiBold'),
            local('ZillaSlab-SemiBold'),
            url("${zillaSlabPath}/dFa5ZfeM_74wlPZtksIFYuUe6HOpW3pwfa0.woff2") format('woff2');
        }
      `,
      size: '16px',
    },
    hover: {
      backgroundColor: css`${props => props.theme.global.colors.active}`,
      textColor: '#000000',
    },
    input: {
      border: {
        width: '1px',
        radius: '4px',
        color: css`${props => props.theme.global.colors.border}`,
      },
      weight: 600,
    },
    lineHeight: '24px',
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
  },
  accordion: {
    icons: {
      collapse: FormUp,
      expand: FormDown,
    },
    iconColor: css`${props => props.theme.global.colors.brand}`,
  },
  anchor: {
    textDecoration: 'none',
    fontWeight: 600,
    color: css`${props => props.theme.global.colors.brand}`,
  },
  button: {
    border: {
      color: css`${props => props.theme.global.colors.brand}`,
      width: `${borderWidth}px`,
      radius: `${baseSpacing}px`,
    },
    colors: {
      accent: css`${props => colorForName('accent-1', props.theme)}`,
      critical: css`${props => props.theme.global.colors.status.critical}`,
      secondary: css`${props => colorForName('neutral-2', props.theme)}`,
      text: css`${props => props.theme.global.colors.text}`,
    },
    disabled: {
      opacity: 0.3,
    },
    minWidth: `${baseSpacing * 4}px`,
    maxWidth: `${baseSpacing * 16}px`,
    padding: {
      vertical: `${(baseSpacing / 2) - borderWidth}px`,
      horizontal: `${(baseSpacing * 2) - borderWidth}px`,
    },
  },
  calendar: {
    small: {
      fontSize: '16px',
      lineHeight: 1.375,
      daySize: `${(baseSpacing * 8) / 7}px`,
      slideDuration: '0.2s',
    },
    medium: {
      fontSize: '22px',
      lineHeight: 1.45,
      daySize: `${(baseSpacing * 16) / 7}px`,
      slideDuration: '0.5s',
    },
    large: {
      fontSize: '36px',
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
    },
  },
  checkBox: {
    check: {
      color: css`${props => props.theme.global.colors.brand}`,
      width: '4px',
    },
    border: {
      color: {
        dark: 'rgba(255, 255, 255, 0.5)',
        light: 'rgba(0, 0, 0, 0.15)',
      },
      radius: '4px',
      width: '2px',
    },
    size: `${baseSpacing}px`,
    toggle: {
      color: '#d9d9d9',
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
          dark: css`${props => colorForName('accent-2', props.theme)}`,
          light: css`${props => colorForName('accent-2', props.theme)}`,
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
        medium: { size: '16px', height: 1.375 },
        xsmall: { size: '12px', height: 1.5 },
        small: { size: '14px', height: 1.43 },
        large: { size: '24px', height: 1.167 },
        xlarge: { size: '32px', height: 1.1875 },
        xxlarge: { size: '48px', height: 1.125 },
      },
    },
  },
  formField: {
    border: {
      color: 'border',
      position: 'inner',
      side: 'bottom',
      error: {
        color: 'status-critical',
      },
    },
    error: { color: 'status-critical' },
    help: { color: 'dark-5' },
    label: {},
  },
  grommet: {},
  heading: {
    font: {
      family: "'Zilla Slab', 'Work Sans', Arial, sans-serif",
    },
    // maxWidth chosen to be ~50 characters wide
    // see: https://ux.stackexchange.com/a/34125
    level: {
      1: {
        medium: { size: '48px', height: 1.125, maxWidth: `${baseSpacing * 48}px` },
        small: { size: '24px', height: 1.333, maxWidth: `${baseSpacing * 24}px` },
        large: { size: '96px', height: 1.125, maxWidth: `${baseSpacing * 96}px` },
      },
      2: {
        medium: { size: '36px', height: 1.23, maxWidth: `${baseSpacing * 36}px` },
        small: { size: '18px', height: 1.333, maxWidth: `${baseSpacing * 18}px` },
        large: { size: '48px', height: 1.125, maxWidth: `${baseSpacing * 48}px` },
      },
      3: {
        medium: { size: '24px', height: 1.333, maxWidth: `${baseSpacing * 24}px` },
        small: { size: '18px', height: 1.333, maxWidth: `${baseSpacing * 18}px` },
        large: { size: '36px', height: 1.23, maxWidth: `${baseSpacing * 36}px` },
      },
      4: {
        medium: { size: '18px', height: 1.333, maxWidth: `${baseSpacing * 18}px` },
        small: { size: '16px', height: 1.375, maxWidth: `${baseSpacing * 16}px` },
        large: { size: '24px', height: 1.333, maxWidth: `${baseSpacing * 24}px` },
      },
    },
    weight: 600,
  },
  icon: {
    colors,
  },
  layer: {
    backgroundColor,
    border: {
      radius: '4px',
    },
    overlayBackgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  menu: {
    icons: {
      down: FormDown,
    },
  },
  paragraph: {
    // maxWidth chosen to be ~50 characters wide
    // see: https://ux.stackexchange.com/a/34125
    medium: { size: '16px', height: 1.375, maxWidth: `${baseSpacing * 16}px` },
    small: { size: '14px', height: 1.43, maxWidth: `${baseSpacing * 14}px` },
    large: { size: '24px', height: 1.333, maxWidth: `${baseSpacing * 24}px` },
    xlarge: { size: '32px', height: 1.1875, maxWidth: `${baseSpacing * 32}px` },
  },
  radioButton: {
    check: {
      color: css`${props => props.theme.global.colors.brand}`,
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
      color: css`${props => rgba(props.theme.global.colors.text, 0.2)}`,
    },
  },
  select: {
    icons: {
      down: FormDown,
    },
  },
  text: {
    medium: { size: '16px', height: 1.375 },
    xsmall: { size: '12px', height: 1.5 },
    small: { size: '14px', height: 1.43 },
    large: { size: '24px', height: 1.167 },
    xlarge: { size: '32px', height: 1.1875 },
    xxlarge: { size: '48px', height: 1.125 },
  },
  video: {
    captions: {
      background: rgba(0, 0, 0, 0.7),
    },
    icons: {
      closedCaption: ClosedCaption,
      configure: Actions,
      fullScreen: Expand,
      pause: Pause,
      play: Play,
      reduceVolume: VolumeLow,
      volume: Volume,
    },
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
});
