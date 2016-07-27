// (C) Copyright 2014-2016 Hewlett Packard Enterprise Development LP

import React, { Component, PropTypes } from 'react';
import { trackSize } from './utils';
import CSSClassnames from '../../utils/CSSClassnames';

const CLASS_ROOT = CSSClassnames.CHART_MARKER_LABEL;
const COLOR_INDEX = CSSClassnames.COLOR_INDEX;

export default class MarkerLabel extends Component {

  constructor (props) {
    super(props);
    this.state = {
      size: { width: 0, height: 0 },
      valueBasis: this._valueBasis(props)
    };
    this._size = new trackSize(this.props, this._onSize.bind(this));
  }

  componentDidMount () {
    this._size.start(this.refs.markerLabel);
  }

  componentWillReceiveProps (nextProps) {
    this.setState({ valueBasis: this._valueBasis(nextProps) });
    this._size.reset(nextProps);
  }

  componentWillUnmount () {
    this._size.stop();
  }

  _valueBasis (props) {
    const { count, index, max, min, value } = props;
    let valueBasis;
    if (count) {
      valueBasis = (index / Math.max(1, (count - 1))) * 100.0;
    } else {
      valueBasis = ((value - min) / Math.max(1, (max - min))) * 100.0;
    }
    return valueBasis;
  }

  _onSize (size) {
    this.setState({ size: size });
  }

  _renderPlaceholder (basis) {
    const classes = [`${CLASS_ROOT}__slot`, `${CLASS_ROOT}__slot--placeholder`];
    return (
      <div key="placeholder" className={classes.join(' ')}
        style={{ flexBasis: `${basis}%` }} />
    );
  }

  _renderLabel (basis, flip) {
    const { colorIndex } = this.props;
    let { label } = this.props;
    let classes = [`${CLASS_ROOT}__slot`];
    if (flip) {
      classes.push(`${CLASS_ROOT}__slot--flip`);
    }
    if (colorIndex) {
      classes.push(`${COLOR_INDEX}-${colorIndex}`);
    }
    if (typeof label === 'string' || typeof label === 'number') {
      label = <span>{label}</span>;
    }
    return (
      <div key="label" className={classes.join(' ')}
        style={{ flexBasis: `${basis}%` }}>
        {label}
      </div>
    );
  }

  render () {
    const { align, reverse, vertical } = this.props;
    const { size: { height, width }, valueBasis } = this.state;

    let classes = [CLASS_ROOT];
    if (reverse) {
      classes.push(`${CLASS_ROOT}--reverse`);
    }
    if (vertical) {
      classes.push(`${CLASS_ROOT}--vertical`);
    }
    if (align) {
      classes.push(`${CLASS_ROOT}--align-${align}`);
    }
    if (this.props.className) {
      classes.push(this.props.className);
    }

    let style = {...this.props.style};
    if (vertical && height) {
      style.height = `${height}px`;
    }
    if (! vertical && width) {
      style.width = `${width}px`;
    }

    let firstItem, secondItem;
    if (valueBasis < 50) {
      // marker value in first half, align it after
      firstItem = this._renderPlaceholder(valueBasis);
      secondItem = this._renderLabel(100.0 - valueBasis, true);
    } else {
      // marker value in second half, align it before
      firstItem = this._renderLabel(valueBasis);
      secondItem = this._renderPlaceholder(100.0 - valueBasis);
    }

    return (
      <div ref="markerLabel" className={classes.join(' ')} style={style}>
        {firstItem}
        {secondItem}
      </div>
    );
  }

};

// Need either count and index or value, min, and max
MarkerLabel.propTypes = {
  align: PropTypes.oneOf(['start', 'end']), // only from Chart
  colorIndex: PropTypes.string,
  count: PropTypes.number,
  height: PropTypes.number, // only from Chart
  index: PropTypes.number,
  label: PropTypes.node,
  max: PropTypes.number,
  min: PropTypes.number,
  reverse: PropTypes.bool,
  value: PropTypes.number,
  vertical: PropTypes.bool,
  width: PropTypes.number // only from Chart
};

MarkerLabel.defaultProps = {
  max: 100,
  min: 0
};
