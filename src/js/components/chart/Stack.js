// (C) Copyright 2016 Hewlett Packard Enterprise Development LP

import React, { Component, PropTypes, Children } from 'react';
import Props from '../../utils/Props';
import CSSClassnames from '../../utils/CSSClassnames';

const CLASS_ROOT = CSSClassnames.CHART_STACK;

// Equally sized siblings.

export default class Stack extends Component {

  render () {
    const { height, width, vertical } = this.props;
    const restProps = Props.omit(this.props, Object.keys(Stack.propTypes));

    let classes = [CLASS_ROOT];
    if (vertical) {
      classes.push(`${CLASS_ROOT}--vertical`);
    }
    if (this.props.className) {
      classes.push(this.props.className);
    }

    let style = {};
    if (height) {
      style.height = `${height}px`;
    }
    if (width) {
      style.width = `${width}px`;
    }

    let children = this.props.children;
    // We can't distribute children when vertical because our height isn't known.
    if (! vertical) {
      // Round to hundredths of a % so things line up reasonably accurately
      const basis = (Math.floor(10000 / Children.count(this.props.children)) / 100.0) + '%';
      children = Children.map(this.props.children, child => (
        child ? React.cloneElement(child, { style: { flexBasis: basis }}) : child
      ));
    }

    return (
      <div {...restProps} className={classes.join(' ')} style={style}>
        {children}
      </div>
    );
  }

};

Stack.propTypes = {
  height: PropTypes.number,
  vertical: PropTypes.bool,
  width: PropTypes.number
};
