// (C) Copyright 2016 Hewlett Packard Enterprise Development LP

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import CSSClassnames from '../../utils/CSSClassnames';
import { graphValue, trackSize, padding } from './utils';

const CLASS_ROOT = CSSClassnames.CHART_MARKER;
const COLOR_INDEX = CSSClassnames.COLOR_INDEX;

const DOUBLE_PADDING = 2 * padding;

export default class Marker extends Component {

  constructor(props, context) {
    super(props, context);
    this.state = {
      size: { width: 0, height: 0 },
      graphHeight: 0,
      graphWidth: 0
    };
    this._size = new trackSize(props, this._onSize.bind(this));
  }

  componentDidMount () {
    this._size.start(this.svgRef);
  }

  componentWillReceiveProps (nextProps) {
    this._size.reset(nextProps);
  }

  componentWillUnmount () {
    this._size.stop();
  }

  _onSize (size) {
    this.setState({
      size: size,
      graphWidth: size.width - DOUBLE_PADDING,
      graphHeight: size.height - DOUBLE_PADDING
    });
  }

  render () {
    const {
      className, colorIndex, count, index, max, min, reverse, value, vertical,
      ...props
    } = this.props;
    delete props.height;
    delete props.width;
    const { size: { height, width }, graphWidth, graphHeight } = this.state;
    const classes = classnames(
      CLASS_ROOT, {
        [`${COLOR_INDEX}-${colorIndex}`]: colorIndex
      },
      className
    );

    let path;
    if ((count > 1 && index >= 1 && index < count) ||
      (value >= min && value <= max)) {
      let commands = '';

      if (vertical) {
        let x;
        if (count) {
          x = graphValue(index, 0, count - 1, graphWidth);
        } else if (max) {
          x = graphValue(value, min, max, graphWidth);
        }
        if (reverse) {
          x = graphWidth - x;
        }
        commands = `M${x + padding},0 L${x + padding},${height}`;
      } else {
        let y;
        if (count) {
          y = graphValue(index, 0, count - 1, graphHeight);
        } else if (max) {
          y = graphValue(value, min, max, graphHeight);
        }
        if (! reverse) {
          y = graphHeight - y;
        }
        commands = `M0,${y + padding} L${width},${y + padding}`;
      }

      path = <path fill="none" d={commands} />;
    }

    return (
      <svg ref={ref => this.svgRef = ref} {...props} className={classes}
        viewBox={`0 0 ${width} ${height}`} aria-hidden='true'
        preserveAspectRatio="none">
        {path}
      </svg>
    );
  }

}

// Need either count and index or value, min, and max
Marker.propTypes = {
  colorIndex: PropTypes.string,
  count: PropTypes.number,
  index: PropTypes.number,
  max: PropTypes.number,
  min: PropTypes.number,
  reverse: PropTypes.bool,
  value: PropTypes.number,
  vertical: PropTypes.bool
};

Marker.defaultProps = {
  max: 100,
  min: 0
};
