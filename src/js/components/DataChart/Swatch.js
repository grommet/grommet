import React, { useContext } from 'react';
import { ThemeContext } from 'styled-components';
import { normalizeColor, parseMetricToNum } from '../../utils';

const Swatch = ({
  aspect,
  color,
  dash,
  opacity: opacityProp,
  point,
  round,
  thickness,
  type,
}) => {
  const theme = useContext(ThemeContext);
  const dim = parseInt(theme.global.spacing, 10) / 2;
  const half = dim / 2;
  let height = dim;
  let width = dim;
  const normalizedColor = color
    ? normalizeColor(color.color || color, theme)
    : undefined;
  let fill = normalizedColor;
  let stroke = 'none';
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
  else if (point) {
    if (point === 'circle') content = <circle cx={half} cy={half} r={half} />;
    else {
      let d;
      if (point === 'diamond')
        d = `M ${half} 0 L ${dim} ${half} L ${half} ${dim} L 0 ${half} Z`;
      else if (point === 'star') {
        const off1 = half / 3;
        const off2 = off1 * 2;
        d = `M ${half} 0 L ${half - off2} ${dim} L ${dim} ${half - off1} L 0 ${
          half - off1
        } L ${half + off2} ${dim} Z`;
      } else if (point === 'triangle')
        d = `M ${half} 0 L ${dim} ${dim} L 0 ${dim} Z`;
      else if (point === 'triangleDown')
        d = `M 0 0 L ${dim} 0 L ${half} ${dim} Z`;
      else if (point === 'square')
        d = `M 0 0 L ${dim} 0 L ${dim} ${dim} L 0 ${dim} Z`;
      if (d) content = <path d={d} />;
    }
  } else if (type === 'area') {
    if (round) content = <circle cx={half} cy={half} r={half} />;
    else content = <rect x={0} y={0} width={width} height={height} />;
  } else {
    // draw a line oriented based on the type and then match style
    const strokeWidth =
      parseMetricToNum(theme.global.edgeSize[thickness]) || dim;
    let d;
    if (type === 'line' || type === 'area') {
      width = Math.max(width, strokeWidth * 4);
      height = strokeWidth;
      d = `M 0 ${height / 2} L ${width} ${height / 2}`;
    } else {
      width = strokeWidth;
      d = `M ${width / 2} 0 L ${width / 2} ${dim}`;
    }

    fill = 'none';
    stroke = normalizedColor;
    const strokeProps = {};
    if (round) strokeProps.strokeLinecap = 'round';
    if (dash)
      strokeProps.strokeDasharray = round
        ? `${strokeWidth} ${strokeWidth * 1.5}`
        : `${strokeWidth * 2} ${strokeWidth / 2}`;

    content = <path d={d} strokeWidth={strokeWidth} {...strokeProps} />;
  }

  const opacity =
    theme.global.opacity[color?.opacity || opacityProp] || undefined;

  return (
    <svg
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      fill={fill}
      opacity={opacity}
      stroke={stroke}
    >
      {content}
    </svg>
  );
};

export { Swatch };
