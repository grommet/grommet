// (C) Copyright 2014-2015 Hewlett Packard Enterprise Development LP

import React, { PropTypes, Component } from 'react';
import classnames from 'classnames';

const CLASS_ROOT = 'headline';

export default class Headline extends Component {
  render () {
    let classes = classnames(
      CLASS_ROOT,
      {
        [`${CLASS_ROOT}--${this.props.size}`]: this.props.size,
        [`${CLASS_ROOT}--align-${this.props.align}`]: this.props.align,
        [`${CLASS_ROOT}--margin-${this.props.margin}`]: this.props.margin,
        [`${CLASS_ROOT}--strong`]: this.props.strong
      },
      this.props.className
    );

    return (
      <div className={classes}>
        {this.props.children}
      </div>
    );
  }
};

Headline.propTypes = {
  align: PropTypes.oneOf(['start', 'center', 'end']),
  margin: PropTypes.oneOf(['none', 'small', 'medium', 'large']),
  size: PropTypes.oneOf(['small', 'medium', 'large']),
  strong: PropTypes.bool
};
