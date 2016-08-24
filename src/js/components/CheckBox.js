// (C) Copyright 2014-2015 Hewlett Packard Enterprise Development LP

import React, { Component, PropTypes } from 'react';
import Props from '../utils/Props';
import CSSClassnames from '../utils/CSSClassnames';

const CLASS_ROOT = CSSClassnames.CHECK_BOX;

export default class CheckBox extends Component {

  set checked (value) {
    if ('refs' in this) {
      this.refs.input.checked = !!value;
    }
  }

  get checked () {
    return 'refs' in this ? this.refs.input.checked : null;
  }

  render () {
    let classes = [CLASS_ROOT];
    let restProps = Props.omit(this.props, Object.keys(CheckBox.propTypes));
    let label;
    let labelId = `${CLASS_ROOT}-label`;
    if (this.props.label) {
      label = (
        <span key="label" role="label" id={labelId}
          className={`${CLASS_ROOT}__label`}>
          {this.props.label}
        </span>
      );
    }

    if (this.props.toggle) {
      classes.push(`${CLASS_ROOT}--toggle`);
    }

    let hidden;
    if (this.props.disabled) {
      classes.push(`${CLASS_ROOT}--disabled`);
      if (this.props.checked) {
        hidden = (
          <input name={this.props.name} type="hidden" value="true"/>
        );
      }
    }

    if (this.props.className) {
      classes.push(this.props.className);
    }

    let children = [
      <span key="checkbox">
        <input tabIndex="0" className={`${CLASS_ROOT}__input`}
          id={this.props.id} name={this.props.name} type="checkbox"
          disabled={this.props.disabled}
          checked={this.props.checked}
          defaultChecked={this.props.defaultChecked}
          onChange={this.props.onChange}
           />
        <span className={`${CLASS_ROOT}__control`}>
          <svg className={`${CLASS_ROOT}__control-check`} viewBox="0 0 24 24"
            preserveAspectRatio="xMidYMid meet">
            <path fill="none" d="M6,11.3 L10.3,16 L18,6.2" />
          </svg>
        </span>
      </span>,
      label
    ];

    return (
      <label
        {...restProps}
        className={classes.join(' ')}
        aria-labelledby={labelId}>
        {this.props.reverse ? children.reverse() : children}
        {hidden}
      </label>
    );
  }

}

CheckBox.propTypes = {
  checked: PropTypes.bool,
  defaultChecked: PropTypes.bool,
  disabled: PropTypes.bool,
  id: PropTypes.string,
  label: PropTypes.node,
  name: PropTypes.string,
  onChange: PropTypes.func,
  reverse: PropTypes.bool,
  toggle: PropTypes.bool
};
