// (C) Copyright 2014-2015 Hewlett Packard Enterprise Development LP

import React, { Component, PropTypes } from 'react';

export default class ButtonLabel extends Component {
  render () {
    var icon = null;
    var text = null;
    if (this.props.icon) {
      icon = (<span className="button-label__icon control-icon">{this.props.icon}</span>);
    }
    if (this.props.text) {
      text = (<span className="button-label__text">{this.props.text}</span>);
    }
    return (
      <div className="button-label">
        {icon}
        {text}
      </div>
    );
  }
}

ButtonLabel.propTypes = {
  icon: PropTypes.node,
  text: PropTypes.string
};
