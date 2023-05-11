import React, { useContext, useEffect, useMemo, useState } from 'react';

import { ThemeContext } from 'styled-components';
import { useLayoutEffect } from '../../utils/use-isomorphic-layout-effect';
import { defaultProps } from '../../default-props';

import { normalizeColor, parseMetricToNum, useForwardedRef } from '../../utils';

import { StyledChart } from './StyledChart';
import { normalizeBounds, normalizeValues } from './utils';
import { ChartPropTypes } from './propTypes';

const gradientMaskColor = '#ffffff';

// use constants so re-renders don't re-trigger effects
const defaultSize = { height: 'small', width: 'medium' };
const defaultValues = [];

const Chart = React.forwardRef(
  (
    {
      a11yTitle,
      bounds: boundsProp,
      color,
      dash,
      direction,
      gap,
      id,
      onClick,
      onHover,
      opacity: opacityProp,
      overflow = false,
      pad,
      pattern,
      point,
      round,
      size: sizeProp = defaultSize,
      thickness = 'medium',
      type = 'bar',
      values: valuesProp = defaultValues,
      ...rest
    },
    ref,
  ) => {
    const containerRef = useForwardedRef(ref);
    const theme = useContext(ThemeContext) || defaultProps.theme;

    const values = useMemo(() => normalizeValues(valuesProp), [valuesProp]);

    const vertical = useMemo(() => direction === 'vertical', [direction]);

    // bounds is { x: { min, max }, y: { min, max } }, accounting for direction
    const bounds = useMemo(
      () => normalizeBounds(boundsProp, values, direction),
      [direction, boundsProp, values],
    );

    const strokeWidth = useMemo(
      () => parseMetricToNum(theme.global.edgeSize[thickness] || thickness),
      [theme.global.edgeSize, thickness],
    );

    // inset is { top, left, bottom, right }
    const inset = useMemo(() => {
      const result = { top: 0, left: 0, bottom: 0, right: 0 };
      if (pad) {
        if (pad.horizontal) {
          const padSize = parseMetricToNum(
            theme.global.edgeSize[pad.horizontal] || pad.horizontal,
          );
          result.left = padSize;
          result.right = padSize;
        }
        if (pad.vertical) {
          const padSize = parseMetricToNum(
            theme.global.edgeSize[pad.vertical] || pad.vertical,
          );
          result.top = padSize;
          result.bottom = padSize;
        }
        if (pad.start) {
          result.left = parseMetricToNum(
            theme.global.edgeSize[pad.start] || pad.start,
          );
        }
        if (pad.end) {
          result.right = parseMetricToNum(
            theme.global.edgeSize[pad.end] || pad.end,
          );
        }
        if (typeof pad === 'string') {
          const padSize = parseMetricToNum(theme.global.edgeSize[pad]);
          result.top = padSize;
          result.left = padSize;
          result.bottom = padSize;
          result.right = padSize;
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
        sizeProp &&
        (sizeProp === 'full' ||
          sizeProp === 'fill' ||
          sizeProp.height === 'full' ||
          sizeProp.height === 'fill' ||
          sizeProp.width === 'full' ||
          sizeProp.width === 'fill'),
      [sizeProp],
    );

    // size is { width, height }
    const size = useMemo(() => {
      const gapWidth = gap
        ? parseMetricToNum(theme.global.edgeSize[gap] || gap)
        : strokeWidth;

      // autoSize is how wide or tall we'd pefer based on the number of values
      const autoSize =
        strokeWidth * values.length + (values.length - 1) * gapWidth;

      const sizeWidth =
        typeof sizeProp === 'string'
          ? sizeProp
          : sizeProp.width || defaultSize.width;
      let width;
      if (sizeWidth === 'full' || sizeWidth === 'fill') {
        [width] = containerSize;
      } else if (sizeWidth === 'auto') {
        width = autoSize;
      } else {
        width = parseMetricToNum(theme.global.size[sizeWidth] || sizeWidth);
      }

      const sizeHeight =
        typeof sizeProp === 'string'
          ? sizeProp
          : sizeProp.height || defaultSize.height;
      let height;
      if (sizeHeight === 'full' || sizeHeight === 'fill') {
        [, height] = containerSize;
      } else if (sizeHeight === 'auto') {
        height = autoSize;
      } else {
        height = parseMetricToNum(theme.global.size[sizeHeight] || sizeHeight);
      }

      return { width, height };
    }, [
      containerSize,
      gap,
      sizeProp,
      strokeWidth,
      theme.global.edgeSize,
      theme.global.size,
      values,
    ]);

    // scale is { x, y }
    const scale = useMemo(
      () => ({
        x:
          (size.width - (inset.left + inset.right)) /
          (bounds.x.max - bounds.x.min),
        y:
          (size.height - (inset.top + inset.bottom)) /
          (bounds.y.max - bounds.y.min),
      }),
      [bounds, inset, size],
    );

    const viewBoxBounds = useMemo(() => {
      if (overflow) {
        return [0, 0, size.width, size.height];
      }
      return [
        -(strokeWidth / 2),
        -(strokeWidth / 2),
        size.width + strokeWidth,
        size.height + strokeWidth,
      ];
    }, [overflow, size, strokeWidth]);

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

    // rendering helpers, to make rendering code easier to understand

    const valueCoords = (x, y) => (vertical ? [y, x] : [x, y]);

    // Converts values to drawing coordinates.
    // Takes into account the bounds, any inset, and the scale.
    const valueToCoordinate = (xValue, yValue) => {
      const y = (yValue - bounds.y.min) * scale.y + inset.top;
      return [
        (xValue - bounds.x.min) * scale.x + inset.left,
        // vertical grows y top down, horizontal grows y bottom up
        vertical ? y : size.height - y,
      ];
    };

    const useGradient = color && Array.isArray(color);
    let patternId;

    function getOpacity(valueOpacity) {
      return (
        (valueOpacity && theme.global.opacity[valueOpacity]) ||
        // eslint-disable-next-line no-nested-ternary
        (valueOpacity === true
          ? theme.global.opacity.medium
          : valueOpacity === false
          ? undefined
          : valueOpacity)
      );
    }

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
          const [startX, startY] = valueCoords(
            value[0],
            value.length === 2
              ? Math.min(
                  Math.max(0, vertical ? bounds.x.min : bounds.y.min),
                  value[1],
                )
              : Math.min(value[1], value[2]),
          );
          const [endX, endY] = valueCoords(
            value[0],
            value.length === 2
              ? Math.max(
                  Math.min(0, vertical ? bounds.x.max : bounds.y.max),
                  value[1],
                )
              : Math.max(value[1], value[2]),
          );
          const d =
            `M ${valueToCoordinate(startX, startY).join(',')}` +
            ` L ${valueToCoordinate(endX, endY).join(',')}`;

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
              opacity={getOpacity(valueOpacity)}
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
          const [x, y] = valueCoords(value[0], value[1]);
          d += `${d ? ' L' : 'M'} ${valueToCoordinate(x, y).join(',')}`;
          if (value[2] !== undefined) {
            const [x2, y2] = valueCoords(value[0], value[2]);
            d2 += `${d2 ? ' L' : 'M'} ${valueToCoordinate(x2, y2).join(',')}`;
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
          const [x, y] = valueCoords(
            value[0],
            // when a range, second value is on top
            value[value.length === 2 ? 1 : 2],
          );
          d += `${!index ? 'M' : ' L'} ${valueToCoordinate(x, y).join(',')}`;
        });
      (values || [])
        .filter(({ value }) => value[1] !== undefined)
        .reverse()
        .forEach(({ value }) => {
          const [x, y] = valueCoords(
            value[0],
            // Math.max() is to account for value[1] being negative
            value.length === 2
              ? Math.max(0, vertical ? bounds.x.min : bounds.y.min)
              : value[1],
          );
          d += ` L ${valueToCoordinate(x, y).join(',')}`;
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

      patternId = pattern && `${pattern}-${id}-pattern`;

      return (
        <g>
          <path
            d={d}
            fill={patternId ? `url(#${patternId})` : undefined}
            {...hoverProps}
            {...clickProps}
          />
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
            const [x, y] = valueCoords(valueX, valueY);
            const [cx, cy] = valueToCoordinate(x, y);
            const off = width / 2;
            if (point === 'circle' || (!point && round))
              return <circle cx={cx} cy={cy} r={off} {...props} />;
            let d;
            if (point === 'diamond')
              d = `M ${cx} ${cy - off} L ${cx + off} ${cy} L ${cx} ${
                cy + off
              } L ${cx - off} ${cy} Z`;
            else if (point === 'star') {
              const off1 = off / 3;
              const off2 = off1 * 2;
              d = `M ${cx} ${cy - off} L ${cx - off2} ${cy + off} L ${
                cx + off
              } ${cy - off1} L ${cx - off} ${cy - off1} L ${cx + off2} ${
                cy + off
              } Z`;
            } else if (point === 'triangle')
              d = `M ${cx} ${cy - off} L ${cx + off} ${cy + off} L ${
                cx - off
              } ${cy + off} Z`;
            else if (point === 'triangleDown')
              d = `M ${cx - off} ${cy - off} L ${cx + off} ${
                cy - off
              } L ${cx} ${cy + off} Z`;
            // square
            else
              d = `M ${cx - off} ${cy - off} L ${cx + off} ${cy - off} L ${
                cx + off
              } ${cy + off} L ${cx - off} ${cy + off} Z`;
            return <path d={d} />;
          };

          return (
            <g
              key={key}
              stroke="none"
              fill={valueColor ? normalizeColor(valueColor, theme) : undefined}
              opacity={getOpacity(valueOpacity)}
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

    const viewBox = viewBoxBounds.join(' ');
    let colorName;
    if (!useGradient) {
      if (color && color.color) colorName = color.color;
      else if (color) colorName = color;
      else if (theme.chart && theme.chart.color) colorName = theme.chart.color;
    }

    let opacity;
    if (opacityProp === true) {
      opacity = theme.global.opacity.medium;
    } else if (opacityProp) {
      opacity = theme.global.opacity[opacityProp]
        ? theme.global.opacity[opacityProp]
        : opacityProp;
    } else if (color && color.opacity) {
      opacity = theme.global.opacity[color.opacity]
        ? theme.global.opacity[color.opacity]
        : color.opacity;
    } else opacity = undefined;

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
        strokeWidth={
          type !== 'point' && (type !== 'area' || !pattern)
            ? strokeWidth
            : undefined
        }
        fill={fill}
        strokeLinecap={round ? 'round' : 'butt'}
        strokeLinejoin={round ? 'round' : 'miter'}
        opacity={opacity}
      >
        {contents}
      </g>
    );

    const defs = [];
    let gradientRect;
    if (useGradient && size.height) {
      const uniqueGradientId = color.map((element) => element.color).join('-');
      const gradientId = `${uniqueGradientId}-${id}-gradient`;
      const maskId = `${uniqueGradientId}-${id}-mask`;
      defs.push(
        <linearGradient
          key="gradientId"
          id={gradientId}
          x1={0}
          y1={0}
          x2={0}
          y2={1}
        >
          {color
            .slice(0)
            .sort((c1, c2) => c2.value - c1.value)
            .map(({ value, color: gradientColor }) => (
              <stop
                key={value}
                offset={
                  (size.height - (value - bounds.y.min) * scale.y) / size.height
                }
                stopColor={normalizeColor(gradientColor, theme)}
              />
            ))}
        </linearGradient>,
      );
      defs.push(
        <mask key="mask" id={maskId}>
          {drawing}
        </mask>,
      );

      gradientRect = (
        <rect
          x={viewBoxBounds[0]}
          y={viewBoxBounds[1]}
          width={viewBoxBounds[2]}
          height={viewBoxBounds[3]}
          fill={`url(#${gradientId})`}
          mask={`url(#${maskId})`}
        />
      );
    } else if (patternId) {
      let content;
      const diagonal = pattern.match(/Diagonal/);
      const unit = diagonal ? strokeWidth * Math.sqrt(2) : strokeWidth;
      const half = unit / 2;
      const double = unit * 2;
      const pColor = normalizeColor(colorName, theme);
      if (pattern === 'squares') {
        content = (
          <rect x={half} y={half} width={unit} height={unit} fill={pColor} />
        );
      } else if (pattern === 'circles') {
        content = <circle cx={unit} cy={unit} r={half} fill={pColor} />;
      } else if (pattern === 'stripesHorizontal') {
        content = (
          <path
            d={`M 0 ${unit} L ${double} ${unit}`}
            stroke={pColor}
            strokeWidth={strokeWidth}
          />
        );
      } else if (pattern === 'stripesVertical') {
        content = (
          <path
            d={`M ${unit} 0 L ${unit} ${double}`}
            stroke={pColor}
            strokeWidth={strokeWidth}
          />
        );
      } else if (pattern === 'stripesDiagonalDown') {
        content = (
          <path
            d={`M ${half} ${-half} L ${double + half} ${double - half}
              M ${-half} ${half} L ${double - half} ${double + half}`}
            stroke={pColor}
            strokeWidth={strokeWidth}
          />
        );
      } else if (pattern === 'stripesDiagonalUp') {
        content = (
          <path
            d={`M ${-half} ${double - half} L ${double - half} ${-half}
              M ${half} ${double + half} L ${double + half} ${half}`}
            stroke={pColor}
            strokeWidth={strokeWidth}
          />
        );
      }
      defs.push(
        <pattern
          key={patternId}
          id={patternId}
          width={double}
          height={double}
          patternUnits="userSpaceOnUse"
        >
          {content}
        </pattern>,
      );
    }

    return (
      <StyledChart
        ref={containerRef}
        id={id}
        aria-label={a11yTitle}
        viewBox={viewBox}
        preserveAspectRatio="none"
        width={size === 'full' ? '100%' : size.width}
        height={size === 'full' ? '100%' : size.height}
        typeProp={type} // prevent adding to DOM
        {...rest}
      >
        {defs.length && <defs>{defs}</defs>}
        {useGradient ? gradientRect : drawing}
      </StyledChart>
    );
  },
);

Chart.displayName = 'Chart';
Chart.propTypes = ChartPropTypes;

export { Chart };
