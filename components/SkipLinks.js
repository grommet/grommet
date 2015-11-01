// (C) Copyright 2014-2015 Hewlett Packard Enterprise Development LP

'use strict';

var React = require('react');
var ReactDOM = require('react-dom');
var FormattedMessage = require('./FormattedMessage');
var Layer = require('./Layer');
var Menu = require('./Menu');
var DOM = require('../utils/DOM');

var SkipLinks = React.createClass({
  displayName: 'SkipLinks',

  getInitialState: function getInitialState() {
    return { anchors: [], showLayer: false };
  },

  componentDidMount: function componentDidMount() {
    this._updateAnchors();
  },

  componentWillReceiveProps: function componentWillReceiveProps(newProps) {
    this.setState({ routeChanged: true });
  },

  componentDidUpdate: function componentDidUpdate() {
    if (this.state.routeChanged) {
      this.setState({ routeChanged: false }, this._updateAnchors);
    }
  },

  _updateAnchors: function _updateAnchors() {
    var anchorElements = document.querySelectorAll('.skip-link-anchor');

    var anchors = Array.prototype.map.call(anchorElements, function (anchorElement) {
      return {
        id: anchorElement.getAttribute('id'),
        label: anchorElement.textContent
      };
    });

    this.setState({ anchors: anchors });
  },

  _onFocus: function _onFocus() {
    if (!this.state.showLayer) {
      this.setState({ showLayer: true });
    }
  },

  _onBlur: function _onBlur() {
    var skipLinksLayer = ReactDOM.findDOMNode(this.refs.skipLinksLayer);
    var activeElement = document.activeElement;
    if (!DOM.isDescendant(skipLinksLayer, activeElement)) {
      this.setState({ showLayer: false });
    }
  },

  _onClick: function _onClick(destId) {
    return function (event) {
      var dest = document.getElementById(destId);
      dest.focus();
    };
  },

  render: function render() {

    var anchorElements = this.state.anchors.map((function (anchor, index) {
      return React.createElement(
        'a',
        { tabIndex: '0',
          href: '#' + anchor.id,
          onFocus: this._onFocus,
          onBlur: this._onBlur,
          onClick: this._onClick(anchor.id),
          key: anchor.id },
        anchor.label
      );
    }).bind(this));

    return React.createElement(
      'div',
      { className: 'skip-links' },
      React.createElement(
        Layer,
        { id: 'skip-link-layer', hidden: !this.state.showLayer },
        React.createElement(
          'div',
          { ref: 'skipLinksLayer' },
          React.createElement(
            'h2',
            null,
            React.createElement(FormattedMessage, { id: 'Skip to', defaultMessage: 'Skip to' })
          ),
          React.createElement(
            Menu,
            { direction: 'row' },
            anchorElements
          )
        )
      )
    );
  }
});

module.exports = SkipLinks;