// (C) Copyright 2014-2015 Hewlett Packard Enterprise Development LP

import React, { Component, PropTypes } from 'react';

const CLASS_ROOT = 'heading';

export default class Heading extends Component {
  render() {
    let classes = [CLASS_ROOT];
    if (this.props.size) {
      classes.push(`${CLASS_ROOT}--${this.props.size}`);
    }
    if (this.props.strong) {
      classes.push(`${CLASS_ROOT}--strong`);
    }
    if (this.props.align) {
      classes.push(`${CLASS_ROOT}--align-${this.props.align}`);
    }
    if (this.props.margin) {
      classes.push(`${CLASS_ROOT}--margin-${this.props.margin}`);
    }    
    if (this.props.uppercase) {
      classes.push(`${CLASS_ROOT}--uppercase`);
    }
    if (this.props.className) {
      classes.push(this.props.className);
    }

    // we handle dangerouslySetInnerHTML to allow using Heading with Markdown.
    return (
      <this.props.tag id={this.props.id} className={classes.join(' ')}
        dangerouslySetInnerHTML={this.props.dangerouslySetInnerHTML}>
        {this.props.children}
      </this.props.tag>
    );
  }
}

Heading.propTypes = {
  align: PropTypes.oneOf(['start', 'center', 'end']),
  margin: PropTypes.oneOf(['none', 'small', 'medium', 'large']),
  size: PropTypes.oneOf(['small', 'medium', 'large']),
  strong: PropTypes.bool,
  tag: PropTypes.string,
  uppercase: PropTypes.bool
};

Heading.defaultProps = {
  tag: 'h1'
};
