// (C) Copyright 2016 Hewlett Packard Enterprise Development LP

import React, { Component, Children } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import CSSClassnames from '../../utils/CSSClassnames';

const CLASS_ROOT = CSSClassnames.CHART_LAYERS;

export default class Layers extends Component {

  render () {
    const { className, height, width, ...props } = this.props;
    const classes = classnames(
      CLASS_ROOT,
      className
    );

    let style = { ...this.props.style };
    if (height) {
      style.height = `${height}px`;
    }
    if (width) {
      style.width = `${width}px`;
    }

    let children = Children.map(this.props.children, child => {
      if (child) {
        return React.cloneElement(child, { width: width, height: height });
      } else {
        return child;
      }
    });

    return (
      <div {...props} className={classes} style={style}>
        {children}
      </div>
    );
  }

}

Layers.propTypes = {
  height: PropTypes.number, // only from Chart
  width: PropTypes.number // only from Chart
};
