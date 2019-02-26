/* eslint-disable react/destructuring-assignment */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { RadioButton } from '../RadioButton';

export default class RadioButtonInteractive extends Component {
  state = { selected: this.props.checked };

  render() {
    const { selected } = this.state;
    return (
      <RadioButton
        {...this.props}
        checked={selected}
        onChange={() => !this.props.checked ? this.setState({ selected: true }) : ''}
      />
    );
  }
};

RadioButtonInteractive.propTypes = {
  checked: PropTypes.bool,
  disabled: PropTypes.bool,
  id: PropTypes.string,
  label: PropTypes.node,
  name: PropTypes.string,
  onChange: PropTypes.func,
};


