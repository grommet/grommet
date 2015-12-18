// (C) Copyright 2014-2015 Hewlett Packard Enterprise Development LP

import React, { Component, PropTypes } from 'react';
import keys from 'lodash/object/keys';

const CLASS_ROOT = "form";

class Form extends Component {

  render () {
    var classes = [CLASS_ROOT];
    if (this.props.compact) {
      classes.push(CLASS_ROOT + "--compact");
    }
    if (this.props.fill) {
      classes.push(CLASS_ROOT + "--fill");
    }
    if (this.props.pad) {
      if (typeof this.props.pad === 'string') {
        classes.push(CLASS_ROOT + "--pad-" + this.props.pad);
      } else if (typeof this.props.pad === 'object') {
        keys(this.props.pad).forEach(function (key) {
          classes.push(CLASS_ROOT + '--pad-' + key + '-' + this.props.pad[key]);
        }.bind(this));
      }
    }
    if (this.props.className) {
      classes.push(this.props.className);
    }
    return (
      <form className={classes.join(' ')} onSubmit={this.props.onSubmit}>
        {this.props.children}
      </form>
    );
  }

}

Form.propTypes = {
  compact: PropTypes.bool,
  fill: PropTypes.bool,
  flush: PropTypes.bool,
  onSubmit: PropTypes.func,
  pad: PropTypes.oneOfType([
    PropTypes.oneOf(['none', 'small', 'medium', 'large']),
    PropTypes.shape({
      horizontal: PropTypes.oneOf(['none', 'small', 'medium', 'large']),
      vertical: PropTypes.oneOf(['none', 'small', 'medium', 'large'])
    })
  ])
};

Form.defaultProps = {
  compact: false,
  fill: false,
  flush: true,
  pad: 'none'
};

module.exports = Form;
