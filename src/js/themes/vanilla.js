import { lighten, rgba } from 'polished';
import { css } from 'styled-components';

import { colorForName } from '../components/utils';

const brandColor = '#865CD6';
const accentColors = ['#00CCEB', '#FF7D28'];
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
const fontPath = 'https://fonts.gstatic.com/s/worksans/v2';

const baseSpacing = 24;

const borderWidth = 2;

export default {
  global: {
    borderSize: {
      small: '1px',
      medium: `${baseSpacing / 8}px`,
      large: `${baseSpacing / 4}px`,
      xlarge: `${baseSpacing}px`,
    },
    centerColumnWidth: `${baseSpacing * 48}px`,
    colors: {
      accent: accentColors,
      background: backgroundColor,
      black: '#000000',
      brand: brandColor,
      dark: darkColors,
      darkBackgroundTextColor: 'rgba(255, 255, 255, 0.85)',
      light: lightColors,
      neutral: neutralColors,
      status: statusColors,
      text: textColor,
      white: '#FFFFFF',
    },
    control: {
      font: {
        weight: 600,
        size: '19px',
      },
    },
    drop: {
      backgroundColor: '#f8f8f8',
      boxShadow: 'none',
      border: {
        width: '0px',
        radius: '0px',
      },
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
      backgroundColor: rgba('#DDDDDD', 0.5),
      textColor: '#000000',
    },
    input: {
      border: {
        width: '1px',
        radius: '4px',
        color: 'rgba(0, 0, 0, 0.15)',
      },
    },
    lineHeight: '24px',
    opacity: {
      weak: '0.8',
      medium: '0.4',
      strong: '0.1',
    },
    placeholder: {
      color: '#AAAAAA',
    },
    selected: {
      backgroundColor: lighten(0.23, brandColor),
      textColor,
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
    color: brandColor,
  },
  button: {
    border: {
      width: `${borderWidth}px`,
      radius: '5px',
    },
    colors: {
      accent: accentColors[0],
      critical: statusColors.critical,
      secondary: neutralColors[1],
    },
    minWidth: `${baseSpacing * 5}px`,
    maxWidth: `${baseSpacing * 16}px`,
    padding: {
      vertical: `${(baseSpacing / 3) - borderWidth}px`,
      horizontal: `${baseSpacing - borderWidth}px`,
    },
  },
  grommet: {},
  heading: {
    level: {
      1: {
        medium: { size: '48px', height: 1.125, maxWidth: `${baseSpacing * 24}px` },
        small: { size: '24px', height: 1.333, maxWidth: `${baseSpacing * 18}px` },
        large: { size: '96px', height: 1.125, maxWidth: `${baseSpacing * 36}px` },
      },
      2: {
        medium: { size: '36px', height: 1.23, maxWidth: `${baseSpacing * 24}px` },
        small: { size: '18px', height: 1.333, maxWidth: `${baseSpacing * 18}px` },
        large: { size: '48px', height: 1.125, maxWidth: `${baseSpacing * 36}px` },
      },
      3: {
        medium: { size: '24px', height: 1.333, maxWidth: `${baseSpacing * 24}px` },
        small: { size: '18px', height: 1.333, maxWidth: `${baseSpacing * 18}px` },
        large: { size: '36px', height: 1.23, maxWidth: `${baseSpacing * 36}px` },
      },
      4: {
        medium: { size: '18px', height: 1.333, maxWidth: `${baseSpacing * 24}px` },
        small: { size: '16px', height: 1.333, maxWidth: `${baseSpacing * 18}px` },
        large: { size: '24px', height: 1.333, maxWidth: `${baseSpacing * 36}px` },
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
        fill: ${props.theme.global.colors.darkBackgroundTextColor};
        stroke: ${props.theme.global.colors.darkBackgroundTextColor};
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
    medium: { size: '16px', height: 1.375, maxWidth: `${baseSpacing * 24}px` },
    small: { size: '14px', height: 1.43, maxWidth: `${baseSpacing * 18}px` },
    large: { size: '24px', height: 1.167, maxWidth: `${baseSpacing * 36}px` },
    xlarge: { size: '32px', height: 1.1875, maxWidth: `${baseSpacing * 48}px` },
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
};
