// (C) Copyright 2014-2015 Hewlett-Packard Development Company, L.P.

var React = require('react');

var SkipLinkAnchor = React.createClass({

  propTypes: {
    label: React.PropTypes.string.isRequired
  },

  contextTypes: {
    intl: React.PropTypes.object
  },

  render: function () {
    var id = 'skip-link-' + this.props.label.toLowerCase().replace(/ /g, '_');

    var labelFormatted = this.context.intl.formatMessage({
      id: this.props.label, defaultMessage: this.props.labelFormatted
    });

    return (
      <a tabIndex="-1" id={id} className="skip-link-anchor"
        data-skip-label={labelFormatted} />
    );
  }

});

module.exports = SkipLinkAnchor;
