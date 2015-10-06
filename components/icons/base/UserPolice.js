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
      a11yTitleId: 'user-police-title'
    };
  },

  render: function() {
    var className = 'control-icon control-icon-user-police';
    if (this.props.className) {
      className += ' ' + this.props.className;
    }

    var a11yTitle = this.getGrommetIntlMessage(
      typeof this.props.a11yTitle !== "undefined" ?
        this.props.a11yTitle : "user-police");

    return (
      <svg version="1.1" viewBox="0 0 48 48" width="48px" height="48px" className={className} aria-labelledby={this.props.a11yTitleId}><title id={this.props.a11yTitleId}>{a11yTitle}</title><g id="user-police"><rect id="_x2E_svg_135_" x="0" y="0" fill="none" width="48" height="48"/><path fill="none" stroke="#231F20" strokeWidth="2" strokeMiterlimit="10" d="M30,21v0.5714C30,25.1218,27.5504,28,24,28&#xA;&#x9;&#x9;s-6-2.8782-6-6.4286V21 M20.45,26.83C17.81,28.14,16,30.86,16,34v1h16v-1c0-2.21-0.9-4.21-2.34-5.66&#xA;&#x9;&#x9;c-0.61-0.61-1.32-1.12-2.11-1.51 M33,17.3322C31.2226,14.7422,27.8652,13,24,13s-7.2226,1.7422-9,4.3322L17.4169,20H24h6.5831&#xA;&#x9;&#x9;L33,17.3322z"/><path fill="#231F20" d="M24,15h-2c0,0-0.0625,3,2,3c2,0,1.9998-3,1.9998-3H24z"/></g></svg>
    );
  }

});

module.exports = Icon;
