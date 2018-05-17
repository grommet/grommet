import React, { Component } from 'react';
import { findDOMNode } from 'react-dom';
import { compose } from 'recompose';

import { colorForName, parseMetricToNum } from '../../utils';

import { withTheme } from '../hocs';

import StyledDiagram from './StyledDiagram';

import doc from './doc';

const computeMidPoint = (fromPoint, toPoint) => ([
  (fromPoint[0] > toPoint[0] ?
    (toPoint[0] + ((fromPoint[0] - toPoint[0]) / 2)) :
    (fromPoint[0] + ((toPoint[0] - fromPoint[0]) / 2))
  ),
  (fromPoint[1] > toPoint[1] ?
    (toPoint[1] + ((fromPoint[1] - toPoint[1]) / 2)) :
    (fromPoint[1] + ((toPoint[1] - fromPoint[1]) / 2))
  ),
]);

const COMMANDS = {
  curved: (fromPoint, toPoint, offset) => {
    const midPoint = computeMidPoint(fromPoint, toPoint);
    return (
      `M ${fromPoint[0] + offset},${fromPoint[1] + offset} ` +
      `Q ${fromPoint[0] + offset},${midPoint[1] + offset} ` +
      `${midPoint[0] + offset},${midPoint[1] + offset} ` +
      `T ${toPoint[0] + offset},${toPoint[1] + offset}`
    );
  },
  direct: (fromPoint, toPoint, offset) => (
    `M ${fromPoint[0] + offset},${fromPoint[1] + offset} ` +
    `L ${toPoint[0] + offset},${toPoint[1] + offset}`
  ),
  rectilinear: (fromPoint, toPoint, offset) => {
    const midPoint = computeMidPoint(fromPoint, toPoint);
    return (
      `M ${fromPoint[0] + offset},${fromPoint[1] + offset} ` +
      `L ${fromPoint[0] + offset},${midPoint[1] + offset} ` +
      `L ${toPoint[0] + offset},${midPoint[1] + offset} ` +
      `L ${toPoint[0] + offset},${toPoint[1] + offset}`
    );
  },
};

const findTarget = (target) => {
  if (typeof target === 'string') {
    return document.getElementById(target);
  }
  return findDOMNode(target);
};

class Diagram extends Component {
  static defaultProps = { connections: [] };

  state = { height: 0, width: 0 }
  containerRef = React.createRef();

  componentDidMount() {
    window.addEventListener('resize', this.onResize);
    this.onResize();
  }

  componentDidUpdate() {
    this.onResize();
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.onResize);
  }

  onResize = () => {
    const { connectionPoints, width, height } = this.state;
    const parent = findDOMNode(this.containerRef.current).parentNode;
    if (parent) {
      const rect = parent.getBoundingClientRect();
      if (rect.width !== width || rect.height !== height) {
        this.setState({
          width: rect.width,
          height: rect.height,
          connectionPoints: undefined,
        });
      } else if (!connectionPoints) {
        this.placeConnections();
      }
    }
  }

  placeConnections() {
    const { connections } = this.props;
    const containerRect =
      findDOMNode(this.containerRef.current).getBoundingClientRect();
    const connectionPoints = connections.map(({ fromTarget, toTarget }) => {
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
          (fromRect.x - containerRect.x) + (fromRect.width / 2) || 0,
          (fromRect.y - containerRect.y) + (fromRect.height / 2) || 0,
        ];
        const toPoint = [
          (toRect.x - containerRect.x) + (toRect.width / 2) || 0,
          (toRect.y - containerRect.y) + (toRect.height / 2) || 0,
        ];
        points = [fromPoint, toPoint];
      }

      return points;
    });
    this.setState({ connectionPoints });
  }

  render() {
    const { connections, theme, ...rest } = this.props;
    const { connectionPoints, height, width } = this.state;

    let paths;
    if (connectionPoints) {
      paths = connections.map(({
        color, offset, round, thickness, type, ...connectionRest
      }, index) => {
        let path;
        const cleanedRest = { ...connectionRest };
        delete cleanedRest.fromTarget;
        delete cleanedRest.toTarget;
        const points = connectionPoints[index];
        if (points) {
          const offsetWidth = offset ?
            parseMetricToNum(theme.global.edgeSize[offset]) : 0;
          const d = COMMANDS[type || 'curved'](points[0], points[1], offsetWidth);
          const strokeWidth = thickness ?
            parseMetricToNum(theme.global.edgeSize[thickness]) : 1;

          path = (
            <path
              key={index}
              {...cleanedRest}
              stroke={colorForName(color || 'accent-1', theme)}
              strokeWidth={strokeWidth}
              strokeLinecap={round ? 'round' : 'butt'}
              strokeLinejoin={round ? 'round' : 'miter'}
              fill='none'
              d={d}
            />
          );
        }

        return path;
      });
    }

    return (
      <StyledDiagram
        ref={this.containerRef}
        viewBox={`0 0 ${width} ${height}`}
        preserveAspectRatio='xMinYMin meet'
        width={width}
        height={height}
        {...rest}
      >
        <g>
          {paths}
        </g>
      </StyledDiagram>
    );
  }
}

if (process.env.NODE_ENV !== 'production') {
  doc(Diagram);
}

export default compose(
  withTheme,
)(Diagram);
