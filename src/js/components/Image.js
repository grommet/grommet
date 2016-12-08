// (C) Copyright 2014-2016 Hewlett Packard Enterprise Development LP

import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';
import Label from './Label';
import CSSClassnames from '../utils/CSSClassnames';

const CLASS_ROOT = CSSClassnames.IMAGE;

export default class Image extends Component {
  render () {
    const { caption, className, full, mask, size, fit, ...props } = this.props;
    const classes = classnames(
      CLASS_ROOT,
      {
        [`${CLASS_ROOT}--${size}`]: size,
        [`${CLASS_ROOT}--${fit}`]: fit,
        [`${CLASS_ROOT}--full`]: fit || (typeof full === 'boolean' && full),
        [`${CLASS_ROOT}--full-${full}`]: typeof full === 'string',
        [`${CLASS_ROOT}--mask`]: mask
      },
      className
    );

    const captionText = (typeof caption === 'string') ? caption : props.alt;
    const imgNode = (
      <img {...props} className={classes} />
    );

    const labelRoot = `${CLASS_ROOT}__caption`;
    const labelClasses = classnames(
      labelRoot,
      {
        [`${labelRoot}--${size}`]: size
      }
    );
    return caption && captionText ? (
      <span className={`${CLASS_ROOT}__container`}>
        {imgNode}
        <Label className={labelClasses}>
          {captionText}
        </Label>
      </span>
    ) : (
      imgNode
    );
  }
};

Image.propTypes = {
  alt: PropTypes.string,
  caption: PropTypes.oneOfType([
    PropTypes.bool, PropTypes.string
  ]),
  fit: PropTypes.oneOf(['contain', 'cover']),
  full: PropTypes.oneOf([true, 'horizontal', 'vertical', false]),
  mask: PropTypes.bool,
  size: PropTypes.oneOf(['small', 'medium', 'large', 'thumb']),
  src: PropTypes.string,
  title: PropTypes.string
};

Image.defaultProps = {
  size: 'medium'
};
