// (C) Copyright 2016 Hewlett Packard Enterprise Development LP

import React, { Component, Children, PropTypes } from 'react';
import CSSClassnames from '../../utils/CSSClassnames';

const CLASS_ROOT = CSSClassnames.CHART_LAYERS;

export default class Layers extends Component {

  render () {
    const { height, width } = this.props;

    let style = {...this.props.style};
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
      <div className={CLASS_ROOT} style={style}>
        {children}
      </div>
    );
  }

};

Layers.propTypes = {
  height: PropTypes.number,
  width: PropTypes.number
};
