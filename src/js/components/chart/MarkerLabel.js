// (C) Copyright 2014-2016 Hewlett Packard Enterprise Development LP

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import CSSClassnames from '../../utils/CSSClassnames';
import Props from '../../utils/Props';
import { announce } from '../../utils/Announcer';

const CLASS_ROOT = CSSClassnames.CHART_MARKER_LABEL;
const COLOR_INDEX = CSSClassnames.COLOR_INDEX;

export default class MarkerLabel extends Component {

  constructor(props, context) {
    super(props, context);
    this.state = {
      valueBasis: this._valueBasis(props)
    };
  }

  componentWillReceiveProps (nextProps) {
    const nextValueBasis = this._valueBasis(nextProps);
    if (nextValueBasis !== this.state.valueBasis) {
      this.setState({
        valueBasis: nextValueBasis
      }, () => {
        if (typeof nextProps.label === 'string' ||
          typeof nextProps.label === 'number') {
          announce(nextProps.label);
        }
      });
    }
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

  _renderPlaceholder (basis) {
    const classes = classnames(
      `${CLASS_ROOT}__slot`,
      `${CLASS_ROOT}__slot--placeholder`
    );
    return (
      <div key="placeholder" className={classes} aria-hidden='true'
        style={{ flexBasis: `${basis}%` }} />
    );
  }

  _renderLabel (basis, flip) {
    const { colorIndex } = this.props;
    let { label } = this.props;
    const classes = classnames(
      `${CLASS_ROOT}__slot`, {
        [`${CLASS_ROOT}__slot--flip`]: flip,
        [`${COLOR_INDEX}-${colorIndex}`]: colorIndex
      }
    );
    if (typeof label === 'string' || typeof label === 'number') {
      label = <span>{label}</span>;
    } else if (label.propTypes && label.propTypes.announce) {
      // added for a11y to announce changes in the values
      label = React.cloneElement(label, {
        announce: true
      });
    }
    return (
      <div key="label" className={classes}
        style={{ flexBasis: `${basis}%` }}>
        {label}
      </div>
    );
  }

  render () {
    const { align, className, reverse, vertical } = this.props;
    const { valueBasis } = this.state;
    const restProps = Props.omit(this.props,
      Object.keys(MarkerLabel.propTypes));

    const classes = classnames(
      CLASS_ROOT, {
        [`${CLASS_ROOT}--reverse`]: reverse,
        [`${CLASS_ROOT}--vertical`]: vertical,
        [`${CLASS_ROOT}--align-${align}`]: align
      },
      className
    );

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
      <div {...restProps} className={classes} >
        {firstItem}
        {secondItem}
      </div>
    );
  }

}

// Need either count and index or value, min, and max
MarkerLabel.propTypes = {
  align: PropTypes.oneOf(['start', 'end']), // only from Chart
  colorIndex: PropTypes.string,
  count: PropTypes.number,
  index: PropTypes.number,
  label: PropTypes.node,
  max: PropTypes.number,
  min: PropTypes.number,
  reverse: PropTypes.bool,
  value: PropTypes.number,
  vertical: PropTypes.bool
};

MarkerLabel.defaultProps = {
  max: 100,
  min: 0
};
