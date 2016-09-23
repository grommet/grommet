// (C) Copyright 2014-2016 Hewlett Packard Enterprise Development LP

import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';
import CSSClassnames from '../utils/CSSClassnames';

const CLASS_ROOT = CSSClassnames.RADIO_BUTTON;

export default class RadioButton extends Component {
  render () {
    let classes = classnames(
      CLASS_ROOT,
      this.props.className,
      {
        [`${CLASS_ROOT}--disabled`]: this.props.disabled
      }
    );

    return (
      <label className={classes}>
        <input className={`${CLASS_ROOT}__input`}
          id={this.props.id} name={this.props.name} type="radio"
          disabled={this.props.disabled}
          checked={this.props.checked}
          defaultChecked={this.props.defaultChecked}
          value={this.props.value}
          onChange={this.props.onChange} />
        <span className={`${CLASS_ROOT}__control`} />
          <span className={`${CLASS_ROOT}__label`}>
            {this.props.label}
          </span>
      </label>
    );
  }
};

RadioButton.propTypes = {
  checked: PropTypes.bool,
  defaultChecked: PropTypes.bool,
  disabled: PropTypes.bool,
  id: PropTypes.string.isRequired,
  label: PropTypes.node.isRequired,
  name: PropTypes.string,
  onChange: PropTypes.func,
  value: PropTypes.string
};
