import React, {
  forwardRef,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
import { ThemeContext } from 'styled-components';

import { defaultProps } from '../../default-props';
import { normalizeColor, parseMetricToNum, useForwardedRef } from '../../utils';

import { StyledDiagram } from './StyledDiagram';
import { DiagramPropTypes } from './propTypes';

const computeMidPoint = (fromPoint, toPoint) => [
  fromPoint[0] > toPoint[0]
    ? toPoint[0] + (fromPoint[0] - toPoint[0]) / 2
    : fromPoint[0] + (toPoint[0] - fromPoint[0]) / 2,
  fromPoint[1] > toPoint[1]
    ? toPoint[1] + (fromPoint[1] - toPoint[1]) / 2
    : fromPoint[1] + (toPoint[1] - fromPoint[1]) / 2,
];

const COMMANDS = {
  curved: (fromPoint, toPoint, offset, anchor) => {
    const midPoint = computeMidPoint(fromPoint, toPoint);
    let cmds = `M ${fromPoint[0] + offset},${fromPoint[1] + offset} `;
    if (anchor === 'horizontal') {
      cmds +=
        `Q ${midPoint[0] + offset},${fromPoint[1] + offset} ` +
        `${midPoint[0] + offset},${midPoint[1] + offset} `;
    } else {
      cmds +=
        `Q ${fromPoint[0] + offset},${midPoint[1] + offset} ` +
        `${midPoint[0] + offset},${midPoint[1] + offset} `;
    }
    cmds += `T ${toPoint[0] + offset},${toPoint[1] + offset}`;
    return cmds;
  },
  direct: (fromPoint, toPoint, offset) =>
    `M ${fromPoint[0] + offset},${fromPoint[1] + offset} ` +
    `L ${toPoint[0] + offset},${toPoint[1] + offset}`,
  rectilinear: (fromPoint, toPoint, offset, anchor) => {
    const midPoint = computeMidPoint(fromPoint, toPoint);
    let cmds = `M ${fromPoint[0] + offset},${fromPoint[1] + offset} `;
    if (anchor === 'horizontal') {
      cmds +=
        `L ${midPoint[0] + offset},${fromPoint[1] + offset} ` +
        `L ${midPoint[0] + offset},${toPoint[1] + offset} `;
    } else {
      cmds +=
        `L ${fromPoint[0] + offset},${midPoint[1] + offset} ` +
        `L ${toPoint[0] + offset},${midPoint[1] + offset} `;
    }
    cmds += `L ${toPoint[0] + offset},${toPoint[1] + offset}`;
    return cmds;
  },
};

const findTarget = (target) => {
  if (typeof target === 'string') {
    return document.getElementById(target);
  }
  return target;
};

const Diagram = forwardRef(({ connections, ...rest }, ref) => {
  const theme = useContext(ThemeContext) || defaultProps.theme;
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const [connectionPoints, setConnectionPoints] = useState();
  const svgRef = useForwardedRef(ref);

  useEffect(() => {
    setConnectionPoints(undefined);
  }, [connections]);

  const onResize = useCallback(() => {
    const svg = svgRef.current;

    if (svg) {
      const rect = svg.getBoundingClientRect();
      if (
        rect.width !== dimensions.width ||
        rect.height !== dimensions.height
      ) {
        setDimensions({
          width: rect.width,
          height: rect.height,
        });
        setConnectionPoints(undefined);
      }
    }
  }, [dimensions.width, dimensions.height, svgRef]);

  // Ref that stores resize handler
  const savedOnResize = useRef();

  // Update resize ref value if onResize changes.
  // This allows our effect below to always get latest handler
  useEffect(() => {
    savedOnResize.current = onResize;
  }, [onResize]);

  useEffect(() => {
    const onResizeHandler = (event) => savedOnResize.current(event);
    onResizeHandler();

    window.addEventListener('resize', onResizeHandler);

    return () => {
      window.removeEventListener('resize', onResizeHandler);
    };
  }, []);

  const placeConnections = useCallback(() => {
    const containerRect = svgRef.current.getBoundingClientRect();
    const updatedConnectionPoints = connections.map(
      ({ anchor, fromTarget, toTarget }) => {
        let points;
        const fromElement = findTarget(fromTarget);
        const toElement = findTarget(toTarget);
        if (!fromElement) {
          console.warn(`Diagram cannot find ${fromTarget}`);
        }
        if (!toElement) {
          console.warn(`Diagram cannot find ${toTarget}`);
        }

        if (fromElement && toElement) {
          const fromRect = fromElement.getBoundingClientRect();
          const toRect = toElement.getBoundingClientRect();
          // There is no x and y when unit testing.
          const fromPoint = [
            fromRect.left - containerRect.left || 0,
            fromRect.top - containerRect.top || 0,
          ];
          const toPoint = [
            toRect.left - containerRect.left || 0,
            toRect.top - containerRect.top || 0,
          ];
          if (anchor === 'vertical') {
            fromPoint[0] += fromRect.width / 2;
            toPoint[0] += toRect.width / 2;
            if (fromRect.top < toRect.top) {
              fromPoint[1] += fromRect.height;
            } else {
              toPoint[1] += toRect.height;
            }
          } else if (anchor === 'horizontal') {
            fromPoint[1] += fromRect.height / 2;
            toPoint[1] += toRect.height / 2;
            if (fromRect.left < toRect.left) {
              fromPoint[0] += fromRect.width;
            } else {
              toPoint[0] += toRect.width;
            }
          } else {
            // center
            fromPoint[0] += fromRect.width / 2;
            fromPoint[1] += fromRect.height / 2;
            toPoint[0] += toRect.width / 2;
            toPoint[1] += toRect.height / 2;
          }
          points = [fromPoint, toPoint];
        }

        return points;
      },
    );
    setConnectionPoints(updatedConnectionPoints);
  }, [connections, svgRef]);

  useEffect(() => {
    if (!connectionPoints) {
      placeConnections();
    }
  }, [connectionPoints, placeConnections]);

  let paths;
  if (connectionPoints) {
    paths = connections.map(
      (
        {
          anchor,
          animation,
          color,
          offset,
          round,
          thickness,
          type,
          ...connectionRest
        },
        index,
      ) => {
        let path;
        const cleanedRest = { ...connectionRest };
        delete cleanedRest.fromTarget;
        delete cleanedRest.toTarget;
        const points = connectionPoints[index];

        if (points) {
          const offsetWidth = offset
            ? parseMetricToNum(theme.global.edgeSize[offset])
            : 0;
          const d = COMMANDS[type || 'curved'](
            points[0],
            points[1],
            offsetWidth,
            anchor,
          );
          const strokeWidth = thickness
            ? parseMetricToNum(theme.global.edgeSize[thickness] || thickness)
            : 1;
          let colorName =
            color || (theme.diagram.line && theme.diagram.line.color);
          if (!colorName) {
            const colors = Object.keys(theme.global.colors).filter((n) =>
              n.match(/^graph-[0-9]$/),
            );
            colorName = colors[index % colors.length];
          }

          path = (
            <path
              // eslint-disable-next-line react/no-array-index-key
              key={index}
              // eslint-disable-next-line react/no-unknown-property
              animation={animation}
              {...cleanedRest}
              stroke={normalizeColor(colorName, theme)}
              strokeWidth={strokeWidth}
              strokeLinecap={round ? 'round' : 'butt'}
              strokeLinejoin={round ? 'round' : 'miter'}
              fill="none"
              d={d}
            />
          );
        }
        return path;
      },
    );
  }

  return (
    <StyledDiagram
      ref={svgRef}
      viewBox={`0 0 ${dimensions.width} ${dimensions.height}`}
      preserveAspectRatio="xMinYMin meet"
      connections={paths}
      {...rest}
    >
      <g>{paths}</g>
    </StyledDiagram>
  );
});

Diagram.displayName = 'Diagram';
Diagram.defaultProps = { connections: [] };
Diagram.propTypes = DiagramPropTypes;

export { Diagram };
