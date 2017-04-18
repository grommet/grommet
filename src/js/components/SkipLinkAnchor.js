// (C) Copyright 2014-2016 Hewlett Packard Enterprise Development LP

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import CSSClassnames from '../utils/CSSClassnames';

const CLASS_ROOT = CSSClassnames.SKIP_LINK_ANCHOR;

export default class SkipLinkAnchor extends Component {
  render () {
    let id = 'skip-link-' + this.props.label.toLowerCase().replace(/ /g, '_');

    return (
      <a tabIndex="-1" aria-hidden="true" id={id} className={CLASS_ROOT}>
        {this.props.label}
      </a>
    );
  }
}

SkipLinkAnchor.propTypes = {
  label: PropTypes.node.isRequired
};
