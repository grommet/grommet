// (C) Copyright 2014-2015 Hewlett-Packard Development Company, L.P.

'use strict';

var React = require('react');
var IntlMixin = require('../mixins/GrommetIntlMixin');

var SkipLinkAnchor = React.createClass({
  displayName: 'SkipLinkAnchor',

  propTypes: {
    label: React.PropTypes.string.isRequired
  },

  mixins: [IntlMixin],

  render: function render() {
    var id = 'skip-link-' + this.props.label.toLowerCase().replace(/ /g, '_');
    return React.createElement('a', { tabIndex: '-1', id: id, className: 'skip-link-anchor',
      'data-skip-label': this.getGrommetIntlMessage(this.props.label) });
  }

});

module.exports = SkipLinkAnchor;