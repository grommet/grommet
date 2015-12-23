// (C) Copyright 2014-2015 Hewlett Packard Enterprise Development LP

import React, { Component, PropTypes } from 'react';

const CLASS_ROOT = "attribute";

export default class Attribute extends Component {
  render() {
    var classes = [CLASS_ROOT];
    return (
      <div className={classes.join(' ')}>
        <label className={CLASS_ROOT + "__label"}>
          {this.props.label}
        </label>
        <span className={CLASS_ROOT + "__contents"}>
          {this.props.children}
        </span>
      </div>
    );
  }
}

Attribute.propTypes = {
  label: PropTypes.string
};
