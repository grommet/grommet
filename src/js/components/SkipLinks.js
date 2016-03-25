// (C) Copyright 2014-2015 Hewlett Packard Enterprise Development LP

import React, { Component, PropTypes } from 'react';
import FormattedMessage from './FormattedMessage';
import Box from './Box';
import Layer from './Layer';
import Menu from './Menu';
import KeyboardAccelerators from '../utils/KeyboardAccelerators';
import Intl from '../utils/Intl';

export default class SkipLinks extends Component {
  constructor (props, context) {
    super(props, context);
    this._processTab = this._processTab.bind(this);
    this._onFocus = this._onFocus.bind(this);
    this._updateAnchors = this._updateAnchors.bind(this);
    this._checkForSkipLink = this._checkForSkipLink.bind(this);
    this.state = {anchors: [], showLayer: false};
  }

  componentDidMount () {
    this._updateAnchors();

    this._keyboardHandlers = {
      tab: this._processTab
    };
    KeyboardAccelerators.startListeningToKeyboard(
      this, this._keyboardHandlers
    );

    document.addEventListener('DOMNodeInserted', this._checkForSkipLink);
  }

  componentWillReceiveProps () {
    this.setState({routeChanged: true});
  }

  componentDidUpdate () {
    if (this.state.routeChanged) {
      this.setState({routeChanged: false}, this._updateAnchors);
    }
  }

  componentWillUnmount () {
    KeyboardAccelerators.stopListeningToKeyboard(
      this, this._keyboardHandlers
    );
    document.removeEventListener('DOMNodeInserted', this._checkForSkipLink);
  }

  _checkForSkipLink (event) {
    const skipLinks = document.querySelectorAll('.skip-link-anchor');
    if (skipLinks.length > 0) {
      this._updateAnchors();
    } else if (this.state.anchors.length > 0) {
      this._updateAnchors();
    }
  }

  _updateAnchors () {
    let anchorElements = document.querySelectorAll('.skip-link-anchor');

    let anchors = Array.prototype.map.call(anchorElements, function (anchorElement) {
      return {
        id: anchorElement.getAttribute('id'),
        label: anchorElement.textContent
      };
    });

    this.setState({anchors: anchors, routeChanged: false});
  }

  _onFocus () {
    if (!this.state.showLayer) {
      this.setState({showLayer: true});
    }
  }

  _processTab (event) {
    if (this.state.showLayer) {
      let currentAnchor = document.activeElement;
      let last = this.state.anchors.length - 1;

      let achorId = event.shiftKey ?
        this.state.anchors[0].id :
        this.state.anchors[last].id;

      let targetId = `skipLayer_${achorId}`;

      if (currentAnchor.id === targetId) {
        this.setState({showLayer: false});
      }
    }
  }

  _onClick (destId) {
    return function (event) {
      let dest = document.getElementById(destId);
      dest.focus();
      this.setState({showLayer: false});
    }.bind(this);
  }

  render () {

    let anchorElements = this.state.anchors.map(function (anchor, index) {
      let skipToLabel = Intl.getMessage(this.context.intl, 'Skip to');
      let a11yLabel = `${skipToLabel} ${anchor.label}`;
      return (
        <a href={'#' + anchor.id}
           onFocus={this._onFocus}
           onClick={this._onClick(anchor.id)}
           id={`skipLayer_${anchor.id}`}
           key={anchor.id}
           aria-label={a11yLabel}>
          {anchor.label}
        </a>
      );
    }.bind(this));

    let menuComponent;
    if (anchorElements.length > 0) {
      menuComponent = (
        <Menu direction="row" responsive={false}>
          {anchorElements}
        </Menu>
      );
    }

    return (
      <Layer id="skip-link-layer" hidden={!this.state.showLayer} align="top">
        <Box ref="skipLinksLayer"
          pad={{horizontal: 'small', vertical: 'medium'}}>
          <h2>
            <FormattedMessage id="Skip to" defaultMessage="Skip to" />
          </h2>
          {menuComponent}
        </Box>
      </Layer>
    );
  }
}

SkipLinks.contextTypes = {
  intl: PropTypes.object
};
