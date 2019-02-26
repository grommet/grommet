/* eslint-disable react/destructuring-assignment */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { RadioButtonGroup } from '../RadioButtonGroup';

export default class RadioButtonGroupInteractive extends Component {
  state = { value: this.props.value };

  render() {
    const { value } = this.state;
    return (
      <RadioButtonGroup
        {...this.props}
        value={value}
        onChange={event => this.setState({ value: event.target.value})}
      />
    );
  }
};

RadioButtonGroupInteractive.propTypes = {
  name: PropTypes.string,
  onChange: PropTypes.func,
  options: PropTypes.array,
  value: PropTypes.string,
};


