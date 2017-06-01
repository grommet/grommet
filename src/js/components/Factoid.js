// (C) Copyright 2014-2016 Hewlett Packard Enterprise Development LP

import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';
import Paragraph from './Paragraph';

const CLASS_ROOT = 'factoid';

export default class Factoid extends Component {
  render() {
    let classes = classnames(
      CLASS_ROOT,
      this.props.className,
      {
        [`${CLASS_ROOT}--${this.props.size}`]: this.props.size
      }
    );

    return (
      <div className={classes}>
        <div className={`${CLASS_ROOT}--main`}>{this.props.iconBefore}{this.props.text}{this.props.iconAfter}</div>
        <Paragraph size={this.props.size}>{this.props.caption}</Paragraph>
      </div>
    );
  }
}

Factoid.propTypes = {
  size: PropTypes.oneOf(['small', 'medium', 'large']),
  iconBefore: PropTypes.node,
  iconAfter: PropTypes.node,
  text: PropTypes.string.isRequired,
  caption: PropTypes.string
};

Factoid.defaultProps = {
  size: 'medium'
};
