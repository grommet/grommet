// (C) Copyright 2014-2015 Hewlett Packard Enterprise Development LP

import React, { Component, PropTypes } from 'react';
import Right from './base/LinkNext';
import Left from './base/LinkPrevious';

const CLASS_ROOT = "right-left-icon";

export default class LinkRightLeft extends Component {

  render () {
    let classes = [CLASS_ROOT];
    let { a11yTitle, size } = this.props;
    if (this.props.className) {
      classes.push(this.props.className);
    }
    return (
      <span className={classes.join(' ')}>
        <Right className={CLASS_ROOT + '--right'} a11yTitle={a11yTitle} size={size} />
        <Left className={CLASS_ROOT + '--left'} a11yTitle={a11yTitle} size={size} />
      </span>
    );
  }
}

LinkRightLeft.propTypes = {
  a11yTitle: PropTypes.string,
  size: PropTypes.oneOf(['small', 'medium', 'large'])
};
