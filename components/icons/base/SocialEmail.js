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
      a11yTitleId: 'social-email-title'
    };
  },

  render: function() {
    var className = 'control-icon control-icon-social-email';
    if (this.props.className) {
      className += ' ' + this.props.className;
    }

    var a11yTitle = this.getGrommetIntlMessage(
      typeof this.props.a11yTitle !== "undefined" ?
        this.props.a11yTitle : "social-email");

    return (
      <svg version="1.1" viewBox="0 0 48 48" width="48px" height="48px" className={className} aria-labelledby={this.props.a11yTitleId}><title id={this.props.a11yTitleId}>{a11yTitle}</title><g id="social-email"><rect id="_x2E_svg_306_" x="0" y="0" fill="none" width="48" height="48"/><path fill="#231F20" stroke="#231F20" strokeWidth="2" strokeMiterlimit="10" d="M35,32.5H13v-16h22V32.5z"/><polyline fill="none" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="square" strokeMiterlimit="10" points="12,16.8985 &#xA;&#x9;&#x9;24,26.8985 36,16.8985 &#x9;"/></g></svg>
    );
  }

});

module.exports = Icon;
