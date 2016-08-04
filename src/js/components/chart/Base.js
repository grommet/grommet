// (C) Copyright 2016 Hewlett Packard Enterprise Development LP

import React, { Component, PropTypes, Children } from 'react';
import Props from '../../utils/Props';
import CSSClassnames from '../../utils/CSSClassnames';

const CLASS_ROOT = CSSClassnames.CHART_BASE;

// Placeholder that reserves space on the screen for Layers to be
// positioned over.

export default class Base extends Component {

  render () {
    const { vertical } = this.props;
    const restProps = Props.omit(this.props, Object.keys(Base.propTypes));
    const childCount = Children.count(this.props.children);
    const width =
      (! childCount && ! this.props.width ? 'medium' : this.props.width);
    const height =
      (! childCount && ! this.props.height ? 'medium' : this.props.height);

    let classes = [CLASS_ROOT];
    if (vertical) {
      classes.push(`${CLASS_ROOT}--vertical`);
    }
    if (height) {
      classes.push(`${CLASS_ROOT}--height-${height}`);
    }
    if (width) {
      classes.push(`${CLASS_ROOT}--width-${width}`);
    }
    if (this.props.className) {
      classes.push(this.props.className);
    }

    let children = this.props.children;
    // We can't distribute children when vertical because our height isn't
    // known.
    if (! vertical) {
      // Round to hundredths of a % so things line up reasonably accurately
      const basis = `${Math.floor(10000 / childCount) / 100.0}%`;
      children = Children.map(this.props.children, child => (
        child ? React.cloneElement(child, { style: { flexBasis: basis }}) :
          child
      ));
    }

    return (
      <div {...restProps} className={classes.join(' ')}>
        {children}
      </div>
    );
  }

};

Base.propTypes = {
  height: PropTypes.oneOf(['small', 'medium', 'large', 'sparkline']),
  vertical: PropTypes.bool,
  width: PropTypes.oneOf(['small', 'medium', 'large', 'full'])
};
