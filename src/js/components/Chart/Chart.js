import React, {
  useContext,
  useEffect,
  useLayoutEffect,
  useMemo,
  useState,
} from 'react';

import { ThemeContext } from 'styled-components';
import { defaultProps } from '../../default-props';

import { normalizeColor, parseMetricToNum, useForwardedRef } from '../../utils';

import { StyledChart } from './StyledChart';
import { normalizeBounds, normalizeValues } from './utils';

const gradientMaskColor = '#ffffff';

// use constants so re-renders don't re-trigger effects
const defaultSize = { height: 'small', width: 'medium' };
const defaultValues = [];

const Chart = React.forwardRef(
  (
    {
      a11yTitle,
      bounds: propsBounds,
      color,
      dash,
      gap,
      id,
      onClick,
      onHover,
      overflow = false,
      pad,
      point,
      round,
      size: propsSize = defaultSize,
      thickness = 'medium',
      type = 'bar',
      values: propsValues = defaultValues,
      ...rest
    },
    ref,
  ) => {
    const containerRef = useForwardedRef(ref);
    const theme = useContext(ThemeContext) || defaultProps.theme;

    // normalize variables

    const values = useMemo(() => normalizeValues(propsValues), [propsValues]);

    const bounds = useMemo(() => normalizeBounds(propsBounds, values), [
      propsBounds,
      values,
    ]);

    const strokeWidth = useMemo(
      () => parseMetricToNum(theme.global.edgeSize[thickness] || thickness),
      [theme.global.edgeSize, thickness],
    );

    const inset = useMemo(() => {
      let result = [0, 0, 0, 0];
      if (pad) {
        if (pad.horizontal) {
          const padSize = parseMetricToNum(
            theme.global.edgeSize[pad.horizontal],
          );
          result[0] += padSize;
          result[2] += padSize;
        }
        if (pad.vertical) {
          const padSize = parseMetricToNum(theme.global.edgeSize[pad.vertical]);
          result[1] += padSize;
          result[3] += padSize;
        }
        if (typeof pad === 'string') {
          const padSize = parseMetricToNum(theme.global.edgeSize[pad]);
          result = [padSize, padSize, padSize, padSize];
        }
      }
      return result;
    }, [pad, theme.global.edgeSize]);

    const strokeDasharray = useMemo(() => {
      if (dash) {
        if (round) return `${strokeWidth} ${strokeWidth * 1.5}`;
        return `${strokeWidth * 2} ${strokeWidth / 2}`;
      }
      return undefined;
    }, [dash, round, strokeWidth]);

    // potentially dynamic sizing

    const [containerSize, setContainerSize] = useState([0, 0]);

    const needContainerSize = useMemo(
      () =>
        propsSize &&
        (propsSize === 'full' ||
          propsSize === 'fill' ||
          propsSize.height === 'full' ||
          propsSize.height === 'fill' ||
          propsSize.width === 'full' ||
          propsSize.width === 'fill'),
      [propsSize],
    );

    const size = useMemo(() => {
      const gapWidth = gap
        ? parseMetricToNum(theme.global.edgeSize[gap] || gap)
        : strokeWidth;

      // autoWidth is how wide we'd pefer
      const autoWidth =
        strokeWidth * values.length + (values.length - 1) * gapWidth;

      const sizeWidth =
        typeof propsSize === 'string'
          ? propsSize
          : propsSize.width || defaultSize.width;
      let width;
      if (sizeWidth === 'full' || sizeWidth === 'fill') {
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
      if (sizeHeight === 'full' || sizeHeight === 'fill') {
        [, height] = containerSize;
      } else {
        height = parseMetricToNum(theme.global.size[sizeHeight] || sizeHeight);
      }

      return [width, height];
    }, [
      containerSize,
      gap,
      propsSize,
      strokeWidth,
      theme.global.edgeSize,
      theme.global.size,
      values,
    ]);

    const scale = useMemo(
      () => [
        (size[0] - (inset[0] + inset[2])) / (bounds[0][1] - bounds[0][0]),
        (size[1] - (inset[1] + inset[3])) / (bounds[1][1] - bounds[1][0]),
      ],
      [bounds, inset, size],
    );

    const viewBounds = useMemo(
      () =>
        overflow
          ? [0, 0, size[0], size[1]]
          : [
              -(strokeWidth / 2),
              -(strokeWidth / 2),
              size[0] + strokeWidth,
              size[1] + strokeWidth,
            ],
      [overflow, size, strokeWidth],
    );

    const useGradient = color && Array.isArray(color);

    // set container size when we get ref or when size changes
    useLayoutEffect(() => {
      if (containerRef.current && needContainerSize) {
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
    }, [containerRef, containerSize, needContainerSize]);

    // container size, if needed
    useEffect(() => {
      const onResize = () => {
        const { parentNode } = containerRef.current;
        const rect = parentNode.getBoundingClientRect();
        setContainerSize([rect.width, rect.height]);
      };

      if (needContainerSize) {
        window.addEventListener('resize', onResize);
        return () => window.removeEventListener('resize', onResize);
      }
      return undefined;
    }, [containerRef, needContainerSize]);

    // Converts values to drawing coordinates.
    // Takes into account the bounds, any inset, and the scale.
    const valueToCoordinate = (xValue, yValue) => {
      return [
        (xValue - bounds[0][0]) * scale[0] + inset[0],
        size[1] - ((yValue - bounds[1][0]) * scale[1] + inset[1]),
      ];
    };

    const renderBars = () =>
      (values || [])
        .filter(({ value }) => value[1] !== undefined)
        .map((valueArg, index) => {
          const {
            color: valueColor,
            label,
            onHover: valueOnHover,
            opacity: valueOpacity,
            thickness: valueThickness,
            value,
            ...valueRest
          } = valueArg;

          const key = `p-${index}`;
          // Math.min/max are to handle negative values
          const bottom =
            value.length === 2
              ? Math.min(Math.max(0, bounds[1][0]), value[1])
              : Math.min(value[1], value[2]);
          const top =
            value.length === 2
              ? Math.max(Math.min(0, bounds[1][1]), value[1])
              : Math.max(value[1], value[2]);
          const d =
            `M ${valueToCoordinate(value[0], bottom).join(',')}` +
            ` L ${valueToCoordinate(value[0], top).join(',')}`;

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
            <g
              key={key}
              fill="none"
              stroke={
                valueColor ? normalizeColor(valueColor, theme) : undefined
              }
              strokeWidth={
                valueThickness
                  ? parseMetricToNum(
                      theme.global.edgeSize[valueThickness] || valueThickness,
                    )
                  : undefined
              }
              opacity={
                (valueOpacity && theme.global.opacity[valueOpacity]) ||
                valueOpacity
              }
            >
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
        });

    const renderLine = () => {
      let d = '';
      let d2 = '';
      (values || [])
        .filter(({ value }) => value[1] !== undefined)
        .forEach(({ value }) => {
          d += `${d ? ' L' : 'M'} ${valueToCoordinate(value[0], value[1]).join(
            ',',
          )}`;
          if (value[2] !== undefined) {
            d2 += `${d2 ? ' L' : 'M'} ${valueToCoordinate(
              value[0],
              value[2],
            ).join(',')}`;
          }
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
          {d2 && (
            <path
              d={d2}
              {...hoverProps}
              {...clickProps}
              strokeDasharray={strokeDasharray}
            />
          )}
        </g>
      );
    };

    const renderArea = () => {
      let d = '';
      (values || [])
        .filter(({ value }) => value[1] !== undefined)
        .forEach(({ value }, index) => {
          d += `${!index ? 'M' : ' L'} ${valueToCoordinate(
            value[0],
            value[value.length === 2 ? 1 : 2],
          ).join(',')}`;
        });
      (values || [])
        .reverse()
        .filter(({ value }) => value[1] !== undefined)
        .forEach(({ value }) => {
          d += ` L ${valueToCoordinate(
            value[0],
            // Math.max() is to account for value[1] being negative
            value.length === 2 ? Math.max(0, bounds[1][0]) : value[1],
          ).join(',')}`;
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
      (values || [])
        .filter(({ value }) => value[1] !== undefined)
        .map((valueArg, index) => {
          const {
            color: valueColor,
            label,
            onHover: valueOnHover,
            opacity: valueOpacity,
            thickness: valueThickness,
            value,
            ...valueRest
          } = valueArg;

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

          const width = valueThickness
            ? parseMetricToNum(
                theme.global.edgeSize[valueThickness] || valueThickness,
              )
            : strokeWidth;

          const renderPoint = (valueX, valueY) => {
            const props = { ...hoverProps, ...clickProps, ...valueRest };
            const [cx, cy] = valueToCoordinate(valueX, valueY);
            const off = width / 2;
            if (point === 'circle' || (!point && round))
              return <circle cx={cx} cy={cy} r={off} {...props} />;
            let d;
            if (point === 'diamond')
              d = `M ${cx} ${cy - off} L ${cx + off} ${cy} L ${cx} ${cy +
                off} L ${cx - off} ${cy} Z`;
            else if (point === 'star') {
              const off1 = off / 3;
              const off2 = off1 * 2;
              d = `M ${cx} ${cy - off} L ${cx - off2} ${cy + off} L ${cx +
                off} ${cy - off1} L ${cx - off} ${cy - off1} L ${cx +
                off2} ${cy + off} Z`;
            } else if (point === 'triangle')
              d = `M ${cx} ${cy - off} L ${cx + off} ${cy + off} L ${cx -
                off} ${cy + off} Z`;
            else if (point === 'triangleDown')
              d = `M ${cx - off} ${cy - off} L ${cx + off} ${cy -
                off} L ${cx} ${cy + off} Z`;
            // square
            else
              d = `M ${cx - off} ${cy - off} L ${cx + off} ${cy - off} L ${cx +
                off} ${cy + off} L ${cx - off} ${cy + off} Z`;
            return <path d={d} />;
          };

          return (
            <g
              key={key}
              stroke="none"
              fill={valueColor ? normalizeColor(valueColor, theme) : undefined}
              opacity={
                (valueOpacity && theme.global.opacity[valueOpacity]) ||
                valueOpacity
              }
            >
              <title>{label}</title>
              {renderPoint(value[0], value[1])}
              {value[2] !== undefined && renderPoint(value[0], value[2])}
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

    const viewBox = viewBounds.join(' ');
    let colorName;
    if (!useGradient) {
      if (color && color.color) colorName = color.color;
      else if (color) colorName = color;
      else if (theme.chart && theme.chart.color) colorName = theme.chart.color;
    }
    const opacity =
      color && color.opacity
        ? theme.global.opacity[color.opacity] || color.opacity
        : undefined;

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
      const uniqueGradientId = color.map(element => element.color).join('-');
      const gradientId = `${uniqueGradientId}-${id}-gradient`;
      const maskId = `${uniqueGradientId}-${id}-mask`;
      defs = (
        <defs>
          <linearGradient id={gradientId} x1={0} y1={0} x2={0} y2={1}>
            {color
              .sort((c1, c2) => c2.value - c1.value)
              .map(({ value, color: gradientColor }) => (
                <stop
                  key={value}
                  offset={
                    // TODO:
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
        aria-label={a11yTitle}
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
