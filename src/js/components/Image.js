// (C) Copyright 2014-2015 Hewlett Packard Enterprise Development LP

import React, { Component, PropTypes } from 'react';

const CLASS_ROOT = "image";

export default class Image extends Component {

  render () {
    var classes = [CLASS_ROOT];
    if (this.props.size) {
      classes.push(CLASS_ROOT + "--" + this.props.size);
    }
    if (this.props.full) {
      if ('string' === typeof this.props.full) {
        classes.push(CLASS_ROOT + "--full-" + this.props.full);
      } else {
        classes.push(CLASS_ROOT + "--full");
      }
    }

    return (
      <img id={this.props.id} className={classes.join(' ')}
        src={this.props.src} />
    );
  }
}

Image.propTypes = {
  full: PropTypes.oneOf([true, 'horizontal', 'vertical', false]),
  src: PropTypes.string,
  size: PropTypes.oneOf(['small', 'medium', 'large'])
};
