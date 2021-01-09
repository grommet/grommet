import React, { useContext } from 'react';

import { ThemeContext } from 'styled-components';
import { defaultProps } from '../../default-props';
import { normalizeColor, parseMetricToNum } from '../../utils';
import { StyledDropCaret } from './StyledDrop';

const DropCaret = ({
  background: backgroundProp,
  border,
  side = 'top',
  size,
}) => {
  const theme = useContext(ThemeContext) || defaultProps.theme;
  const backgroundColor = normalizeColor(
    backgroundProp || theme.global.drop.background,
    theme,
  );
  const borderColor = border
    ? normalizeColor(border.color || 'border', theme)
    : undefined;
  const borderSize = border
    ? theme.global.borderSize[border.size] || border.size
    : undefined;
  const edgeSize = parseMetricToNum(theme.global.edgeSize[size || 'medium']);
  const [width, height] = [edgeSize, edgeSize / 2];

  // path leaves off at 2 so line join style isn't clipped
  return (
    <StyledDropCaret
      height={height}
      side={side}
      width={width}
      viewBox={`0 0 ${width} ${height}`}
    >
      <path
        d={`M 0 ${height} L ${width / 2} 2 L ${width} ${height}`}
        fill={backgroundColor || 'none'}
        stroke={borderColor || 'none'}
        strokeWidth={borderSize}
        strokeLinejoin="round"
      />
    </StyledDropCaret>
  );
};

export { DropCaret };
