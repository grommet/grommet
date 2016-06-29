// (C) Copyright 2014-2015 Hewlett Packard Enterprise Development LP

import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';
import CSSClassnames from '../utils/CSSClassnames';

const CLASS_ROOT = CSSClassnames.PARAGRAPH;

export default class Paragraph extends Component {
  render () {
    var classes = classnames(
      CLASS_ROOT,
      this.props.className,
      {
        [`${CLASS_ROOT}--${this.props.size}`]: this.props.size,
        [`${CLASS_ROOT}--align-${this.props.align}`]: this.props.align,
        [`${CLASS_ROOT}--margin-${this.props.margin}`]: this.props.margin,
        [`${CLASS_ROOT}--width-${this.props.width}`]: this.props.width
      }
    );

    // we handle dangerouslySetInnerHTML to allow using Paragraph with Markdown.
    return (
      <p id={this.props.id} className={classes}
        dangerouslySetInnerHTML={this.props.dangerouslySetInnerHTML}>
        {this.props.children}
      </p>
    );
  }
};

Paragraph.propTypes = {
  align: PropTypes.oneOf(['start', 'center', 'end']),
  id: PropTypes.string,
  margin: PropTypes.oneOf(['none', 'small', 'medium', 'large']),
  size: PropTypes.oneOf(['small', 'medium', 'large', 'xlarge']),
  width: PropTypes.oneOf(['small', 'medium', 'large'])
};
