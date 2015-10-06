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
      a11yTitleId: 'document-cloud-title'
    };
  },

  render: function() {
    var className = 'control-icon control-icon-document-cloud';
    if (this.props.className) {
      className += ' ' + this.props.className;
    }

    var a11yTitle = this.getGrommetIntlMessage(
      typeof this.props.a11yTitle !== "undefined" ?
        this.props.a11yTitle : "document-cloud");

    return (
      <svg version="1.1" viewBox="0 0 48 48" width="48px" height="48px" className={className} aria-labelledby={this.props.a11yTitleId}><title id={this.props.a11yTitleId}>{a11yTitle}</title><g id="document-cloud"><rect id="_x2E_svg_271_" y="0" fill="none" width="48" height="48"/><polyline fill="none" stroke="#231F20" strokeWidth="2" strokeMiterlimit="10" points="16,18 16,13 29.0002,13 34,17.9999 34,35 &#xA;&#x9;&#x9;27,35 &#x9;"/><polyline fill="none" stroke="#231F20" strokeWidth="2" strokeMiterlimit="10" points="28,14 28,19 34,19 &#x9;"/><path fill="none" stroke="#231F20" strokeWidth="2" strokeMiterlimit="10" d="M15.375,24.8537v-1c0-1.6569,1.3431-3,3-3h4&#xA;&#x9;&#x9;c1.6569,0,3,1.3431,3,3v1h1c1.6569,0,3,1.3431,3,3v0c0,1.6569-1.3431,3-3,3h-6.3754"/><path fill="none" stroke="#231F20" strokeWidth="2" strokeMiterlimit="10" d="M24,30.8537v1c0,1.6569-1.3431,3-3,3h-3&#xA;&#x9;&#x9;c-1.6569,0-3-1.3431-3-3v-1h-1c-1.6569,0-3-1.3431-3-3v0c0-1.6569,1.3431-3,3-3h6.375"/></g></svg>
    );
  }

});

module.exports = Icon;
