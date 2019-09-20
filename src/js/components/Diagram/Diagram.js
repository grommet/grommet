import React, { Component } from 'react';
import { compose } from 'recompose';

import { withTheme } from 'styled-components';

import { defaultProps } from '../../default-props';
import { normalizeColor, parseMetricToNum } from '../../utils';

import { StyledDiagram } from './StyledDiagram';

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

const findTarget = target => {
  if (typeof target === 'string') {
    return document.getElementById(target);
  }
  return target;
};

class Diagram extends Component {
  static defaultProps = { connections: [] };

  static getDerivedStateFromProps(nextProps, prevState) {
    // track whether the connections array changes so we can trigger re-placing
    if (nextProps.connections !== prevState.connections) {
      return {
        connections: nextProps.connections,
        connectionPoints: undefined,
      };
    }
    return null;
  }

  state = { height: 0, width: 0 };

  svgRef = React.createRef();

  componentDidMount() {
    window.addEventListener('resize', this.onResize);
    this.onResize();
  }

  componentDidUpdate() {
    const { connectionPoints } = this.state;
    if (!connectionPoints) {
      this.placeConnections();
    }
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.onResize);
  }

  onResize = () => {
    const { width, height } = this.state;
    const svg = this.svgRef.current;
    if (svg) {
      const rect = svg.getBoundingClientRect();
      if (rect.width !== width || rect.height !== height) {
        this.setState({
          width: rect.width,
          height: rect.height,
          connectionPoints: undefined,
        });
      }
    }
  };

  placeConnections() {
    const { connections } = this.props;
    const containerRect = this.svgRef.current.getBoundingClientRect();
    const connectionPoints = connections.map(
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
    this.setState({ connectionPoints });
  }

  render() {
    const { connections, theme, ...rest } = this.props;
    const { connectionPoints, height, width } = this.state;

    let paths;
    if (connectionPoints) {
      paths = connections.map(
        (
          { anchor, color, offset, round, thickness, type, ...connectionRest },
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

            path = (
              <path
                // eslint-disable-next-line react/no-array-index-key
                key={index}
                {...cleanedRest}
                stroke={normalizeColor(
                  color || theme.diagram.line.color,
                  theme,
                )}
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
        ref={this.svgRef}
        viewBox={`0 0 ${width} ${height}`}
        preserveAspectRatio="xMinYMin meet"
        {...rest}
      >
        <g>{paths}</g>
      </StyledDiagram>
    );
  }
}

Object.setPrototypeOf(Diagram.defaultProps, defaultProps);

let DiagramDoc;
if (process.env.NODE_ENV !== 'production') {
  DiagramDoc = require('./doc').doc(Diagram); // eslint-disable-line global-require
}
const DiagramWrapper = compose(withTheme)(DiagramDoc || Diagram);

export { DiagramWrapper as Diagram };
