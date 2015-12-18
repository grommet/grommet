// (C) Copyright 2014-2015 Hewlett Packard Enterprise Development LP

import React, { Component, PropTypes } from 'react';

const CLASS_ROOT = "check-box";

class CheckBox extends Component {

  render () {
    var classes = [CLASS_ROOT];
    var labelId = 'checkbox-label';
    var hidden;
    if (this.props.toggle) {
      classes.push(CLASS_ROOT + "--toggle");
    }
    if (this.props.disabled) {
      classes.push(CLASS_ROOT + "--disabled");
      if (this.props.checked) {
        hidden = (
          <input name={this.props.name} type="hidden" value="true"/>
        );
      }
    }
    if (this.props.className) {
      classes.push(this.props.className);
    }

    return (
      <label className={classes.join(' ')}
        aria-describedby={this.props.ariaDescribedby}
        aria-lebelledby={labelId}>
        <input tabIndex="0" className={CLASS_ROOT + "__input"}
          id={this.props.id} name={this.props.name} type="checkbox"
          disabled={this.props.disabled}
          checked={this.props.checked}
          defaultChecked={this.props.defaultChecked}
          onChange={this.props.onChange} />
        <span className={CLASS_ROOT + "__control"}>
          <svg className={CLASS_ROOT + "__control-check"} viewBox="0 0 24 24"
            preserveAspectRatio="xMidYMid meet">
            <path fill="none" d="M6,11.3 L10.3,16 L18,6.2"></path>
          </svg>
        </span>
        {hidden}
        <span role="label" id={labelId} tabIndex="-1" className={CLASS_ROOT + "__label"}>
          {this.props.label}
        </span>
      </label>
    );
  }

}

CheckBox.propTypes = {
  checked: PropTypes.bool,
  defaultChecked: PropTypes.bool,
  disabled: PropTypes.bool,
  id: PropTypes.string.isRequired,
  label: PropTypes.node.isRequired,
  name: PropTypes.string,
  onChange: PropTypes.func,
  ariaDescribedby: PropTypes.string,
  toggle: PropTypes.bool
};

module.exports = CheckBox;
