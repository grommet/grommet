// (C) Copyright 2014-2015 Hewlett Packard Enterprise Development LP

import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';

import Label from './Label';

const CLASS_ROOT = 'image';

export default class Image extends Component {
  render () {
    let { caption, className, full, id, size, src } = this.props;
    let classes = classnames(
      CLASS_ROOT,
      {
        [`${CLASS_ROOT}--${size}`]: size,
        [`${CLASS_ROOT}--full`]: typeof full === 'boolean' && full,
        [`${CLASS_ROOT}--full-${full}`]: typeof full === 'string'
      },
      className
    );

    return caption ? (
      <figure className={classes}>
        <img id={id} src={src} className={`${CLASS_ROOT}__image`} />
        <figcaption className={`${CLASS_ROOT}__caption`}>
          <Label>{caption}</Label>
        </figcaption>
      </figure>
    ) : (
      <img id={id} src={src} className={classes} />
    );
  }
};

Image.propTypes = {
  caption: PropTypes.string,
  className: PropTypes.string,
  full: PropTypes.oneOf([true, 'horizontal', 'vertical', false]),
  id: PropTypes.string,
  size: PropTypes.oneOf(['small', 'medium', 'large', 'thumb']),
  src: PropTypes.string
};

Image.defaultProps = {
  size: 'medium'
};
