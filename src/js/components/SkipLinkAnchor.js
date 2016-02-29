// (C) Copyright 2014-2015 Hewlett Packard Enterprise Development LP

import React, { Component, PropTypes } from 'react';

export default class SkipLinkAnchor extends Component {
  render () {
    let id = 'skip-link-' + this.props.label.toLowerCase().replace(/ /g, '_');

    return (
      <a tabIndex="-1" id={id} className="skip-link-anchor">
        {this.props.label}
      </a>
    );
  }
};

SkipLinkAnchor.propTypes = {
  label: PropTypes.node.isRequired
};
