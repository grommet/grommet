// (C) Copyright 2014-2016 Hewlett Packard Enterprise Development LP

import React, { Component, PropTypes } from 'react';
import Button from './Button';
import AddIcon from './icons/base/Add';
import SubtractIcon from './icons/base/Subtract';
import CSSClassnames from '../utils/CSSClassnames';

const CLASS_ROOT = CSSClassnames.NUMBER_INPUT;
const INPUT = CSSClassnames.INPUT;

export default class NumberInput extends Component {

  constructor(props, context) {
    super(props, context);

    this._onAdd = this._onAdd.bind(this);
    this._onSubtract = this._onSubtract.bind(this);
  }

  _fireChange () {
    let event;
    try {
      event = new Event('change', {
        'bubbles': true,
        'cancelable': true
      });
    } catch (e) {
      // IE11 workaround.
      event = document.createEvent('Event');
      event.initEvent('change', true, true);
    }
    // We use dispatchEvent to have the browser fill out the event fully.
    this.inputRef.dispatchEvent(event);
    // Manually dispatched events aren't delivered by React, so we notify too.
    this.props.onChange(event);
  }

  _onAdd () {
    const input = this.inputRef;
    try {
      input.stepUp();
    } catch (e) {
      // IE11 workaround. See known issue #5 at
      // http://caniuse.com/#search=number
      let value = (parseInt(input.value, 10) || 0) + (this.props.step || 1);
      if (this.props.max !== undefined) {
        value = Math.min(value, this.props.max);
      }
      input.value = value;
    }
    this._fireChange();
  }

  _onSubtract () {
    const input = this.inputRef;
    try {
      input.stepDown();
    } catch (e) {
      // IE11 workaround. See known issue #5 at
      // http://caniuse.com/#search=number
      let value = (parseInt(input.value, 10) || 0) - (this.props.step || 1);
      if (this.props.min !== undefined) {
        value = Math.max(value, this.props.min);
      }
      input.value = value;
    }
    this._fireChange();
  }

  render () {
    let classes = [CLASS_ROOT];
    const labelId = 'number-label';
    if (this.props.disabled) {
      classes.push(CLASS_ROOT + "--disabled");
    }
    if (this.props.className) {
      classes.push(this.props.className);
    }
    const onSubtract = (! this.props.disabled ? this._onSubtract : undefined);
    const onAdd = (! this.props.disabled ? this._onAdd : undefined);

    return (
      <span className={classes.join(' ')}
        aria-describedby={this.props.ariaDescribedby}
        aria-labelledby={labelId}>

        <input ref={ref => this.inputRef = ref}
          tabIndex="0" className={`${INPUT} ${CLASS_ROOT}__input`}
          id={this.props.id} name={this.props.name} type="number"
          disabled={this.props.disabled}
          value={this.props.value}
          defaultValue={this.props.defaultValue}
          min={this.props.min}
          max={this.props.max}
          step={this.props.step}
          onChange={this.props.onChange} />

        <Button icon={<SubtractIcon />} className={CLASS_ROOT + "__subtract"}
          onClick={onSubtract} />

        <Button icon={<AddIcon />} className={CLASS_ROOT + "__add"}
          onClick={onAdd} />
      </span>
    );
  }

}

NumberInput.propTypes = {
  ariaDescribedby: PropTypes.string,
  defaultValue: PropTypes.number,
  disabled: PropTypes.bool,
  id: PropTypes.string,
  max: PropTypes.number,
  min: PropTypes.number,
  name: PropTypes.string,
  onChange: PropTypes.func,
  step: PropTypes.number,
  value: PropTypes.number
};
