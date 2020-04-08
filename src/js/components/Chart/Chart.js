import React, { useContext, useEffect, useRef, useState } from 'react';

import { ThemeContext } from 'styled-components';
import { defaultProps } from '../../default-props';

import { normalizeColor, parseMetricToNum } from '../../utils';

import { StyledChart } from './StyledChart';
import { normalizeBounds, normalizeValues } from './utils';

const gradientMaskColor = '#ffffff';

// use constants so re-renders don't re-trigger effects
const defaultSize = { height: 'small', width: 'medium' };
const defaultValues = [];

const Chart = React.forwardRef(
  (
    {
      bounds: propsBounds,
      color,
      dash,
      gap,
      id,
      onClick,
      onHover,
      overflow = false,
      round,
      size: propsSize = defaultSize,
      thickness = 'medium',
      type = 'bar',
      values: propsValues = defaultValues,
      ...rest
    },
    ref,
  ) => {
    const theme = useContext(ThemeContext) || defaultProps.theme;
    const [values, setValues] = useState([]);
    const [bounds, setBounds] = useState([
      [0, 0],
      [0, 0],
    ]);
    const [containerSize, setContainerSize] = useState([0, 0]);
    const [size, setSize] = useState([0, 0]);
    const [scale, setScale] = useState([1, 1]);
    const [strokeWidth, setStrokeWidth] = useState(0);
    const containerRef = ref || useRef();

    // calculations
    useEffect(() => {
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
      propsBounds,
      propsSize,
      propsValues,
      theme.global.edgeSize,
      theme.global.size,
      thickness,
    ]);

    // set container size when we get ref or when size changes
    if (
      containerRef.current &&
      propsSize &&
      (propsSize === 'full' ||
        propsSize.height === 'full' ||
        propsSize.width === 'full')
    ) {
      const containerNode = containerRef.current;
      if (containerNode) {
        const { parentNode } = containerNode;
        if (parentNode) {
          const rect = parentNode.getBoundingClientRect();
          if (
            rect.width !== containerSize[0] ||
            rect.height !== containerSize[1]
          ) {
            setContainerSize([rect.width, rect.height]);
          }
        }
      }
    }

    // container size, if needed
    useEffect(() => {
      const onResize = () => {
        const { parentNode } = containerRef.current;
        const rect = parentNode.getBoundingClientRect();
        setContainerSize([rect.width, rect.height]);
      };

      if (
        propsSize &&
        (propsSize === 'full' ||
          propsSize.width === 'full' ||
          propsSize.height === 'full')
      ) {
        window.addEventListener('resize', onResize);
        return () => window.removeEventListener('resize', onResize);
      }
      return undefined;
    }, [containerRef, propsSize]);

    const useGradient = color && Array.isArray(color);

    let strokeDasharray;
    if (dash) {
      if (round) {
        strokeDasharray = `${strokeWidth} ${strokeWidth * 1.5}`;
      } else {
        strokeDasharray = `${strokeWidth * 2} ${strokeWidth / 2}`;
      }
    }

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
          let clickProps;
          if (onClick) {
            clickProps = { onClick };
          }

          return (
            <g key={key} fill="none">
              <title>{label}</title>
              <path
                d={d}
                {...hoverProps}
                {...clickProps}
                {...valueRest}
                strokeDasharray={strokeDasharray}
              />
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
          <path
            d={d}
            {...hoverProps}
            {...clickProps}
            strokeDasharray={strokeDasharray}
          />
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
        <g>
          <path d={d} {...hoverProps} {...clickProps} />
        </g>
      );
    };

    const renderPoints = () =>
      (values || []).map((valueArg, index) => {
        const { label, onHover: valueOnHover, value, ...valueRest } = valueArg;

        const key = `p-${index}`;

        let hoverProps;
        if (valueOnHover) {
          hoverProps = {
            onMouseOver: () => valueOnHover(true),
            onMouseLeave: () => valueOnHover(false),
          };
        }
        let clickProps;
        if (onClick) {
          clickProps = { onClick };
        }

        const center = value.length === 2 ? value[1] : value[2];
        let shape;
        if (round) {
          const cx = (value[0] - bounds[0][0]) * scale[0];
          const cy = size[1] - (center - bounds[1][0]) * scale[1];
          shape = (
            <circle
              cx={cx}
              cy={cy}
              r={strokeWidth / 2}
              {...hoverProps}
              {...clickProps}
              {...valueRest}
            />
          );
        } else {
          const x = (value[0] - bounds[0][0]) * scale[0] - strokeWidth / 2;
          const y =
            size[1] - (center - bounds[1][0]) * scale[1] - strokeWidth / 2;
          shape = (
            <rect
              x={x}
              y={y}
              width={strokeWidth}
              height={strokeWidth}
              {...hoverProps}
              {...clickProps}
              {...valueRest}
            />
          );
        }

        return (
          <g key={key} stroke="none">
            <title>{label}</title>
            {shape}
          </g>
        );
      });

    let contents;
    if (type === 'bar') {
      contents = renderBars();
    } else if (type === 'line') {
      contents = renderLine();
    } else if (type === 'area') {
      contents = renderArea();
    } else if (type === 'point') {
      contents = renderPoints();
    }

    const viewBounds = overflow
      ? [0, 0, size[0], size[1]]
      : [
          -(strokeWidth / 2),
          -(strokeWidth / 2),
          size[0] + strokeWidth,
          size[1] + strokeWidth,
        ];
    const viewBox = viewBounds.join(' ');
    let colorName;
    if (!useGradient) {
      if (color && color.color) colorName = color.color;
      else if (color) colorName = color;
      else if (theme.chart && theme.chart.color) colorName = theme.chart.color;
    }
    const opacity =
      color && color.opacity ? theme.global.opacity[color.opacity] : undefined;

    let stroke;
    if (type !== 'point') {
      if (useGradient) stroke = gradientMaskColor;
      else stroke = normalizeColor(colorName, theme);
    } else stroke = 'none';

    let fill;
    if (type === 'point' || type === 'area') {
      if (useGradient) fill = gradientMaskColor;
      else fill = normalizeColor(colorName, theme);
    } else fill = 'none';

    const drawing = (
      <g
        stroke={stroke}
        strokeWidth={type !== 'point' ? strokeWidth : undefined}
        fill={fill}
        strokeLinecap={round ? 'round' : 'butt'}
        strokeLinejoin={round ? 'round' : 'miter'}
        opacity={opacity}
      >
        {contents}
      </g>
    );

    let defs;
    let gradientRect;
    if (useGradient && size[1]) {
      const gradientId = `${id}-gradient`;
      const maskId = `${id}-mask`;
      defs = (
        <defs>
          <linearGradient id={gradientId} x1={0} y1={0} x2={0} y2={1}>
            {color
              .sort((c1, c2) => c2.value - c1.value)
              .map(({ value, color: gradientColor }) => (
                <stop
                  key={value}
                  offset={
                    (size[1] - (value - bounds[1][0]) * scale[1]) / size[1]
                  }
                  stopColor={normalizeColor(gradientColor, theme)}
                />
              ))}
          </linearGradient>
          <mask id={maskId}>{drawing}</mask>
        </defs>
      );

      gradientRect = (
        <rect
          x={viewBounds[0]}
          y={viewBounds[1]}
          width={viewBounds[2]}
          height={viewBounds[3]}
          fill={`url(#${gradientId})`}
          mask={`url(#${maskId})`}
        />
      );
    }

    return (
      <StyledChart
        ref={containerRef}
        id={id}
        viewBox={viewBox}
        preserveAspectRatio="none"
        width={size === 'full' ? '100%' : size[0]}
        height={size === 'full' ? '100%' : size[1]}
        {...rest}
      >
        {defs}
        {useGradient ? gradientRect : drawing}
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
