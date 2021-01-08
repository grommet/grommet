import React, { useContext } from 'react';

import { ThemeContext } from 'styled-components';
import { defaultProps } from '../../default-props';
import {
  backgroundAndTextColors,
  normalizeBackground,
} from '../../utils/background';
import { StyledDropCaret } from './StyledDrop';

const DropCaret = ({
  background: backgroundProp,
  height = 12,
  side = 'top',
  width = 24,
}) => {
  const theme = useContext(ThemeContext) || defaultProps.theme;
  const background = normalizeBackground(
    backgroundProp || theme.global.drop.background,
    theme,
  );
  const [backgroundColor] = backgroundAndTextColors(
    background,
    undefined,
    theme,
  );
  let path;
  if (side === 'top')
    path = `M 0 ${height} L ${width / 2} 0 L ${width} ${height} Z`;
  else if (side === 'left')
    path = `M ${height} ${width} L 0 ${height / 2} L ${height} 0 Z`;
  else if (side === 'right')
    path = `M 0 0 L ${width} ${height / 2} L 0 ${height} Z`;
  else if (side === 'bottom')
    path = `M ${width} 0 L ${width / 2} ${height} L 0 0 Z`;

  return (
    <StyledDropCaret
      height={height}
      side={side}
      width={width}
      viewBox={`0 0 ${width} ${height}`}
    >
      <path d={path} fill={backgroundColor} />
    </StyledDropCaret>
  );
};

export { DropCaret };
