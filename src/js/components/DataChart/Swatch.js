import React, { useContext } from 'react';
import { ThemeContext } from 'styled-components';
import { normalizeColor } from '../../utils';

const Swatch = ({ color, point }) => {
  const theme = useContext(ThemeContext);
  const dim = parseInt(theme.global.spacing, 10) / 2;
  const half = dim / 2;
  let content;
  if (point === 'circle') content = <circle cx={half} cy={half} r={half} />;
  else {
    let d;
    if (point === 'diamond')
      d = `M ${half} 0 L ${dim} ${half} L ${half} ${dim} L 0 ${half} Z`;
    else if (point === 'star') {
      const off1 = half / 3;
      const off2 = off1 * 2;
      d = `M ${half} 0 L ${half - off2} ${dim} L ${dim} ${half -
        off1} L 0 ${half - off1} L ${half + off2} ${dim} Z`;
    } else if (point === 'triangle')
      d = `M ${half} 0 L ${dim} ${dim} L 0 ${dim} Z`;
    else if (point === 'triangleDown')
      d = `M 0 0 L ${dim} 0 L ${half} ${dim} Z`;
    // square
    else d = `M 0 0 L ${dim} 0 L ${dim} ${dim} L 0 ${dim} Z`;
    content = <path d={d} />;
  }
  const opacity =
    color && color.opacity ? theme.global.opacity[color.opacity] : undefined;
  return (
    <svg
      width={dim}
      height={dim}
      viewBox={`0 0 ${dim} ${dim}`}
      fill={normalizeColor(color.color || color, theme)}
      opacity={opacity}
      stroke="none"
    >
      {content}
    </svg>
  );
};

export { Swatch };
