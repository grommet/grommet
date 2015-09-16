// (C) Copyright 2014-2015 Hewlett-Packard Development Company, L.P.

var React = require('react');
var Layer = require('./Layer');
var Menu = require('./Menu');
var DOM = require('../utils/DOM');
var IntlMixin = require('../mixins/GrommetIntlMixin');

var SkipLinks = React.createClass({

  mixins: [IntlMixin],

  getInitialState: function () {
    return {anchors: [], showLayer: false};
  },

  componentDidMount: function () {
    this._updateAnchors();
  },

  componentWillReceiveProps: function (newProps) {
    this.setState({routeChanged: true});
  },

  componentDidUpdate: function () {
    if (this.state.routeChanged) {
      this.setState({routeChanged: false}, this._updateAnchors);
    }
  },

  _updateAnchors: function () {
    var anchorElements = document.querySelectorAll('[data-skip-label]');

    var anchors = Array.prototype.map.call(anchorElements, function (anchorElement) {
      return {
        id: anchorElement.getAttribute('id'),
        label: anchorElement.getAttribute('data-skip-label')
      };
    });

    this.setState({anchors: anchors});
  },

  _onFocus: function () {
    if (!this.state.showLayer) {
      this.setState({showLayer: true});
    }
  },

  _onBlur: function () {
    var skipLinksLayer = this.refs.skipLinksLayer.getDOMNode();
    var activeElement = document.activeElement;
    if (!DOM.isDescendant(skipLinksLayer, activeElement)) {
      this.setState({showLayer: false});
    }
  },

  _onClick: function (destId) {
    return function (event) {
      var dest = document.getElementById(destId);
      dest.focus();
    };
  },

  render: function () {
    var anchorElements = this.state.anchors.map(function (anchor, index) {
      return (
        <a tabIndex="0"
           href={'#' + anchor.id}
           onFocus={this._onFocus}
           onBlur={this._onBlur}
           onClick={this._onClick(anchor.id)}
           key={anchor.id}
           aria-label={this.getGrommetIntlMessage('Skip to') + ' ' + anchor.label}>
          {anchor.label}
        </a>
      );
    }.bind(this));

    return (
      <div className="skip-links">
        <Layer hidden={!this.state.showLayer}>
          <div ref="skipLinksLayer">
            <h2>{this.getGrommetIntlMessage('Skip to')}:</h2>
            <Menu direction="row">
              {anchorElements}
            </Menu>
          </div>
        </Layer>
      </div>
    );
  }
});

module.exports = SkipLinks;
