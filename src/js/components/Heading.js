// (C) Copyright 2014-2015 Hewlett Packard Enterprise Development LP

import React, { Component, PropTypes } from 'react';

const CLASS_ROOT = 'heading';

export default class Heading extends Component {
  render() {
    let classes = [CLASS_ROOT];
    if (this.props.size == 'large') {
      classes.push(`${CLASS_ROOT}--large`);
    }
    if (this.props.size == 'small') {
      classes.push(`${CLASS_ROOT}--small`);
    }
    if (this.props.strong) {
      classes.push(`${CLASS_ROOT}--strong`);
    }
    if (this.props.className) {
      classes.push(this.props.className);
    }

    return (
      <this.props.tag className={classes.join(' ')}>
        {this.props.children}
      </this.props.tag>
    );
  }
}

Heading.propTypes = {
  size: PropTypes.string,
  strong: PropTypes.bool,
  tag: PropTypes.string
};

Heading.defaultProps = {
  tag: 'h1'
};
