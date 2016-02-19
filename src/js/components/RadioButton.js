// (C) Copyright 2014-2015 Hewlett Packard Enterprise Development LP

import React, { PropTypes } from 'react';
import classnames from 'classnames';

const CLASS_ROOT = 'radio-button';

const RadioButton = props => {
  let classes = classnames(
    CLASS_ROOT,
    props.className,
    {
      [`${CLASS_ROOT}--disabled`]: props.disabled
    }
  );

  return (
    <label className={classes}>
      <input className={`${CLASS_ROOT}__input`}
        id={props.id} name={props.name} type="radio"
        disabled={props.disabled}
        checked={props.checked}
        defaultChecked={props.defaultChecked}
        value={props.value}
        onChange={props.onChange} />
      <span className={`${CLASS_ROOT}__control`}></span>
        <span className={`${CLASS_ROOT}__label`}>
          {props.label}
        </span>
    </label>
  );
};

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

RadioButton.displayName = 'RadioButton';

export default RadioButton;
