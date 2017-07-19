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
const backgroundColor = '#FFFFFF';
const brandColor = '#865CD6';
const textColor = '#333333';
const fontPath = 'https://fonts.gstatic.com/s/worksans/v2';

const baseSpacing = 24;

const borderWidth = 2;

export default {
  brand: {
    centerColumnWidth: `${baseSpacing * 48}px`,
    control: {
      font: {
        weight: 600,
        size: '19px',
      },
    },
    focus: {
      border: {},
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
    lineHeight: '24px',
    spacing: `${baseSpacing}px`,
  },
  colors: {
    accent: accentColors,
    activeTextColor: '#FFFFFF',
    background: backgroundColor,
    brand: brandColor,
    hoverTextColor: '#000000',
    neutral: neutralColors,
    status: statusColors,
    text: textColor,
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
};
