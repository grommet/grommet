// (C) Copyright 2014-2015 Hewlett Packard Enterprise Development LP

import React, { Component } from 'react';
import { findDOMNode } from 'react-dom';
import FormattedMessage from './FormattedMessage';
import Layer from './Layer';
import Menu from './Menu';
import DOM from '../utils/DOM';

export default class SkipLinks extends Component {
  constructor (props, context) {
    super(props, context);
    this._onBlur = this._onBlur.bind(this);
    this._onFocus = this._onFocus.bind(this);
    this._updateAnchors = this._updateAnchors.bind(this);
    this.state = {anchors: [], showLayer: false};
  }

  componentDidMount () {
    this._updateAnchors();
  }

  componentWillReceiveProps () {
    this.setState({routeChanged: true});
  }

  componentDidUpdate () {
    if (this.state.routeChanged) {
      this.setState({routeChanged: false}, this._updateAnchors);
    }
  }

  _updateAnchors () {
    var anchorElements = document.querySelectorAll('.skip-link-anchor');

    var anchors = Array.prototype.map.call(anchorElements, function (anchorElement) {
      return {
        id: anchorElement.getAttribute('id'),
        label: anchorElement.textContent
      };
    });

    this.setState({anchors: anchors});
  }

  _onFocus () {
    if (!this.state.showLayer) {
      this.setState({showLayer: true});
    }
  }

  _onBlur () {
    var skipLinksLayer = findDOMNode(this.refs.skipLinksLayer);
    var activeElement = document.activeElement;
    if (!DOM.isDescendant(skipLinksLayer, activeElement)) {
      this.setState({showLayer: false});
    }
  }

  _onClick (destId) {
    return function (event) {
      var dest = document.getElementById(destId);
      dest.focus();
    };
  }

  render () {

    var anchorElements = this.state.anchors.map(function (anchor, index) {
      return (
        <a tabIndex="0"
           href={'#' + anchor.id}
           onFocus={this._onFocus}
           onBlur={this._onBlur}
           onClick={this._onClick(anchor.id)}
           key={anchor.id}>
          {anchor.label}
        </a>
      );
    }.bind(this));

    var menuComponent;
    if (anchorElements.length > 0) {
      menuComponent = (
        <Menu direction="row">
          {anchorElements}
        </Menu>
      );
    }

    return (
      <Layer id="skip-link-layer" hidden={!this.state.showLayer}>
        <div ref="skipLinksLayer">
          <h2>
            <FormattedMessage id="Skip to" defaultMessage="Skip to" />
          </h2>
          {menuComponent}
        </div>
      </Layer>
    );
  }
}
