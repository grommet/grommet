// (C) Copyright 2014-2016 Hewlett Packard Enterprise Development LP

import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';
import CSSClassnames from '../utils/CSSClassnames';

const CLASS_ROOT = CSSClassnames.CHECK_BOX;

export default class CheckBox extends Component {
  render () {
    const {
      checked, className, disabled, label, name, onChange, reverse, toggle,
      ...props
    } = this.props;
    const classes = classnames(
      CLASS_ROOT,
      {
        [`${CLASS_ROOT}--toggle`]: toggle,
        [`${CLASS_ROOT}--disabled`]: disabled,
        [`${CLASS_ROOT}--reverse`]: reverse
      },
      className
    );

    let labelNode;
    if (label) {
      labelNode = (
        <label key='label' htmlFor={props.id}
          className={`${CLASS_ROOT}__label`}>
          {label}
        </label>
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
        <input {...props} tabIndex='0' className={`${CLASS_ROOT}__input`}
          name={name} type='checkbox'
          disabled={disabled}
          checked={checked}
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
      <label className={classes} aria-label={label}>
        {reverse ? children.reverse() : children}
        {hidden}
      </label>
    );
  }

}

CheckBox.propTypes = {
  checked: PropTypes.bool,
  disabled: PropTypes.bool,
  id: PropTypes.string,
  label: PropTypes.node,
  name: PropTypes.string,
  onChange: PropTypes.func,
  reverse: PropTypes.bool,
  toggle: PropTypes.bool
};
