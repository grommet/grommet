// (C) Copyright 2014-2015 Hewlett-Packard Development Company, L.P.

var React = require('react');
var ReactIntl = require('react-intl');
var FormattedMessage = ReactIntl.FormattedMessage;

var SkipLinkAnchor = React.createClass({

  propTypes: {
    label: React.PropTypes.string.isRequired
  },

  render: function () {
    var id = 'skip-link-' + this.props.label.toLowerCase().replace(/ /g, '_');

    var labelFormatted = (
      <FormattedMessage id={this.props.label} defaultMessage={this.props.label} />
    );

    return (
      <a tabIndex="-1" id={id} className="skip-link-anchor"
        data-skip-label={labelFormatted} />
    );
  }

});

module.exports = SkipLinkAnchor;
