import { rgba } from 'polished';
import { css } from 'styled-components';

import { colorForName, deepFreeze } from '../utils';

const brandColor = '#865CD6';
const accentColors = ['#00CCEB', '#FF7D28', '#915591'];
const neutralColors = ['#0A64A0', '#DC2878', '#501EB4', '#49516F'];
const statusColors = {
  critical: '#FF324D',
  error: '#FF324D',
  warning: '#FFD602',
  ok: '#8CC800',
  unknown: '#a8a8a8',
  disabled: '#a8a8a8',
};
const darkColors = ['#333333', '#444444', '#555555', '#666666', '#777777', '#999999'];
const lightColors = ['#F6F6F6', '#EEEEEE', '#DDDDDD', '#CCCCCC', '#BBBBBB', '#AAAAAA'];
const backgroundColor = '#FFFFFF';
const textColor = '#333333';
const borderColor = 'rgba(0, 0, 0, 0.15)';
const activeColor = rgba('#DDDDDD', 0.5);
const fontPath = 'https://fonts.gstatic.com/s/worksans/v2';

const baseSpacing = 24;

const borderWidth = 2;

export default deepFreeze({
  global: {
    animation: {
      duration: '1s',
    },
    borderSize: {
      xsmall: '1px',
      small: '2px',
      medium: `${baseSpacing / 8}px`,
      large: `${baseSpacing / 4}px`,
      xlarge: `${baseSpacing}px`,
    },
    breakpoints: {
      narrow: 699,
    },
    centerColumnWidth: `${baseSpacing * 48}px`,
    colors: {
      active: activeColor,
      accent: accentColors,
      background: backgroundColor,
      black: '#000000',
      border: borderColor,
      brand: brandColor,
      dark: darkColors,
      darkBackground: {
        text: 'rgba(255, 255, 255, 0.85)',
      },
      light: lightColors,
      neutral: neutralColors,
      placeholder: '#AAAAAA',
      status: statusColors,
      text: textColor,
      white: '#FFFFFF',
    },
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
      backgroundColor: '#f8f8f8',
      border: {
        width: '0px',
        radius: '0px',
      },
      shadow: '0px 3px 8px rgba(100, 100, 100, 0.50)',
    },
    edgeSize: {
      xsmall: `${baseSpacing / 4}px`,
      small: `${baseSpacing / 2}px`,
      medium: `${baseSpacing}px`,
      large: `${baseSpacing * 2}px`,
      xlarge: `${baseSpacing * 4}px`,
    },
    focus: {
      border: {
        color: css`${props => colorForName('accent-1', props.theme)}`,
        width: '2px',
      },
    },
    font: {
      family: "'Work Sans', Arial, sans-serif",
      face: `
        @font-face {
          font-family: 'Work Sans';
          font-style: normal;
          font-weight: 300;
          src:
            local('Work Sans Light'),
            local('WorkSans-Light'),
            url("${fontPath}/FD_Udbezj8EHXbdsqLUplxampu5_7CjHW5spxoeN3Vs.woff2") format('woff2');
        }

        @font-face {
          font-family: 'Work Sans';
          font-style: normal;
          font-weight: 400;
          src:
            local('Work Sans'),
            local('WorkSans-Regular'),
            url("${fontPath}/ElUAY9q6T0Ayx4zWzW63VJBw1xU1rKptJj_0jans920.woff2") format('woff2');
        }

        @font-face {
          font-family: 'Work Sans';
          font-style: normal;
          font-weight: 500;
          src:
            local('Work Sans Medium'),
            local('WorkSans-Medium'),
            url("${fontPath}/Nbre-U_bp6Xktt8cpgwaJBampu5_7CjHW5spxoeN3Vs.woff2") format('woff2');
        }

        @font-face {
          font-family: 'Work Sans';
          font-style: normal;
          font-weight: 600;
          src:
            local('Work Sans SemiBold'),
            local('WorkSans-SemiBold'),
            url("${fontPath}/z9rX03Xuz9ZNHTMg1_ghGRampu5_7CjHW5spxoeN3Vs.woff2") format('woff2');
        }

        @font-face {
          font-family: 'Work Sans';
          font-style: normal;
          font-weight: 700;
          src:
            local('Work Sans Bold'),
            local('WorkSans-Bold'),
            url("${fontPath}/4udXuXg54JlPEP5iKO5AmRampu5_7CjHW5spxoeN3Vs.woff2") format('woff2');
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
    },
    lineHeight: '24px',
    opacity: {
      weak: '0.8',
      medium: '0.4',
      strong: '0.1',
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
    },
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
      radius: '5px',
    },
    colors: {
      accent: css`${props => colorForName('accent-1', props.theme)}`,
      critical: css`${props => props.theme.global.colors.status.critical}`,
      secondary: css`${props => colorForName('neutral-2', props.theme)}`,
      text: css`${props => props.theme.global.colors.text}`,
    },
    minWidth: `${baseSpacing * 4}px`,
    maxWidth: `${baseSpacing * 16}px`,
    padding: {
      vertical: `${(baseSpacing / 2) - borderWidth}px`,
      horizontal: `${(baseSpacing / 2) - borderWidth}px`,
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
    circle: {
      color: {
        day: css`${props => colorForName('light-3', props.theme)}`,
        night: css`${props => colorForName('dark-2', props.theme)}`,
      },
      width: '2px',
    },
    hour: {
      color: {
        day: css`${props => colorForName('dark-1', props.theme)}`,
        night: css`${props => colorForName('white', props.theme)}`,
      },
      width: '3px',
      size: `${baseSpacing}px`,
    },
    minute: {
      color: {
        day: css`${props => colorForName('dark-4', props.theme)}`,
        night: css`${props => colorForName('light-6', props.theme)}`,
      },
      width: '2px',
      size: `${Math.round(baseSpacing / 2)}px`,
    },
    second: {
      color: {
        day: css`${props => colorForName('accent-2', props.theme)}`,
        night: css`${props => colorForName('accent-2', props.theme)}`,
      },
      width: '1px',
      size: `${Math.round(baseSpacing / 2.666)}px`,
    },
    size: {
      small: `${baseSpacing * 3}px`,
      medium: `${baseSpacing * 4}px`,
      large: `${baseSpacing * 6}px`,
      xlarge: `${baseSpacing * 9}px`,
      huge: `${baseSpacing * 12}px`,
    },
  },
  grommet: {},
  heading: {
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
    weight: 300,
  },
  icon: {
    extend: css`
      ${props => props.color && props.color !== 'plain' && `
        fill: ${colorForName(props.color, props.theme)};
        stroke: ${colorForName(props.color, props.theme)};
      `}

      ${props => props.dark && `
        fill: ${props.theme.global.colors.darkBackground.text};
        stroke: ${props.theme.global.colors.darkBackground.text};
      `}
    `,
  },
  layer: {
    backgroundColor: '#FFFFFF',
    border: {
      radius: '4px',
    },
    overlayBackgroundColor: 'rgba(0, 0, 0, 0.5)',
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
  },
});
