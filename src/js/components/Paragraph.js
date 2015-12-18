// (C) Copyright 2014-2015 Hewlett Packard Enterprise Development LP

import React, { Component, PropTypes } from 'react';

const CLASS_ROOT = "paragraph";

class Paragraph extends Component {

  render () {
    var classes = [CLASS_ROOT];
    if (this.props.size) {
      classes.push(CLASS_ROOT + "--" + this.props.size);
    }

    return (
      <p id={this.props.id} className={classes.join(' ')}>
        {this.props.children}
      </p>
    );
  }

}

Paragraph.propTypes = {
  size: PropTypes.oneOf(['small', 'medium', 'large'])
};

module.exports = Paragraph;
