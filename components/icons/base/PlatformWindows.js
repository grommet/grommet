// (C) Copyright 2014-2015 Hewlett-Packard Development Company

var React = require('react');
var IntlMixin = require('../../../mixins/GrommetIntlMixin');

var Icon = React.createClass({

  propTypes: {
    a11yTitle: React.PropTypes.string,
    a11yTitleId: React.PropTypes.string
  },

  mixins: [IntlMixin],

  getDefaultProps: function () {
    return {
      a11yTitleId: 'platform-windows-title'
    };
  },

  render: function() {
    var className = 'control-icon control-icon-platform-windows';
    if (this.props.className) {
      className += ' ' + this.props.className;
    }

    var a11yTitle = this.getGrommetIntlMessage(
      typeof this.props.a11yTitle !== "undefined" ?
        this.props.a11yTitle : "platform-windows");

    return (
      <svg version="1.1" viewBox="0 0 48 48" width="48px" height="48px" className={className} aria-labelledby={this.props.a11yTitleId}><title id={this.props.a11yTitleId}>{a11yTitle}</title><g id="platform-windows"><rect id="_x2E_svg_299_" x="0" y="0" fill="none" width="48" height="48"/><path id="path13_1_" d="M12.0755,15.8445&#xA;&#x9;&#x9;l9.778-1.3317l0.0043,9.4315L12.0846,24L12.0755,15.8445z M21.8488,25.0311l0.0076,9.4398l-9.7732-1.3437l-0.0006-8.1593&#xA;&#x9;&#x9;L21.8488,25.0311z M23.0341,14.3387l12.9647-1.8922v11.378l-12.9647,0.1029L23.0341,14.3387z M36.0018,25.1199l-0.003,11.3267&#xA;&#x9;&#x9;l-12.9647-1.8298l-0.0182-9.518L36.0018,25.1199z"/></g></svg>
    );
  }

});

module.exports = Icon;
