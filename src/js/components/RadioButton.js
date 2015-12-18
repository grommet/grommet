// (C) Copyright 2014-2015 Hewlett Packard Enterprise Development LP

import React, { Component, PropTypes } from 'react';

const CLASS_ROOT = "radio-button";

class RadioButton extends Component {
  render () {
    var classes = [CLASS_ROOT];
    if (this.props.disabled) {
      classes.push(CLASS_ROOT + "--disabled");
    }
    if (this.props.className) {
      classes.push(this.props.className);
    }
    return (
      <label className={classes.join(' ')}>
        <input className={CLASS_ROOT + "__input"}
          id={this.props.id} name={this.props.name} type="radio"
          disabled={this.props.disabled}
          checked={this.props.checked}
          defaultChecked={this.props.defaultChecked}
          value={this.props.value}
          onChange={this.props.onChange} />
        <span className={CLASS_ROOT + "__control"}></span>
        <span className={CLASS_ROOT + "__label"}>
          {this.props.label}
        </span>
      </label>
    );
  }
}

RadioButton.propTypes = {
  checked: PropTypes.bool,
  disabled: PropTypes.bool,
  defaultChecked: PropTypes.bool,
  id: PropTypes.string.isRequired,
  label: PropTypes.node.isRequired,
  name: PropTypes.string,
  onChange: PropTypes.func,
  value: PropTypes.string
};

module.exports = RadioButton;
