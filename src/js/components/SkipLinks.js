// (C) Copyright 2014-2015 Hewlett Packard Enterprise Development LP

var React = require('react');
var ReactDOM = require('react-dom');
var FormattedMessage = require('./FormattedMessage');
var Layer = require('./Layer');
var Menu = require('./Menu');
var DOM = require('../utils/DOM');

var SkipLinks = React.createClass({

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
    var anchorElements = document.querySelectorAll('.skip-link-anchor');

    var anchors = Array.prototype.map.call(anchorElements, function (anchorElement) {
      return {
        id: anchorElement.getAttribute('id'),
        label: anchorElement.textContent
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
    var skipLinksLayer = ReactDOM.findDOMNode(this.refs.skipLinksLayer);
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
      <div className="skip-links">
        <Layer id="skip-link-layer" hidden={!this.state.showLayer}>
          <div ref="skipLinksLayer">
            <h2>
              <FormattedMessage id="Skip to" defaultMessage="Skip to" />
            </h2>
            {menuComponent}
          </div>
        </Layer>
      </div>
    );
  }
});

module.exports = SkipLinks;
