import React, {
  forwardRef,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
  Fragment
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
  curved: (
    fromPoint,
    toPoint,
    offset,
    anchor,
  ) => {
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
  direct: (
    fromPoint,
    toPoint,
    offset,
  ) => {
    return (
      `M ${fromPoint[0] + offset},${fromPoint[1] + offset} ` +
      `L ${toPoint[0] + offset},${toPoint[1] + offset}`
    );
  },
  rectilinear: (
    fromPoint,
    toPoint,
    offset,
    anchor,
  ) => {
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

const openArrow = (color, index, name = "openArrowEnd", orient = "auto") => (
  <marker
    id={`${name}-${index}`}
    markerWidth="7"
    markerHeight="9"
    refX="2"
    refY="6"
    orient={orient}
  >
    <path
      d="M1,4 L3,6 L1,8"
      stroke={color}
      fill="none"
    />
  </marker>
);

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
      ({ anchor: anchorProp, fromTarget: fromTargetProp, toTarget: toTargetProp, arrow }) => {
        let anchor = anchorProp;
        let fromTarget = fromTargetProp;
        let toTarget = toTargetProp;
        let anchorFromTarget;
        let anchorToTarget;

        if (typeof fromTargetProp === "object") {
          fromTarget = fromTargetProp.target;
          if (fromTargetProp.anchor) {
            anchorFromTarget = fromTargetProp.anchor
          }
        }

        if (typeof toTargetProp === "object") {
          toTarget = toTargetProp.target;
          if (toTargetProp.anchor) {
            anchorToTarget = toTargetProp.anchor
          }
        }

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
          
          console.log('BEFORE ', { fromPoint: [...fromPoint], fromRect, toPoint: [...toPoint], toRect, anchorFromTarget, anchorToTarget, containerRect, anchorProp, anchor, fromElement, toElement })

          if (anchorFromTarget === "vertical" && !anchorProp) {
            fromPoint[0] += fromRect.width / 2;
            fromPoint[1] += fromRect.height;
          } else if (anchorFromTarget === "horizontal" && !anchorProp) {
            fromPoint[1] += fromRect.height / 2;
            fromPoint[0] += fromRect.width;
          } else if (!anchorProp) {
            fromPoint[0] += fromRect.width / 2;
            fromPoint[1] += fromRect.height / 2;
          }

          if (anchorToTarget === "vertical" && !anchorProp) {
            toPoint[0] += toRect.width / 2;
            if (fromRect.top > toRect.top) {
              toPoint[1] += toRect.height;
              if (arrow)
                toPoint[1] += toRect.height / 10;
            } else if (arrow) {
              toPoint[1] -= toRect.height / 10;
            }
          } else if (anchorToTarget === "horizontal" && !anchorProp) {
            toPoint[1] += toRect.height / 2;
            toPoint[0] += toRect.width;
          } else if (!anchorProp) {
            toPoint[0] += toRect.width / 2;
            toPoint[1] += toRect.height / 2;
          }

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
          } else if (!anchorFromTarget && !anchorToTarget) {
            // center
            fromPoint[0] += fromRect.width / 2;
            fromPoint[1] += fromRect.height / 2;
            toPoint[0] += toRect.width / 2;
            toPoint[1] += toRect.height / 2;
          }
          console.log('AFTER ', { fromPoint: [...fromPoint], fromRect, toPoint: [...toPoint], toRect, anchorFromTarget, anchorToTarget, containerRect, anchorProp, anchor, fromElement, toElement })

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
          arrow,
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

          let arrowMarker = null;

          if (arrow === 'from') {
            arrowMarker = openArrow(normalizeColor(colorName, theme), index, "openArrowStart", "auto-start-reverse");
          } else if (arrow === 'to') {
            arrowMarker = openArrow(normalizeColor(colorName, theme), index);
          } else if (arrow) {
            arrowMarker = (
              <Fragment>
                {openArrow(normalizeColor(colorName, theme), index, "openArrowStart", "auto-start-reverse")}
                {openArrow(normalizeColor(colorName, theme), index)}
              </Fragment>
            );
          }

          path = (
            // eslint-disable-next-line react/no-array-index-key
            <Fragment key={index}>
              <path
                animation={animation}
                {...cleanedRest}
                stroke={normalizeColor(colorName, theme)}
                strokeWidth={strokeWidth}
                strokeLinecap={round ? 'round' : 'butt'}
                strokeLinejoin={round ? 'round' : 'miter'}
                fill="none"
                d={d}
                markerStart={`url("#openArrowStart-${index}")`}
                markerEnd={`url("#openArrowEnd-${index}")`}
              />
              {
                arrow && arrowMarker && (
                  <defs>
                    {arrowMarker}
                  </defs>
                )
              }
            </Fragment>
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
