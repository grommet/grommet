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
      a11yTitleId: 'connect-title'
    };
  },

  render: function() {
    var className = 'control-icon control-icon-connect';
    if (this.props.className) {
      className += ' ' + this.props.className;
    }

    var a11yTitle = this.getGrommetIntlMessage(
      typeof this.props.a11yTitle !== "undefined" ?
        this.props.a11yTitle : "connect");

    return (
      <svg version="1.1" viewBox="0 0 48 48" width="48px" height="48px" className={className} aria-labelledby={this.props.a11yTitleId}><title id={this.props.a11yTitleId}>{a11yTitle}</title><g id="connect"><rect id="_x2E_svg_187_" y="0" fill="none" width="48" height="48"/><path fill="none" stroke="#231F20" strokeWidth="2" strokeMiterlimit="10" d="M21.4336,33.5147&#xA;&#x9;&#x9;c-1.9245,1.9245-5.0447,1.9245-6.9692,0c-1.9245-1.9245-1.9245-5.0447,0-6.9692l3.0509-3.0509l6.9538,6.9538L21.4336,33.5147z&#xA;&#x9;&#x9; M23.5519,17.4889l6.9538,6.9538l3.0509-3.0509c1.9245-1.9245,1.9245-5.0447,0-6.9692c-1.9245-1.9245-5.0447-1.9245-6.9692,0&#xA;&#x9;&#x9;L23.5519,17.4889z M23,21.9792l-3.5,3.5 M26,24.9792l-3.5,3.5"/></g></svg>
    );
  }

});

module.exports = Icon;
