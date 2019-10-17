import React from 'react';

import { ThemeContext } from 'styled-components';

import { normalizeColor, parseMetricToNum } from '../../utils';

import { StyledChart } from './StyledChart';
import { normalizeValues, normalizeBounds } from './utils';

const defaultSize = { height: 'small', width: 'medium' };

const Chart = React.forwardRef(
  (
    {
      bounds: propsBounds,
      color = 'accent-1',
      gap,
      justify = 'between',
      onClick,
      onHover,
      overflow = false,
      round,
      size: propsSize = defaultSize,
      thickness = 'medium',
      type = 'bar',
      values: propsValues = [],
      ...rest
    },
    ref,
  ) => {
    const theme = React.useContext(ThemeContext);
    const [values, setValues] = React.useState([]);
    const [bounds, setBounds] = React.useState([[0, 0], [0, 0]]);
    const [containerSize, setContainerSize] = React.useState([0, 0]);
    const [size, setSize] = React.useState([0, 0]);
    const [scale, setScale] = React.useState([1, 1]);
    const [strokeWidth, setStrokeWidth] = React.useState(0);
    const containerRef = ref || React.useRef();

    // calculations
    React.useEffect(() => {
      const nextValues = normalizeValues(propsValues);
      setValues(nextValues);

      const nextBounds = normalizeBounds(propsBounds, nextValues);
      setBounds(nextBounds);

      const nextStrokeWidth = parseMetricToNum(
        theme.global.edgeSize[thickness] || thickness,
      );
      setStrokeWidth(nextStrokeWidth);

      const gapWidth = gap
        ? parseMetricToNum(theme.global.edgeSize[gap] || gap)
        : nextStrokeWidth;

      // autoWidth is how wide we'd pefer
      const autoWidth =
        nextStrokeWidth * nextValues.length +
        (nextValues.length - 1) * gapWidth;

      const sizeWidth =
        typeof propsSize === 'string'
          ? propsSize
          : propsSize.width || defaultSize.width;
      let width;
      if (sizeWidth === 'full') {
        [width] = containerSize;
      } else if (sizeWidth === 'auto') {
        width = autoWidth;
      } else {
        width = parseMetricToNum(theme.global.size[sizeWidth] || sizeWidth);
      }

      const sizeHeight =
        typeof propsSize === 'string'
          ? propsSize
          : propsSize.height || defaultSize.height;
      let height;
      if (sizeHeight === 'full') {
        [, height] = containerSize;
      } else {
        height = parseMetricToNum(theme.global.size[sizeHeight] || sizeHeight);
      }

      setSize([width, height]);

      const nextScale = [
        (sizeWidth === 'auto' ? autoWidth : width) /
          (nextBounds[0][1] - nextBounds[0][0]),
        height / (nextBounds[1][1] - nextBounds[1][0]),
      ];
      setScale(nextScale);
    }, [
      containerSize,
      gap,
      justify,
      propsBounds,
      propsSize,
      propsValues,
      thickness,
    ]);

    // container size, if needed
    React.useEffect(() => {
      const onResize = () => {
        const containerNode = containerRef.current;
        if (containerNode) {
          const { parentNode } = containerNode;
          if (parentNode) {
            const rect = parentNode.getBoundingClientRect();
            setContainerSize([rect.width, rect.height]);
          }
        }
      };

      if (propsSize.width === 'full' || propsSize.height === 'full') {
        window.addEventListener('resize', onResize);
        onResize();
        return () => window.removeEventListener('resize', onResize);
      }
      return undefined;
    }, []);

    const renderBars = () =>
      (values || []).map((valueArg, index) => {
        const { label, onHover: valueOnHover, value, ...valueRest } = valueArg;

        const key = `p-${index}`;
        const bottom = value.length === 2 ? bounds[1][0] : value[1];
        const top = value.length === 2 ? value[1] : value[2];
        if (top !== 0) {
          const d =
            `M ${(value[0] - bounds[0][0]) * scale[0]},` +
            `${size[1] - (bottom - bounds[1][0]) * scale[1]}` +
            ` L ${(value[0] - bounds[0][0]) * scale[0]},` +
            `${size[1] - (top - bounds[1][0]) * scale[1]}`;

          let hoverProps;
          if (valueOnHover) {
            hoverProps = {
              onMouseOver: () => valueOnHover(true),
              onMouseLeave: () => valueOnHover(false),
            };
          }

          return (
            <g key={key} fill="none">
              <title>{label}</title>
              <path d={d} {...hoverProps} {...valueRest} />
            </g>
          );
        }
        return undefined;
      });

    const renderLine = () => {
      let d = '';
      (values || []).forEach(({ value }, index) => {
        d +=
          `${index ? ' L' : 'M'} ${(value[0] - bounds[0][0]) * scale[0]},` +
          `${size[1] - (value[1] - bounds[1][0]) * scale[1]}`;
      });

      let hoverProps;
      if (onHover) {
        hoverProps = {
          onMouseOver: () => onHover(true),
          onMouseLeave: () => onHover(false),
        };
      }
      let clickProps;
      if (onClick) {
        clickProps = { onClick };
      }

      return (
        <g fill="none">
          <path d={d} {...hoverProps} {...clickProps} />
        </g>
      );
    };

    const renderArea = () => {
      let d = '';
      (values || []).forEach(({ value }, index) => {
        const top = value.length === 2 ? value[1] : value[2];
        d +=
          `${!index ? 'M' : ' L'} ${(value[0] - bounds[0][0]) * scale[0]},` +
          `${size[1] - (top - bounds[1][0]) * scale[1]}`;
      });
      (values || []).reverse().forEach(({ value }) => {
        const bottom = value.length === 2 ? bounds[1][0] : value[1];
        d +=
          ` L ${(value[0] - bounds[0][0]) * scale[0]},` +
          `${size[1] - (bottom - bounds[1][0]) * scale[1]}`;
      });
      if (d.length > 0) {
        d += ' Z';
      }

      let hoverProps;
      if (onHover) {
        hoverProps = {
          onMouseOver: () => onHover(true),
          onMouseLeave: () => onHover(false),
        };
      }
      let clickProps;
      if (onClick) {
        clickProps = { onClick };
      }

      return (
        <g fill={normalizeColor(color.color || color, theme)}>
          <path d={d} {...hoverProps} {...clickProps} />
        </g>
      );
    };

    let contents;
    if (type === 'bar') {
      contents = renderBars();
    } else if (type === 'line') {
      contents = renderLine();
    } else if (type === 'area') {
      contents = renderArea();
    }

    const viewBox = overflow
      ? `0 0 ${size[0]} ${size[1]}`
      : `-${strokeWidth / 2} -${strokeWidth / 2} ${size[0] +
          strokeWidth} ${size[1] + strokeWidth}`;
    const colorName = typeof color === 'object' ? color.color : color;
    const opacity = color.opacity
      ? theme.global.opacity[color.opacity]
      : undefined;

    return (
      <StyledChart
        ref={containerRef}
        viewBox={viewBox}
        preserveAspectRatio="none"
        width={size === 'full' ? '100%' : size[0]}
        height={size === 'full' ? '100%' : size[1]}
        {...rest}
      >
        <g
          stroke={normalizeColor(colorName, theme)}
          strokeWidth={strokeWidth}
          strokeLinecap={round ? 'round' : 'butt'}
          strokeLinejoin={round ? 'round' : 'miter'}
          opacity={opacity}
        >
          {contents}
        </g>
      </StyledChart>
    );
  },
);

Chart.displayName = 'Chart';

let ChartDoc;
if (process.env.NODE_ENV !== 'production') {
  ChartDoc = require('./doc').doc(Chart); // eslint-disable-line global-require
}
const ChartWrapper = ChartDoc || Chart;

export { ChartWrapper as Chart };
