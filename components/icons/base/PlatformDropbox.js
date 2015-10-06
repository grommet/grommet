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
      a11yTitleId: 'platform-dropbox-title'
    };
  },

  render: function() {
    var className = 'control-icon control-icon-platform-dropbox';
    if (this.props.className) {
      className += ' ' + this.props.className;
    }

    var a11yTitle = this.getGrommetIntlMessage(
      typeof this.props.a11yTitle !== "undefined" ?
        this.props.a11yTitle : "platform-dropbox");

    return (
      <svg version="1.1" viewBox="0 0 48 48" width="48px" height="48px" className={className} aria-labelledby={this.props.a11yTitleId}><title id={this.props.a11yTitleId}>{a11yTitle}</title><g id="platform-dropbox"><rect id="_x2E_svg_295_" fill="none" width="48" height="48"/><polygon points="27.9955,13.8917 24,15.8961 32.006,19.8976 35.997,17.8961 &#x9;"/><polygon points="27.9955,27.5735 27.3264,27.2404 23.991,25.5675 20.6751,27.23 20.006,27.5646 19.3383,27.2315 15.994,25.5601 &#xA;&#x9;&#x9;15.994,30.997 24,35.0014 24,34.9865 32.006,30.9865 32.006,25.569 28.6647,27.2404 &#x9;"/><polygon points="20.006,25.8947 24,23.8917 16.0149,19.8976 24,15.9066 20.006,13.9036 11.997,17.9051 15.9746,19.8976 &#xA;&#x9;&#x9;11.997,21.8902 &#x9;"/><polygon points="24,23.9021 27.9955,25.9036 35.997,21.9021 32.006,19.8976 &#x9;"/></g></svg>
    );
  }

});

module.exports = Icon;
