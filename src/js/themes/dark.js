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
const lightColors = ['#333333', '#444444', '#555555', '#666666', '#777777', '#999999'];
const darkColors = ['#F6F6F6', '#EEEEEE', '#DDDDDD', '#CCCCCC', '#BBBBBB', '#AAAAAA'];
const backgroundColor = '#111111';
const textColor = '#eeeeee';
const borderColor = 'rgba(255, 255, 255, 0.33)';
const focusColor = accentColors[0];
const activeColor = rgba('#666666', 0.5);

export default deepFreeze({
  global: {
    colors: {
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
    },
    drop: {
      backgroundColor: '#333333',
      border: {
        width: '0px',
        radius: '0px',
      },
      shadow: '0px 3px 8px rgba(100, 100, 100, 0.50)',
    },
    elevation: {
      none: 'none',
      xsmall: '0px 1px 2px rgba(100, 100, 100, 0.50)',
      small: '0px 2px 4px rgba(100, 100, 100, 0.50)',
      medium: '0px 3px 8px rgba(100, 100, 100, 0.50)',
      large: '0px 6px 12px rgba(100, 100, 100, 0.50)',
      xlarge: '0px 8px 16px rgba(100, 100, 100, 0.50)',
    },
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
    color: textColor,
  },
  layer: {
    backgroundColor,
    overlayBackgroundColor: 'rgba(48, 48, 48, 0.5)',
  },
});
