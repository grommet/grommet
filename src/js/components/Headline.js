// (C) Copyright 2014-2015 Hewlett Packard Enterprise Development LP

import React, { Component, PropTypes } from 'react';

const CLASS_ROOT = "headline";

export default class Headline extends Component {
  render() {
    var classes = [CLASS_ROOT];
    if (this.props.large) {
      classes.push(CLASS_ROOT + "--large");
    }
    if (this.props.small) {
      classes.push(CLASS_ROOT + "--small");
    }
    if (this.props.strong) {
      classes.push(CLASS_ROOT + "--strong");
    }
    if (this.props.className) {
      classes.push(this.props.className);
    }

    return (
      <div className={classes.join(' ')}>
        {this.props.children}
      </div>
    );
  }
}

Headline.propTypes = {
  colorIndex: PropTypes.string,
  large: PropTypes.bool,
  small: PropTypes.bool,
  strong: PropTypes.bool
};
