// (C) Copyright 2014-2015 Hewlett Packard Enterprise Development LP

import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';

const CLASS_ROOT = 'image';

export default class Image extends Component {
  render () {
    let { size, full } = this.props;
    let classes = classnames(
      CLASS_ROOT,
      this.props.className,
      {
        [`${CLASS_ROOT}--${size}`]: size,
        [`${CLASS_ROOT}--full`]: typeof full === 'boolean' && full,
        [`${CLASS_ROOT}--full-${full}`]: typeof full === 'string'
      }
    );

    return <img id={this.props.id} className={classes} src={this.props.src} />;
  }
};

Image.propTypes = {
  full: PropTypes.oneOf([true, 'horizontal', 'vertical', false]),
  src: PropTypes.string,
  size: PropTypes.oneOf(['small', 'medium', 'large', 'thumb'])
};
