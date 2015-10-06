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
      a11yTitleId: 'document-locked-title'
    };
  },

  render: function() {
    var className = 'control-icon control-icon-document-locked';
    if (this.props.className) {
      className += ' ' + this.props.className;
    }

    var a11yTitle = this.getGrommetIntlMessage(
      typeof this.props.a11yTitle !== "undefined" ?
        this.props.a11yTitle : "document-locked");

    return (
      <svg version="1.1" viewBox="0 0 48 48" width="48px" height="48px" className={className} aria-labelledby={this.props.a11yTitleId}><title id={this.props.a11yTitleId}>{a11yTitle}</title><g id="document-locked"><rect id="_x2E_svg_286_" x="0" y="0" fill="none" width="48" height="48"/><polyline fill="none" stroke="#231F20" strokeWidth="2" strokeMiterlimit="10" points="16,20 16,13 29.0002,13 34,17.9999 34,35 &#xA;&#x9;&#x9;27,35 &#x9;"/><polyline fill="none" stroke="#231F20" strokeWidth="2" strokeMiterlimit="10" points="28,14 28,19 34,19 &#x9;"/><path fill="none" stroke="#231F20" strokeWidth="2" strokeMiterlimit="10" d="M24,35H14v-8h10V35z M19,32v-2"/><path fill="none" stroke="#231F20" strokeWidth="2" strokeMiterlimit="10" d="M22,27h-6v-2c0-1.6569,1.3431-3,3-3h0&#xA;&#x9;&#x9;c1.6569,0,3,1.3431,3,3V27z"/></g></svg>
    );
  }

});

module.exports = Icon;
