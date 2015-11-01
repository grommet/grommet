// (C) Copyright 2014-2015 Hewlett Packard Enterprise Development LP

var React = require('react');

var SkipLinkAnchor = React.createClass({

  propTypes: {
    label: React.PropTypes.node.isRequired
  },

  render: function () {
    var id = 'skip-link-' + this.props.label.toLowerCase().replace(/ /g, '_');

    return (
      <a tabIndex="-1" id={id} className="skip-link-anchor">
        {this.props.label}
      </a>
    );
  }

});

module.exports = SkipLinkAnchor;
