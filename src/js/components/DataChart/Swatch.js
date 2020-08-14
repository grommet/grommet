import React, { useContext } from 'react';
import { ThemeContext } from 'styled-components';
import { normalizeColor, parseMetricToNum } from '../../utils';

const Swatch = ({ aspect, color, point, thickness }) => {
  const theme = useContext(ThemeContext);
  const dim = parseInt(theme.global.spacing, 10) / 2;
  const half = dim / 2;
  let width = dim;
  let content;
  if (aspect === 'x')
    content = <path d={`M 0 ${half} L ${dim} ${half}`} stroke="#000" />;
  else if (aspect === 'y')
    content = <path d={`M ${half} 0 L ${half} ${dim}`} stroke="#000" />;
  else if (aspect === 'thickness')
    content = (
      <g stroke="#000" fill="none">
        <circle cx={half} cy={half} r={half / 4} />
        <circle cx={half} cy={half} r={half - 1} />
      </g>
    );
  else if (aspect === 'color')
    content = (
      <g>
        <rect x={0} y={0} width={half} height={dim} fill="#000" opacity={0.4} />
        <rect
          x={half}
          y={0}
          width={half}
          height={dim}
          fill="#000"
          opacity={0.8}
        />
      </g>
    );
  else if (point === 'circle')
    content = <circle cx={half} cy={half} r={half} />;
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
    else if (point === 'square')
      d = `M 0 0 L ${dim} 0 L ${dim} ${dim} L 0 ${dim} Z`;
    // TODO: dash
    else if (thickness) {
      width = parseMetricToNum(theme.global.edgeSize[thickness]) || dim;
      d = `M 0 0 L ${width} 0 L ${width} ${dim} L 0 ${dim} Z`;
    } // box
    else d = `M 0 0 L ${dim} 0 L ${dim} ${dim} L 0 ${dim} Z`;
    content = <path d={d} />;
  }
  const opacity =
    color && color.opacity ? theme.global.opacity[color.opacity] : undefined;
  return (
    <svg
      width={width}
      height={dim}
      viewBox={`0 0 ${width} ${dim}`}
      fill={color ? normalizeColor(color.color || color, theme) : undefined}
      opacity={opacity}
      stroke="none"
    >
      {content}
    </svg>
  );
};

export { Swatch };
