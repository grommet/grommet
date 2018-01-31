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

class Diagram extends Component {
  static defaultProps = { connections: [] };

  constructor(props, context) {
    super(props, context);
    this.state = { height: 0, width: 0 };
  }

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
    const { width, height } = this.state;
    const parent = findDOMNode(this.containerRef).parentNode;
    if (parent) {
      const rect = parent.getBoundingClientRect();
      if (rect.width !== width || rect.height !== height) {
        this.setState({ width: rect.width, height: rect.height });
      }
    }
  }

  render() {
    const { connections, theme, ...rest } = this.props;
    const { height, width } = this.state;
    console.log('!!! render', this.containerRef !== undefined);

    let paths;
    if (this.containerRef) {
      paths = connections.map(({ fromId, toId, color, offset, round, thickness, type }, index) => {
        const containerRect =
          findDOMNode(this.containerRef).getBoundingClientRect();
        const fromElement = document.getElementById(fromId);
        const toElement = document.getElementById(toId);
        if (!fromElement) {
          console.warn(`Diagram cannot find ${fromId}`);
        }
        if (!toElement) {
          console.warn(`Diagram cannot find ${toId}`);
        }
        let path;
        if (fromElement && toElement) {
          const fromRect = fromElement.getBoundingClientRect();
          const toRect = toElement.getBoundingClientRect();
          const fromPoint = [
            (fromRect.x - containerRect.x) + (fromRect.width / 2),
            (fromRect.y - containerRect.y) + (fromRect.height / 2),
          ];
          const toPoint = [
            (toRect.x - containerRect.x) + (toRect.width / 2),
            (toRect.y - containerRect.y) + (toRect.height / 2),
          ];
          const offsetWidth = offset ? parseMetricToNum(theme.global.edgeSize[offset]) : 0;
          const d = COMMANDS[type || 'curved'](fromPoint, toPoint, offsetWidth);
          const strokeWidth = thickness ? parseMetricToNum(theme.global.edgeSize[thickness]) : 1;
          path = (
            <path
              key={`${fromId}-${toId}-${index}`}
              stroke={colorForName(color, theme)}
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
        ref={(ref) => { this.containerRef = ref; }}
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
