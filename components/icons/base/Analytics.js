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
      a11yTitleId: 'analytics-title'
    };
  },

  render: function() {
    var className = 'control-icon control-icon-analytics';
    if (this.props.className) {
      className += ' ' + this.props.className;
    }

    var a11yTitle = this.getGrommetIntlMessage(
      typeof this.props.a11yTitle !== "undefined" ?
        this.props.a11yTitle : "analytics");

    return (
      <svg version="1.1" viewBox="0 0 48 48" width="48px" height="48px" className={className} aria-labelledby={this.props.a11yTitleId}><title id={this.props.a11yTitleId}>{a11yTitle}</title><g id="analytics"><rect id="_x2E_svg_84_" x="0" y="0" fill="none" width="48" height="48"/><path fill="none" stroke="#231F20" strokeWidth="2" strokeMiterlimit="10" d="M31.5,19c1.25,1.67,2,3.75,2,6&#xA;&#x9;&#x9;c0,5.52-4.48,10-10,10s-10-4.48-10-10s4.48-10,10-10 M23.5,13v12l9.6-7.2C30.91,14.89,27.42,13,23.5,13z"/></g></svg>
    );
  }

});

module.exports = Icon;
