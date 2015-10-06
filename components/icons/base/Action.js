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
      a11yTitleId: 'action-title'
    };
  },

  render: function() {
    var className = 'control-icon control-icon-action';
    if (this.props.className) {
      className += ' ' + this.props.className;
    }

    var a11yTitle = this.getGrommetIntlMessage(
      typeof this.props.a11yTitle !== "undefined" ?
        this.props.a11yTitle : "action");

    return (
      <svg version="1.1" viewBox="0 0 48 48" width="48px" height="48px" className={className} aria-labelledby={this.props.a11yTitleId}><title id={this.props.a11yTitleId}>{a11yTitle}</title><g id="action"><rect id="_x2E_svg_82_" x="0" y="0" fill="none" width="48" height="48"/><path fill="none" stroke="#231F20" strokeWidth="2" strokeMiterlimit="10" d="M16.3088,32.1644l-0.5364-0.5391&#xA;&#x9;&#x9;c-2.3631-2.3748-2.3631-6.2608,0-8.6356L16.7573,22L26,31.2883l-0.8719,0.8762C22.6928,34.6119,18.7442,34.6119,16.3088,32.1644z&#xA;&#x9;&#x9; M22.8719,15.8356L22,16.7117L31.2427,26l0.9849-0.9898c2.3631-2.3748,2.3631-6.2608,0-8.6356l-0.5364-0.5391&#xA;&#x9;&#x9;C29.2559,13.3881,25.3073,13.3881,22.8719,15.8356z M25.71,26.54l3.04-3.04 M21.46,22.29l3.05-3.05 M31.9279,16.0722L35,13 M13,35&#xA;&#x9;&#x9;l3.0722-3.0722"/></g></svg>
    );
  }

});

module.exports = Icon;
