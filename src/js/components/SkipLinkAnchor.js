// (C) Copyright 2014-2015 Hewlett-Packard Development Company, L.P.

var React = require('react');
var IntlMixin = require('../mixins/GrommetIntlMixin');

var SkipLinkAnchor = React.createClass({

  propTypes: {
    label: React.PropTypes.string.isRequired
  },

  mixins: [IntlMixin],

  render: function () {
    var id = 'skip-link-' + this.props.label.toLowerCase().replace(/ /g, '_');
    return (
      <a tabIndex="-1" id={id} className="skip-link-anchor"
        data-skip-label={this.getGrommetIntlMessage(this.props.label)} />
    );
  }

});

module.exports = SkipLinkAnchor;
