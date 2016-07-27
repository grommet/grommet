// (C) Copyright 2016 Hewlett Packard Enterprise Development LP

import React, { Component, PropTypes } from 'react';
import { graphValue, trackSize, padding } from './utils';
import CSSClassnames from '../../utils/CSSClassnames';

const CLASS_ROOT = CSSClassnames.CHART_THRESHOLD;
const COLOR_INDEX = CSSClassnames.COLOR_INDEX;

const DOUBLE_PADDING = 2 * padding;

export default class Threshold extends Component {

  constructor (props) {
    super(props);
    this.state = {
      size: { width: 0, height: 0 },
      graphHeight: 0,
      graphWidth: 0
    };
    this._size = new trackSize(props, this._onSize.bind(this));
  }

  componentDidMount () {
    this._size.start(this.refs.svg);
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
    const { value, max, min, vertical, reverse, colorIndex } = this.props;
    const { size: { height, width }, graphWidth, graphHeight } = this.state;
    let classes = [CLASS_ROOT];
    if (colorIndex) {
      classes.push(`${COLOR_INDEX}-${colorIndex}`);
    }
    if (this.props.className) {
      classes.push(this.props.className);
    }
    let commands = '';

    if (vertical) {
      let x = graphValue(value, min, max, graphWidth);
      if (reverse) {
        x = graphWidth - x;
      }
      commands = `M${x + padding},0 L${x + padding},${height}`;
    } else {
      let y = graphValue(value, min, max, graphHeight);
      if (! reverse) {
        y = graphHeight - y;
      }
      commands = `M0,${y + padding} L${width},${y + padding}`;
    }

    return (
      <svg ref="svg" className={classes.join(' ')}
        viewBox={`0 0 ${width} ${height}`}
        preserveAspectRatio="none">
        <path fill="none" d={commands} />
      </svg>
    );
  }

};

Threshold.propTypes = {
  colorIndex: PropTypes.string,
  max: PropTypes.number.isRequired,
  min: PropTypes.number,
  reverse: PropTypes.bool,
  value: PropTypes.number.isRequired,
  vertical: PropTypes.bool
};

Threshold.defaultProps = {
  min: 0,
  max: 100
};
