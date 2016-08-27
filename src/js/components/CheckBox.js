// (C) Copyright 2014-2016 Hewlett Packard Enterprise Development LP

import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';

import CSSClassnames from '../utils/CSSClassnames';
import Props from '../utils/Props';

const CLASS_ROOT = CSSClassnames.CHECK_BOX;

export default class CheckBox extends Component {
  render () {
    const {
      checked, className, defaultChecked, disabled,
      id, label, name, onChange, reverse, toggle
    } = this.props;

    const classes = classnames(
      CLASS_ROOT,
      className, {
        [`${CLASS_ROOT}--toggle`]: toggle,
        [`${CLASS_ROOT}--disabled`]: disabled
      }
    );
    const restProps = Props.omit(this.props, Object.keys(CheckBox.propTypes));

    let labelNode;
    if (label) {
      labelNode = (
        <span key='label' className={`${CLASS_ROOT}__label`}>
          {label}
        </span>
      );
    }

    let hidden;
    if (disabled && checked) {
      hidden = (
        <input name={name} type='hidden' value='true'/>
      );
    }

    const children = [
      <span key='checkbox'>
        <input tabIndex='0' className={`${CLASS_ROOT}__input`}
          id={id} name={name} type='checkbox'
          disabled={disabled}
          checked={checked}
          defaultChecked={defaultChecked}
          onChange={onChange} />
        <span className={`${CLASS_ROOT}__control`}>
          <svg className={`${CLASS_ROOT}__control-check`} viewBox='0 0 24 24'
            preserveAspectRatio='xMidYMid meet'>
            <path fill='none' d='M6,11.3 L10.3,16 L18,6.2' />
          </svg>
        </span>
      </span>,
      labelNode
    ];

    return (
      <label
        {...restProps}
        className={classes}
        aria-label={label}>
        {reverse ? children.reverse() : children}
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
