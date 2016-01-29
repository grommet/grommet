// (C) Copyright 2014-2015 Hewlett Packard Enterprise Development LP

import React, { Component, PropTypes } from 'react';

const CLASS_ROOT = 'form-label';

export default class FormLabel extends Component {
  render() {
    let classes = [CLASS_ROOT];
    if (this.props.uppercase) {
      classes.push(`${CLASS_ROOT}--uppercase`);
    }
    if (this.props.className) {
      classes.push(this.props.className);
    }

    return (
      <label className={classes.join(' ')} htmlFor={this.props.labelFor}>
        {this.props.children}
      </label>
    );
  }
}

FormLabel.propTypes = {
  uppercase: PropTypes.bool,
  labelFor: PropTypes.string
};
