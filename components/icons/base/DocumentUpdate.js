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
      a11yTitleId: 'document-update-title'
    };
  },

  render: function() {
    var className = 'control-icon control-icon-document-update';
    if (this.props.className) {
      className += ' ' + this.props.className;
    }

    var a11yTitle = this.getGrommetIntlMessage(
      typeof this.props.a11yTitle !== "undefined" ?
        this.props.a11yTitle : "document-update");

    return (
      <svg version="1.1" viewBox="0 0 48 48" width="48px" height="48px" className={className} aria-labelledby={this.props.a11yTitleId}><title id={this.props.a11yTitleId}>{a11yTitle}</title><g id="document-update"><rect id="_x2E_svg_285_" x="0" y="0" fill="none" width="48" height="48"/><polyline fill="none" stroke="#231F20" strokeWidth="2" strokeMiterlimit="10" points="16,20 16,13 29.0002,13 34,17.9999 34,35 &#xA;&#x9;&#x9;27,35 &#x9;"/><polyline fill="none" stroke="#231F20" strokeWidth="2" strokeMiterlimit="10" points="28,14 28,19 34,19 &#x9;"/><path fill="none" stroke="#231F20" strokeWidth="2" strokeMiterlimit="10" d="M26.9128,28c0,3.866-3.134,7-7,7s-7-3.134-7-7&#xA;&#x9;&#x9;s3.134-7,7-7S26.9128,24.134,26.9128,28z M19.9128,32v-6 M22.9128,28l-3-3l-3,3"/></g></svg>
    );
  }

});

module.exports = Icon;
