// (C) Copyright 2014-2015 Hewlett Packard Enterprise Development LP

import React, { Component, PropTypes } from 'react';

class Label extends Component {
  render () {
    var icon = null;
    var text = null;
    if (this.props.icon) {
      icon = (<span className="label__icon control-icon">{this.props.icon}</span>);
    }
    if (this.props.text) {
      text = (<span className="label__text">{this.props.text}</span>);
    }
    return (
      <div className="label">
        {icon}
        {text}
      </div>
    );
  }
}

Label.propTypes = {
  icon: PropTypes.node,
  text: PropTypes.string
};

module.exports = Label;
