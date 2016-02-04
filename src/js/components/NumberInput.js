// (C) Copyright 2014-2015 Hewlett Packard Enterprise Development LP

import React, { Component, PropTypes } from 'react';
import Button from './Button';

const CLASS_ROOT = "number-input";

export default class NumberInput extends Component {

  constructor () {
    super();

    this._onAdd = this._onAdd.bind(this);
    this._onSubtract = this._onSubtract.bind(this);
  }

  _fireChange () {
    var event = new Event('change', {
      'bubbles': true,
      'cancelable': true
    });
    // We use dispatchEvent to have the browser fill out the event fully.
    this.refs.input.dispatchEvent(event);
    // Manually dispatched events aren't delivered by React, so we notify too.
    this.props.onChange(event);
  }

  _onAdd () {
    this.refs.input.stepUp();
    this._fireChange();
  }

  _onSubtract () {
    this.refs.input.stepDown();
    this._fireChange();
  }

  render () {
    var classes = [CLASS_ROOT];
    var labelId = 'number-label';
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

        <input ref="input" tabIndex="0" className={CLASS_ROOT + "__input"}
          id={this.props.id} name={this.props.name} type="number"
          disabled={this.props.disabled}
          value={this.props.value}
          defaultValue={this.props.defaultValue}
          min={this.props.min}
          max={this.props.max}
          step={this.props.step}
          onChange={this.props.onChange} />

        <Button icon="Subtract" className={CLASS_ROOT + "__subtract"}
          onClick={onSubtract} />

        <Button icon="Add" className={CLASS_ROOT + "__add"}
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
  name: PropTypes.string,
  max: PropTypes.number,
  min: PropTypes.number,
  onChange: PropTypes.func,
  step: PropTypes.number,
  value: PropTypes.number
};
