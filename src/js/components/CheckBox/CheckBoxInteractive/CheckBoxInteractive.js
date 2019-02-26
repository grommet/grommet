import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { CheckBox } from '../CheckBox';

export default class CheckBoxInteractive extends Component {
  state = { checked: false };

  render() {
    const { checked } = this.state;
    return (
      <CheckBox
        {...this.props}
        checked={checked}
        onChange={event => this.setState({ checked: event.target.checked })}
      />
    );
  }
}

CheckBoxInteractive.propTypes = {
  checked:  PropTypes.bool,
  disabled:  PropTypes.bool,
  id:  PropTypes.string,
  label:  PropTypes.node,
  name:  PropTypes.string,
  onChange:  PropTypes.func,
  reverse:  PropTypes.bool,
  toggle:  PropTypes.bool,
  indeterminate:  PropTypes.bool,
}
