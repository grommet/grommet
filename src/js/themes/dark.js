import { rgba } from 'polished';
import { css } from 'styled-components';

import { colorForName, deepFreeze, colorIsDark } from '../utils';

const brandColor = '#FFCA58';
const accentColors = ['#FD6FFF', '#60EB9F', '#60EBE1', '#FFCA58'];
const neutralColors = ['#EB6060', '#01C781', '#6095EB', '#FFB200'];
const statusColors = {
  critical: '#FF3333',
  error: '#FF3333',
  warning: '#F7E464',
  ok: '#7DD892',
  unknown: '#a8a8a8',
  disabled: '#a8a8a8',
};
const lightColors = ['#333333', '#444444', '#555555', '#666666', '#777777', '#999999'];
const darkColors = ['#F6F6F6', '#EEEEEE', '#DDDDDD', '#CCCCCC', '#BBBBBB', '#AAAAAA'];
const backgroundColor = '#111111';
const textColor = '#eeeeee';
const borderColor = 'rgba(255, 255, 255, 0.50)';
const focusColor = accentColors[0];
const activeColor = rgba('#666666', 0.5);

const colors = {
  active: activeColor,
  accent: accentColors,
  background: backgroundColor,
  black: '#000000',
  border: borderColor,
  brand: brandColor,
  dark: darkColors,
  darkBackground: {
    text: textColor,
  },
  focus: focusColor,
  light: lightColors,
  lightBackground: {
    text: '#000000',
  },
  neutral: neutralColors,
  placeholder: '#AAAAAA',
  status: statusColors,
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

export default deepFreeze({
  global: {
    colors,
    focus: {
      border: {
        color: css`${props => colorForName('focus', props.theme)}`,
        width: '2px',
      },
    },
    hover: {
      backgroundColor: css`${props => props.theme.global.colors.active}`,
      textColor: '#FFFFFF',
    },
    input: {
      border: {
        width: '1px',
        radius: '4px',
        color: css`${props => props.theme.global.colors.border}`,
      },
      weight: 700,
    },
  },
  icon: {
    extend: css`${(props) => {
      let { color } = props.theme.icon;
      if (props.color && props.color !== 'plain') {
        color = colorForName(props.color, props.theme);
      }
      if (props.dark === colorIsDark(color)) {
        color = props.dark ?
          props.theme.global.colors.darkBackground.text :
          props.theme.global.colors.lightBackground.text;
      }
      return `
        fill: ${color};
        stroke: ${color};
      `;
    }
} `,
  },
  anchor: {
    color: '#2b4369',
  },
  layer: {
    backgroundColor,
    overlayBackgroundColor: 'rgba(48, 48, 48, 0.5)',
  },
});
