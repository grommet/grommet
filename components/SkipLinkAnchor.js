// (C) Copyright 2014-2015 Hewlett Packard Enterprise Development LP

'use strict';

var React = require('react');

var SkipLinkAnchor = React.createClass({
  displayName: 'SkipLinkAnchor',

  propTypes: {
    label: React.PropTypes.node.isRequired
  },

  render: function render() {
    var id = 'skip-link-' + this.props.label.toLowerCase().replace(/ /g, '_');

    return React.createElement(
      'a',
      { tabIndex: '-1', id: id, className: 'skip-link-anchor' },
      this.props.label
    );
  }

});

module.exports = SkipLinkAnchor;