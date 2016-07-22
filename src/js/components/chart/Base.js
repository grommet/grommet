// (C) Copyright 2016 Hewlett Packard Enterprise Development LP

import React, { Component, PropTypes } from 'react';
import Props from '../../utils/Props';
import CSSClassnames from '../../utils/CSSClassnames';

const CLASS_ROOT = CSSClassnames.CHART_BASE;

// Placeholder that reserves space on the screen for Layers to be positioned over.

export default class Base extends Component {

  render () {
    const { height, width } = this.props;
    const restProps = Props.omit(this.props, Object.keys(Base.propTypes));

    let classes = [CLASS_ROOT];
    if (height) {
      classes.push(`${CLASS_ROOT}--height-${height}`);
    }
    if (width) {
      classes.push(`${CLASS_ROOT}--width-${width}`);
    }
    if (this.props.className) {
      classes.push(this.props.className);
    }

    return (
      <div {...restProps} className={classes.join(' ')}>
        {this.props.children}
      </div>
    );
  }

};

Base.propTypes = {
  height: PropTypes.oneOf(['small', 'medium', 'large', 'sparkline']),
  width: PropTypes.oneOf(['small', 'medium', 'large', 'full'])
};

Base.defaultProps = {
  height: 'medium',
  width: 'medium'
};
