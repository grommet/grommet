import { rgba } from 'polished';
import { css } from 'styled-components';

import { colorForName, deepFreeze } from '../utils';

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
const backgroundColor = '#111111';
const textColor = '#eeeeee';
const borderColor = 'rgba(255, 255, 255, 0.33)';
const focusColor = accentColors[0];
const activeColor = rgba('#666666', 0.5);

const colors = {
  active: activeColor,
  background: backgroundColor,
  black: '#000000',
  border: borderColor,
  brand: brandColor,
  focus: focusColor,
  placeholder: '#AAAAAA',
  text: textColor,
  white: '#FFFFFF',
};

const colorArray = (array, prefix) =>
  array.forEach((color, index) => {
    colors[`${prefix}-${index + 1}`] = color;
  });

colorArray(accentColors, 'accent');
colorArray(neutralColors, 'neutral');
Object.keys(statusColors).forEach((color) => {
  colors[`status-${color}`] = statusColors[color];
});

export default deepFreeze({
  global: {
    colors,
    control: {
      color: brandColor,
    },
    drop: {
      background: '#333333',
    },
    focus: {
      border: {
        color: css`${props => colorForName('focus', props.theme)}`,
        width: '2px',
      },
    },
    font: {
      family: 'Arial',
    },
    input: {
      weight: 700,
    },
    text: {
      dark: textColor,
      light: '#000000',
    },
  },
  anchor: {
    color: brandColor,
  },
  icon: {
    color: textColor,
    colors,
  },
  layer: {
    background: backgroundColor,
    overlay: {
      background: 'rgba(48, 48, 48, 0.5)',
    },
  },
});
